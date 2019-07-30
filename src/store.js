// Vue imports
import { clone } from "ramda";
import Vue from "vue";
import Vuex from "vuex";

// Util imports
import { getNonOverlappingCoordinates } from "./util";
import EXAMPLE from "./util/examples";
import { HEIGHT } from "./util/konvaConfigs";
import language from "./util/enums/languages";
import { getConstraints } from "./util/constraintSelector";
import { ETF } from "./util/enums/extensionToFormat";
import { urlToName } from "./util/nameParser";
import { possiblePredicates, possibleObjects } from "./util/vocabulary";

// Parsing, translation and validation imports
import ParserManager from "./parsing/parserManager";
import SerializerManager from "./parsing/serializerManager";
import { TranslatorManager } from "./translation/translatorManager";
import ShaclDictionary from "./translation/shaclDictionary";
import ValidatorManager from "./validation/validatorManager";

// Modules
import shapeModule from "./store/shapeModule";
import dataModule from "./store/dataModule";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    editor: null,
    model: [],
    format: language.SHACL,
    // relationships: {}, // TODO remove this
    yValues: {},
    coordinates: {},
    showNodeShapeModal: false,
    showClearModal: false,
    showValidationReportModal: false,
    predicateModal: {
      show: false,
      id: String,
      type: String,
      predicate: String
    },
    validationReport: "hello",
    dataFile: {},
    dataFileExtension: String
  },
  modules: {
    shape: shapeModule,
    data: dataModule
  },
  mutations: {
    /**
     * Takes a file, reads the extension and depending on the format uses the correct parser to turn it into an intern model
     * @param state
     * @param file The uploaded file
     * */
    uploadSchemaFile(state, file) {
      const reader = new FileReader();
      const fileExtension = file.name.split(".").pop();
      const type = ETF[fileExtension];
      reader.readAsText(file);
      reader.onload = function(event) {
        ParserManager.parse(event.target.result, type).then(e => {
          state.model = e;
        });
      };
    },

    addPredicate(state, args) {
      const shapeId = args.id;
      const predicate = args.pred;
      const valueType = args.vt;

      if (predicate.includes("property")) {
        const argument = { nodeID: shapeId, propertyID: args.input };
        this.dispatch("addPropertyToNode", argument);
      }
      const obj = state.model.filter(e => e["@id"] === shapeId)[0];
      if (valueType === "id" || valueType === "lists") {
        obj[predicate] = [{ "@id": args.input }];
      }
      if (valueType === "type") {
        obj[predicate] = [{ "@type": args.object, "@value": args.input }];
      }
      this.commit("updateYValues", shapeId);
      state.predicateModal.show = !state.predicateModal.show;
    },

    togglePredicateModal(state, args) {
      state.predicateModal.show = !state.predicateModal.show;
      state.predicateModal.id = args.id;
      state.predicateModal.type = args.type;
    },

    changePredicate(state, pred) {
      state.predicateModal.predicate = pred;
    },

    /**
     * Recieves a datafile and takes its content to the state
     * @param state
     * @param file The file containing data to check on
     * */
    uploadDataFile(state, file) {
      const reader = new FileReader();
      state.dataFileExtension = file.name.split(".").pop();
      reader.readAsText(file);
      reader.onload = function(event) {
        state.dataFile = event.target.result;
      };
    },

    validate(state) {
      SerializerManager.serialize(state.model, ETF.ttl).then(e => {
        ValidatorManager.validate(state.dataFile, e, state.format)
          .then(e => {
            state.validationReport = e;
            state.showValidationReportModal = true;
          })
          .catch(e => console.log(`failure : ${e}`));
      });
    },

    /**
     * Save a reference to the editor.
     * @param state
     * @param reference
     */
    setEditor(state, reference) {
      state.editor = reference;
    },

    /**
     * Load in some example data
     * @param state
     */
    loadExample(state) {
      console.log("Loading example...");
      this.commit("clear"); // Clear the existing data first.

      const example = EXAMPLE.model[0];
      state.model = [];
      for (const element of example) {
        state.model.push(clone(element)); // Deep copy
      }

      // Update y values and set coordinates to zero
      for (const shape of state.model) {
        this.commit("updateYValues", shape["@id"]);
        const { x, y } = getNonOverlappingCoordinates({
          coordinates: state.coordinates
        });
        Vue.set(state.coordinates, shape["@id"], { x, y });
      }
    },

    /* ADD ========================================================================================================== */

    /**
     * Add the given shape to the state and set its coordinates to zero.
     * @param state
     * @param object
     */
    addShape(state, object) {
      state.model.push(object);
      const { x, y } = getNonOverlappingCoordinates({
        coordinates: state.coordinates
      });
      Vue.set(state.coordinates, object["@id"], { x, y });
      this.commit("updateYValues", object["@id"]);
    },

    /**
     * Add a property with the given ID and value to the node with the given ID.
     * @param state
     * @param args
     */
    addPropertyToShape(state, args) {
      const { nodeID, propertyID, propertyValue } = args;
      // FIXME should not be put in list if it is a list already
      Vue.set(state.model[nodeID], propertyID, [propertyValue]);
      // TODO complete this
    },

    /**
     * Add the given property ID to the given shape.
     * @param state
     * @param args
     *            propertyID the ID of the property that should be added.
     *            shape the shape the property should be added to.
     */
    addPropertyIDToShape(state, args) {
      const { propertyID, shape } = args;
      // FIXME this assumes properties, not constraints or targetNodes or sth
      const p = shape["https://2019.summerofcode.be/unshacled#property"];
      if (!p) {
        shape["https://2019.summerofcode.be/unshacled#property"] = [];
      }
      shape["https://2019.summerofcode.be/unshacled#property"].push({
        "@id": propertyID
      });
    },

    /* EDIT ========================================================================================================= */

    /**
     * Update the shape's id.
     * @param state
     * @param args
     *            index the index of the shape that should be updated.
     *            newID the shape's new ID.
     */
    updateShapeID(state, args) {
      const { index, newID } = args;
      Vue.set(state.model[index], "@id", newID);
    },

    /**
     * Update the given property shape's ID.
     * @param state
     * @param args
     *            shape the property shape that should be updated,
     *            newID the shape's new ID.
     */
    updatePropertyShapeID(state, args) {
      const { shape, newID } = args;
      Vue.set(shape, "@id", newID);

      // Update the path with the new ID.
      const name = urlToName(newID);
      shape["https://2019.summerofcode.be/unshacled#path"][0][
        "@id"
      ] = `http://example.org/ns#${name}`;
    },

    /**
     * TODO
     * @param state
     */
    toggleValidationReport(state) {
      event.preventDefault();
      state.showValidationReportModal = !state.showValidationReportModal;
    },

    /**
     * Update the coordinates and values of the given shape.
     * @param state
     * @param args
     *            oldID the shape's old ID.
     *            newID the shape's new ID.
     */
    updateLocations(state, args) {
      const { oldID, newID } = args;

      // Update coordinates
      Vue.set(state.coordinates, newID, state.coordinates[oldID]);
      if (oldID !== newID) Vue.delete(state.coordinates, oldID);

      // Update yValues
      Vue.set(state.yValues, newID, state.yValues[oldID]);
      if (oldID !== newID) Vue.delete(state.yValues, oldID);
    },

    /* DELETE ======================================================================================================= */

    /**
     * Delete the shape at the given index.
     * @param state
     * @param index
     */
    deleteShapeAtIndex(state, index) {
      Vue.delete(state.model, index);
    },

    /**
     * Delete the coordinates and y values of the shape with the given id.
     * @param state
     * @param id
     */
    deleteShapeLocations(state, id) {
      Vue.delete(state.coordinates, id);
      Vue.delete(state.yValues, id);
    },

    /**
     * Delete the property with the given ID from the given shape.
     * @param state
     * @param args
     *            shape the shape from which the property should be removed..
     *            propertyID the ID of the property that should be removed.
     */
    deletePropertyFromShape(state, args) {
      const { shape, propertyID } = args;
      const properties =
        shape["https://2019.summerofcode.be/unshacled#property"];
      for (const p in properties) {
        if (properties[p]["@id"] === propertyID) Vue.delete(properties, p);
      }
    },

    /**
     * TODO
     * @param store
     * @param args
     */
    deleteConstraintFromShape(state, args) {
      const { shape, constraint } = args;
      Vue.delete(shape, constraint);
    },

    /* HELPERS ====================================================================================================== */

    /**
     * Update the y values of the properties of the given node.
     * @param state
     * @param nodeID
     */
    updateYValues(state, nodeID) {
      // Update the y values of the properties.
      Vue.set(state.yValues, nodeID, {});

      let node;
      for (const item of state.model) {
        if (item["@id"] === nodeID) node = item;
      }

      // FIXME code duplication, find a way to use `shapeProperties` >.<
      const propertyObjects =
        node["https://2019.summerofcode.be/unshacled#property"];

      // Get the references to property shapes.
      const properties = [];
      if (propertyObjects) {
        for (const p of propertyObjects) properties.push(p["@id"]);
      }

      // The other properties.
      const ignored = [
        "@id",
        "@type",
        "https://2019.summerofcode.be/unshacled#property"
      ];

      // Get the IDs form all the constraints.
      const constraints = [];
      for (const c in node) {
        if (!ignored.includes(c)) constraints.push(c);
      }

      // Get the IDs from all the properties.
      for (const p in node) {
        if (!ignored.includes(p)) properties.push(p[0]["@id"]);
      }

      // Calculate their y values.
      let i = 1;
      for (const con of constraints) {
        Vue.set(state.yValues[nodeID], con, i * HEIGHT);
        i += 2; // Constraints need twice the height.
      }
      for (const prop of properties) {
        Vue.set(state.yValues[nodeID], prop, i * HEIGHT);
        i += 1;
      }
      // Add y values for the add button.
      Vue.set(state.yValues[nodeID], "newProperty", i * HEIGHT);
      Vue.set(state.yValues[nodeID], "addButton", i * HEIGHT + HEIGHT / 4);
    },

    /**
     * Update the coordinates of the given shape.
     * @param state
     * @param args
     *    node: the ID of the node shape whose location should be updated.
     *    x: the new x coordinate.
     *    y: the new y coordinate.
     */
    updateCoordinates(state, args) {
      const { node, x, y } = args;
      const coords = { x, y };
      Vue.set(state.coordinates, node, coords);

      /*
      for (const prop in state.relationships) {
        if (prop.includes(node)) {
          const changedKey = node;
          const otherKey = prop.replace(changedKey, "");
          state.relationships[prop].coords = [
            state.coordinates[otherKey].x,
            state.coordinates[otherKey].y,
            state.coordinates[changedKey].x,
            state.coordinates[changedKey].y
          ];
        }
      }
       */
    },

    /**
     * Toggle the visibility of the node shape modal.
     * @param state
     */
    toggleShapeModal(state) {
      event.preventDefault();
      state.showNodeShapeModal = !state.showNodeShapeModal;
    },

    /**
     * Toggle the visibility of the clear modal.
     * @param state
     */
    toggleClearModal(state) {
      event.preventDefault();
      state.showClearModal = !state.showClearModal;
    },

    /**
     * Clear all shapes and properties from the current state.
     * @param state the current state
     */
    clear(state) {
      console.log("Clear!");
      state.model = [];
      state.coordinates = {};
      state.yValues = {};
    }
  },
  actions: {
    /**
     * Takes two keys from nodeshapes and uses them to add a relationship to the state
     * @param state
     * @param keys contains two keys, which can be queried using keys.one and keys.two.
     */
    /*
    addRelationship(state, keys) {
      Vue.set(state.relationships, keys.one + keys.two, {
        "@id": keys.one + keys.two,
        one: keys.one,
        two: keys.two,
        coords: [
          state.coordinates[keys.two].x,
          state.coordinates[keys.two].y,
          state.coordinates[keys.one].y,
          state.coordinates[keys.one].x
        ]
      });
    },
     */
  },
  getters: {
    /**
     * Get all the constraints for the current format.
     * @param state
     * @returns {null}
     */
    validators: state => {
      return getConstraints(state.format);
    },

    /**
     * TODO
     * @param state
     * @returns {string}
     */
    getValidationReport: state => {
      return state.ValidationReport;
    },

    /**
     * Returns the Json Internal model.
     * @param state
     * @returns {state.internalModel|{}|string}
     */
    getInternalModelInJson: state => {
      return state.model;
    },

    /**
     * Returns the internal model in ttl format.
     * @param state
     * @returns {any}
     */
    getInternalModelInTurtle: state => {
      return TranslatorManager.translateToLanguage(state.model, state.format);
    },

    /**
     * Returns the data to validate.
     * @param state
     * @returns {state.dataFile|{}}
     */
    getDataFile: state => {
      return state.dataFile;
    },

    /**
     * TODO
     * @returns {function(*): string[]}
     */
    predicates: () => type => {
      return possiblePredicates(ShaclDictionary.TERM[type]);
    },

    /**
     * TODO
     * @param state
     * @returns {string[]}
     */
    objects: state => {
      return possibleObjects(state.predicateModal.predicate);
    }
  }
});
