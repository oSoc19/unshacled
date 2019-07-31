import Vue from "vue";
import constraintModule from "./constraintModule";
import { extractUrl, urlToName } from "../parsing/urlParser";
import { getNonOverlappingCoordinates } from "../util";
import coordinateModule from "./coordinateModule";
import {CUSTOM_URI, EXAMPLE_URI, SHACL_URI} from "../util/constants";
import shaclToInternal from "../parsing/internalParser";

/**
 * This module contains everything to change the shapes.
 * @type {{mutations: {}, state: {}, getters: {}, actions: {}}}
 */
const shapeModule = {
  state: {
    model: []
  },
  modules: {
    mConstraint: constraintModule,
    mCoordinate: coordinateModule
  },
  mutations: {
    /**
     * Clear all shapes and properties from the current state.
     * @param state the current state
     */
    clear(state) {
      console.log("Clear!");
      state.model = [];
      this.commit("clearLocations");
    },

    /**
     * Set the model to the given value. Parse to internal value if necessary.
     * @param state
     * @param args
     */
    setModel(state, args) {
      let { model } = args;
      const { getters } = args;

      // Parse the model if necessary.
      if (JSON.stringify(model).indexOf(SHACL_URI) !== -1) {
        model = shaclToInternal(model);
      }
      console.log(JSON.stringify(model, null, 2));

      state.model = model;

      // Update y values and set coordinates to zero
      for (const shape of state.model) {
        this.commit("updateYValues", {
          nodeID: shape["@id"],
          shapes: state.model
        });
        const { x, y } = getNonOverlappingCoordinates({
          coordinates: state.mCoordinate.coordinates,
          bottomLefts: getters.allbottomLefts
        });
        this.commit("updateCoordinates", { node: shape["@id"], x, y });
      }
    },

    /* ADD ========================================================================================================== */

    /**
     * Add the given shape to the state and set its coordinates to zero.
     * @param state
     * @param args
     */
    addShape(state, args) {
      const { object, bottomLefts } = args;
      state.model.push(object);
      const { x, y } = getNonOverlappingCoordinates({
        coordinates: state.mCoordinate.coordinates,
        bottomLefts
      });
      Vue.set(state.mCoordinate.coordinates, object["@id"], { x, y });
      this.commit("updateYValues", {
        nodeID: object["@id"],
        shapes: state.model
      });
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
      const p = shape[`${CUSTOM_URI}property`];
      if (!p) {
        shape[`${CUSTOM_URI}property`] = [];
      }
      shape[`${CUSTOM_URI}property`].push({ "@id": propertyID });
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
      shape[`${CUSTOM_URI}path`][0]["@id"] = `${EXAMPLE_URI}${name}`;
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
     * Delete the property with the given ID from the given shape.
     * @param state
     * @param args
     *            shape the shape from which the property should be removed..
     *            propertyID the ID of the property that should be removed.
     */
    deletePropertyFromShape(state, args) {
      const { shape, propertyID } = args;
      const key = `${CUSTOM_URI}property`;

      const properties = shape[key];
      for (const p in properties) {
        if (properties[p]["@id"] === propertyID) Vue.delete(properties, p);
      }
      Vue.set(shape, key, properties);
    },

    /**
     * TODO
     * @param store
     * @param args
     */
    deleteConstraintFromShape(state, args) {
      const { shape, constraint } = args;
      Vue.delete(shape, constraint);
    }
  },
  actions: {
    /* ADD ========================================================================================================== */

    /**
     * Add an empty node shape with the given id.
     * @param store
     * @param id
     */
    addNodeShape({ commit, getters }, id) {
      console.log(getters);
      const object = {
        "@id": id,
        "@type": [`${CUSTOM_URI}NodeShape`]
      };
      object[`${CUSTOM_URI}property`] = [];
      object[`${CUSTOM_URI}targetNode`] = [];

      commit(
        "addShape",
        { object, bottomLefts: getters.allbottomLefts },
        { root: true }
      );
    },

    /**
     * Add a property shape with the given id.
     * @param store
     * @param id
     */
    addPropertyShape({ commit, getters }, id) {
      const object = { "@id": id };
      object[`${CUSTOM_URI}path`] = [`${EXAMPLE_URI}${id}`];
      commit(
        "addShape",
        { object, bottomLefts: getters.allbottomLefts },
        { root: true }
      );
    },

    /* EDIT ========================================================================================================= */

    /**
     * Edit the id of the given node shape.
     * @param store
     * @param args
     *    oldID: the old ID we want to change.
     *    newID: the new ID for the node shape.
     */
    editNodeShape({ getters, commit }, args) {
      const { oldID, newID } = args;
      const newURL = extractUrl(oldID) + newID;

      // If the ID has changed
      if (oldID !== newURL) {
        // Update the shape's ID
        const index = getters.indexWithID(oldID);
        commit("updateShapeID", { index, newID: newURL }, { root: true });

        // Update Relationships TODO
        /*
        for (let prop in state.relationships) {
          if (state.relationships[prop].one === oldID)
            state.relationships[prop].one = newID;
          if (state.relationships[prop].two === oldID)
            state.relationships[prop].two = newID;
          prop = state.relationships[prop].one + state.relationships[prop].two;
        }
         */

        // Update the coordinates and y values.
        commit("updateLocations", { oldID, newID: newURL }, { root: true });
      }
    },

    /**
     * Edit the ID of a property shape.
     * This will update the property list of every node shape that contains this property shape.
     * @param store
     * @param args
     */
    editPropertyShape({ state, getters, commit }, args) {
      const { oldID, newID } = args;

      // Update the state's shapes.
      const shape = getters.shapeWithID(oldID);
      commit("updatePropertyShapeID", { shape, newID });
      for (const node of state.model) {
        if (getters.shapeProperties(node["@id"]).indexOf(oldID) !== -1) {
          commit("deletePropertyFromShape", { shape: node, propertyID: oldID });
          commit("addPropertyIDToShape", { shape: node, propertyID: newID });
        }
      }
      commit("updateLocations", { oldID, newID }, { root: true });
      // Update the y values of the properties.
      for (const node of state.model) {
        commit(
          "updateYValues",
          { nodeID: node["@id"], shapes: state.model },
          { root: true }
        );
      }
    },

    /* DELETE ======================================================================================================= */

    /**
     * Delete the node shape with the given id.
     * @param store
     * @param id
     */
    deleteNodeShape({ getters, commit }, id) {
      commit("deleteShapeAtIndex", getters.indexWithID(id), { root: true });
      commit("deleteShapeLocations", id, { root: true });
    },

    /**
     * Delete the property shape with the given id.
     * @param store
     * @param id
     */
    deletePropertyShape({ state, getters, commit }, id) {
      // Check every nodeShape if it contains the given property.
      for (const shape of state.model) {
        const properties = shape[`${CUSTOM_URI}property`];

        for (const p in properties) {
          if (properties[p]["@id"] === id) {
            // Delete the property from the node and update the y values.
            properties.splice(p, 1);
            commit(
              "updateYValues",
              { nodeID: shape["@id"], shapes: state.model },
              { root: true }
            );
          }
        }
      }
      // Remove the property from the state
      commit("deleteShapeAtIndex", getters.indexWithID(id), { root: true });
      commit("deleteShapeLocations", id, { root: true });
    }
  },
  getters: {
    /**
     * Returns a map of the shape ID's to their respective objects.
     * @param state
     */
    shapes(state) {
      const shapes = {};
      for (const item of state.model) {
        shapes[item["@id"]] = item;
      }
      return shapes;
    },

    /**
     * Get a dictionary mapping ID's to the respective node shape objects.
     * @param state
     */
    nodeShapes(state) {
      const nodeShapes = {};
      for (const item of state.model) {
        if (item["@type"]) {
          nodeShapes[item["@id"]] = item;
        }
      }
      return nodeShapes;
    },

    /**
     * Get a dictionary mapping ID's to the respective property shape objects.
     * @param state
     */
    propertyShapes(state) {
      const propertyShapes = {};
      for (const item of state.model) {
        if (!item["@type"]) {
          propertyShapes[item["@id"]] = item;
        }
      }
      return propertyShapes;
    },

    /**
     * Get the shape object with the given ID.
     * @param state
     * @returns {null}
     */
    shapeWithID: state => id => {
      for (const item of state.model) {
        if (item["@id"] === id) return item;
      }
      return null;
    },

    /**
     * Get the index of the shape object with the given ID.
     * @param state
     * @returns {string|number}
     */
    indexWithID: state => id => {
      for (const i in state.model) {
        if (state.model[i]["@id"] === id) return i;
      }
      return -1;
    }
  }
};

export { shapeModule as default };
