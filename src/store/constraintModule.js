import { clone } from "ramda";
import Vue from "vue";
import { TERM } from "../translation/terminology";
import { prefixToUri } from "../util/urlParser";
import getValueType, {
  getValueTypeFromConstraint,
  ValueTypes
} from "../util/enums/ValueType";
import { IGNORED_PROPERTIES } from "../util/constants";
import predicateModalModule from "./modals/predicateModalModule";

/**
 * This module contains everything to change the shape constraints.
 * @type {{mutations: {}, state: {}, getters: {}, actions: {}}}
 */
const constraintModule = {
  state: {
    constraintIndex: 0
  },
  modules: {
    mModal: predicateModalModule
  },
  mutations: {
    /**
     * Set the value of the constraint with the given ID to the given value.
     * @param state
     * @param shape {object} the shape object that has to be updated.
     * @param constraintID {string} the ID of the constraint that should be updated.
     * @param value {object} the new value of the given constraint.
     */
    setConstraintValue(state, { shape, constraintID, value }) {
      Vue.set(shape, constraintID, value);
    },

    /**
     * Delete the given constraint from the given shape object.
     * @param state
     * @param shape {object} the shape object that should be updated.
     * @param constraint {string} the ID of the constraint that should be deleted.
     */
    deleteConstraintFromShape(state, { shape, constraintID }) {
      Vue.delete(shape, constraintID);
    }
  },
  actions: {
    /* ADD ========================================================================================================== */

    /**
     * Add a constraint with the given values to the given shape.
     * @param state
     * @param getters
     * @param commit
     * @param dispatch
     * @param rootState
     * @param shapeID {string} the IRI of the shape we want to add the predicate to.
     * @param predicate {string} the predicate we want to add.
     * @param  valueType {string} the value type of this predicate.
     * @param input {string} the desired value of this constraint.
     * @param object {string} the type of the input.
     * @param language {string} the language tag of the input value.
     */
    addPredicate(
      { state, getters, commit, dispatch, rootState },
      { shapeID, predicate, valueType, input, object, language }
    ) {
      const shape = getters.shapeWithID(shapeID);
      const isID = valueType.includes(ValueTypes.ID);
      const isList = valueType.includes(ValueTypes.LIST);
      let duplicate = false;

      if (shape[predicate]) {
        const iter = isList ? shape[predicate][0]["@list"] : shape[predicate];
        // Check if this new value is a duplicate.
        const key = isID ? "@id" : "@value";
        for (const j in iter) {
          if (iter[j][key] === input) duplicate = true;
        }
      } else {
        // Create an empty list to add to if necessary.
        shape[predicate] = [];
        if (isList) shape[predicate].push({ "@list": [] });
      }

      // Don't add the value if it is a duplicate.
      if (!duplicate) {
        // Create the object we want to add.
        const value = isID
          ? { "@id": input }
          : { "@type": object, "@value": input };
        if (language) {
          value["@language"] = language;
          Vue.delete(value, "@type");
        }

        // TODO take multiple languages into account
        if (valueType === "type") {
          // Replace the value.
          Vue.set(shape[predicate], 0, value);
        } else {
          // Determine which list we want to add the predicate to.
          const list = isList ? shape[predicate][0]["@list"] : shape[predicate];
          list.push(value);
        }

        // Add the predicate to the shape.
        commit("updateShape", {
          shapeID,
          value: rootState.mShape.model[shapeID]
        });

        // Add a property shape if needed.
        if (predicate === TERM.property) {
          dispatch("addPropertyShape", { id: input, path: "(undefined)" });
        }

        // Update the y values.
        commit(
          "updateYValues",
          { shapeID, shapes: rootState.mShape.model },
          { root: true }
        );
      }

      // Toggle the predicate modal.
      if (state.mModal.show) commit("togglePredicateModal", {});
    },

    /* EDIT ========================================================================================================= */

    /**
     * Prepare and toggle the predicate modal.
     * @param state
     * @param commit
     * @param shapeID {string} the ID of the shape we want to update.
     * @param shapeType {string} the type of the shape we want to update.
     * @param constraintID {string} the ID of the constraint we want to edit.
     * @param index {number} the index of the constraint value we want to edit.
     * @param value {string} the current value of the constraint value.
     */
    startConstraintEdit(
      { state, commit },
      { shapeID, shapeType, constraintID, index, value }
    ) {
      state.constraintIndex = index;
      commit("togglePredicateModal", {
        shapeID,
        shapeType,
        editing: true,
        input: value,
        onExit: "stopConstraintEdit",
        selected: constraintID
      });
    },

    /**
     * Get the values from the predicate model and execute the edit.
     * @param state
     * @param rootGetters
     * @param shapeID {string}
     * @param constraintID {string}
     * @param object {string}
     * @param valueType {string}
     * @param input {string}
     */
    stopConstraintEdit(
      { state, rootGetters },
      { shapeID, predicate: constraintID, object, valueType, input }
    ) {
      // Update the modal state.
      Vue.set(state.mModal, "show", false);
      Vue.set(state.mModal, "editing", false);
      const i = state.constraintIndex;
      if (typeof input === "boolean") input = input.toString();

      // Clone the original constraint and get the value we want to update.
      const updated = clone(rootGetters.shapeWithID(shapeID)[constraintID]);
      const iter = valueType.includes(ValueTypes.LIST)
        ? updated[0]["@list"]
        : updated;

      // Create a new value object.
      let newValue;
      let name;
      if (constraintID === TERM.path) {
        newValue = { "@id": input };
      } else if (valueType.includes(ValueTypes.ID)) {
        newValue = {
          "@id": prefixToUri(this.$store.state.mConfig.namespaces, input)
        };
      } else {
        newValue = {
          "@type": object,
          "@value": prefixToUri(this.$store.state.mConfig.namespaces, input)
        };
      }

      // Check if this new value is a duplicate.
      let duplicate = false;
      const key = valueType.includes(ValueTypes.ID) ? "@id" : "@value";
      for (let j in iter) {
        j = Number(j);
        if (i !== j && iter[j][key] === name) duplicate = true;
      }

      // Update this value in the original constraint object.
      // `iter` is a reference to the array we have to modify.
      if (duplicate) {
        // Delete the duplicate.
        iter.splice(i, 1);
      } else {
        iter[i] = newValue;
      }

      this.dispatch("updateConstraint", {
        shapeID,
        constraintID,
        newValue: updated
      });
    },

    /**
     * Update the constraint value of the given shape.
     * @param rootGetters
     * @param commit
     * @param shapeID {string} the ID of the shape.
     * @param constraintID {string} the ID of the constraint we want to update.
     * @param newValue {object} the new value of the given constraint.
     */
    updateConstraint(
      { rootGetters, commit },
      { shapeID, constraintID, newValue }
    ) {
      commit("setConstraintValue", {
        shape: rootGetters.shapeWithID(shapeID),
        constraintID,
        value: newValue
      });
    },

    /* DELETE ======================================================================================================= */

    /**
     * Delete the given constraint from the given shape.
     * @param store
     * @param shapeID {string} the ID of the shape from which the constraint should be removed.
     * @param constraint {string} the ID of the constraint that should be removed.
     */
    deleteConstraintFromShapeWithID(
      { getters, commit, rootState },
      { shapeID, constraintID }
    ) {
      const shape = getters.shapeWithID(shapeID);
      commit(
        "deleteConstraintFromShape",
        { shape, constraintID },
        { root: true }
      );

      // Update the y values
      commit(
        "updateYValues",
        { shapeID, shapes: rootState.mShape.model },
        { root: true }
      );
    },

    /**
     * Delete the constraint value at the given index.
     * If the constraint value has a '@list' object,
     *   the constraint with the given index will be removed from that object.
     * @param getters
     * @param commit
     * @param rootState
     * @param shapeID {string} the ID of the shape we want to update.
     * @param constraintID {string} the ID of the constraint we want to edit.
     * @param valueIndex {number} the index of the constraint value we want to delete.
     */
    deleteConstraintValueWithIndex(
      { getters, commit, rootState },
      { shapeID, constraintID, valueIndex }
    ) {
      const constraint = getters.shapeWithID(shapeID)[constraintID];

      // If the value is a list, then remove from that list instead of directly.
      const iter = getValueType(constraintID).includes(ValueTypes.LIST)
        ? constraint[0]["@list"]
        : constraint;
      iter.splice(valueIndex, 1);

      // Delete the constraint from the shape if there are no values left.
      if (iter.length === 0) {
        this.dispatch("deleteConstraintFromShapeWithID", {
          shapeID,
          constraintID
        });
      }

      // Update the y values
      commit("updateYValues", { shapeID, shapes: rootState.mShape.model });
    },

    /**
     * Delete the given constraint.
     * If the constraint value has a '@list' object,
     *   the constraint with the given index will be removed from that object.
     * @param getters
     * @param commit
     * @param rootState
     * @param shapeID {string}
     * @param constraintID {string}
     * @param value {string}
     */
    deleteConstraintValue(
      { getters, commit, rootState },
      { shapeID, constraintID, value }
    ) {
      const constraint = getters.shapeWithID(shapeID)[constraintID];

      // If the value is a list, then remove from that list instead of directly.
      const iter = getValueType(constraintID).includes(ValueTypes.LIST)
        ? constraint[0]["@list"]
        : constraint;

      // Check every value of the list.
      for (const i in iter) {
        const val = iter[i];
        if (val["@id"] === value || val["@value"] === value || val === value) {
          // Delete this value from the list if it is the value we want to remove.
          iter.splice(i, 1);
        }
      }

      // Delete the constraint from the shape if there are no values left.
      if (iter.length === 0) {
        this.dispatch("deleteConstraintFromShapeWithID", {
          shapeID,
          constraintID
        });
      }

      // Update the y values
      commit("updateYValues", { shapeID, shapes: rootState.mShape.model });
    }
  },
  getters: {
    /**
     * Get a list of property ID's for the shape with the given ID.
     * @param state
     * @param getters
     * @param rootState
     * @returns {function(*): Array}
     */
    shapeProperties: (state, getters, rootState) => shapeID => {
      let shape;
      for (const s of rootState.mShape.model) {
        if (s["@id"] === shapeID) {
          shape = s;
        }
      }

      const propertyObjects = shape[TERM.property];
      const properties = [];

      if (propertyObjects) {
        // Get the references to property shapes
        for (const p of propertyObjects) {
          properties.push(p["@id"]);
        }
        // Get the other properties
        const ignored = ["@id", "@type", TERM.property, TERM.targetNode];
        for (const p in shape) {
          if (!ignored.includes(p)) properties.push(p[0]["@id"]);
        }
      }
      return properties;
    },

    /**
     * Get a map of the constraints of the shape with the given ID.
     * @param _state
     * @param _getters
     * @param _rootState
     * @param rootGetters
     * @returns {Function}
     */
    shapeConstraints: (
      _state,
      _getters,
      _rootState,
      rootGetters
    ) => shapeID => {
      const constraints = {};
      const shape = rootGetters.shapeWithID(shapeID);

      if (shape) {
        for (const prop in shape) {
          // Only handle the constraints that are not ignored
          if (!IGNORED_PROPERTIES.includes(prop)) {
            if (shape[prop].length > 1) {
              // Get the ID of every element in the list
              const properties = [];
              for (const p of shape[prop]) {
                properties.push(p["@id"]);
              }
              constraints[prop] = properties;
            } else {
              constraints[prop] = shape[prop];
            }
          }
        }
        return constraints;
      } else {
        return undefined;
      }
    },

    /**
     * Get the constraints that have existing shape IDs as values.
     * This will return a dictionary that maps every constraint IDs to a list of shape IDs.
     * @returns {Function}
     * @param _state
     * @param getters
     * @param _rootState
     * @param rootGetters
     */
    shapeIDConstraints: (
      _state,
      getters,
      _rootState,
      rootGetters
    ) => shapeID => {
      const output = {};
      const { shapeIDs } = rootGetters;

      // Check every constraint of the given shape.
      const constraints = getters.shapeConstraints(shapeID);
      for (const c of Object.keys(constraints)) {
        const vt = getValueType(c)
          ? getValueType(c)
          : getValueTypeFromConstraint(constraints[c]);
        if (vt && vt.includes(ValueTypes.ID)) {
          const values = [];
          const iter =
            constraints[c].length > 1
              ? constraints[c]
              : vt.includes(ValueTypes.LIST)
              ? constraints[c][0]["@list"]
              : constraints[c];

          // Check every constraint value.
          for (const value of iter) {
            const id = value["@id"] ? value["@id"] : value;
            // Check if the value is an existing shape ID.
            if (shapeIDs.includes(id)) values.push(id);
          }
          // Only push the constraints that do have some values.
          if (values.length > 0) output[c] = values;
        }
      }
      return output;
    }
  }
};

export { constraintModule as default };
