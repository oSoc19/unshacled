import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nodeShapes: {},
    properties: {},
    showNodeShapeModal: false
  },
  mutations: {
    /**
     * Load in some example data
     * @param state
     */
    loadExample(state) {
      console.log("Loading example...");
      const id = "ex:Alice";
      const firstName = {
        path: "foaf:firstName",
        maxCount: 1,
        minCount: 1,
        datatype: "xsd:string"
      };
      const lastName = {
        path: "foaf:lastName",
        maxCount: 1,
        minCount: 1,
        datatype: "xsd:string"
      };
      const alice = {
        "@id": id,
        "@type": "ex:Person",
        properties: ["foaf:firstName", "foaf:lastName"]
      };

      state.nodeShapes = {};
      state.nodeShapes[id] = alice;
      state.properties = {
        "foaf:firstName": firstName,
        "foaf:lastName": lastName
      };

      // Update the y values of the properties.
      const ys = {};
      const height = 40;
      let i = 1;
      for (const prop of alice.properties) {
        ys[prop] = i * height;
        i += 1;
      }
      state.yValues = {};
      state.yValues[id] = ys;
    },

    /**
     * Add an empty node shape with the given id.
     * @param state
     * @param id
     */
    addNodeShape(state, id) {
      Vue.set(state.nodeShapes, id, {
        "@id": id,
        "@type:": null,
        properties: []
      });
    },

    /**
     * Delete the node shape with the given id.
     * @param state
     * @param id
     */
    deleteNodeShape(state, id) {
      Vue.delete(state.nodeShapes, id);
    },

    /**
     * Delete the given property from the given node shape.
     * @param state
     * @param args the id of the node shape and the id of the property that should be removed from the shape.
     */
    deletePropFromNode(state, args) {
      const { node, prop } = args;
      const newProperties = state.nodeShapes[node].properties.filter(
        p => p !== prop
      );
      state.nodeShapes[node] = {
        ...state.nodeShapes[node],
        properties: newProperties
      };
      state.nodeShapes = { ...state.nodeShapes };

      // Update the y values of the properties.
      const height = 40;
      let i = 1;
      for (const prop of state.nodeShapes[node].properties) {
        Vue.set(state.yValues[node], prop, i * height);
        i += 1;
      }
    },

    /**
     * Add a property shape with the given id.
     * @param state
     * @param id
     */
    addPropertyShape(state, id) {
      Vue.set(state.properties, id, {});
    },

    /**
     * Delete the property shape with the given id.
     * @param state
     * @param id
     */
    deletePropertyShape(state, id) {
      Vue.delete(state.properties, id);
    },

    /**
     * Toggle the visibility of the node shape modal.
     * @param state
     */
    toggleNodeShapeModal(state) {
      state.showNodeShapeModal = !state.showNodeShapeModal;
    },

    /**
     * Clear all shapes and properties from the current state.
     * @param state the current state
     */
    clear(state) {
      console.log("Clear!");
      state.nodeShapes = {};
      state.properties = {};
    }
  },
  actions: {}
});
