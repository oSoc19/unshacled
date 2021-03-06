import Vue from "vue";
import { ETF } from "../util/enums/extensionToFormat";
import ParserManager from "../parsing/parserManager";
import SerializerManager from "../parsing/serializerManager";
import ValidatorManager from "../validation/validatorManager";
import language from "../util/enums/languages";
import { downloadFile } from "../util";
import ShaclTranslator from "../translation/shaclTranslator";

/**
 * This module contains everything to handle data imports/exports and validation.
 * @type {{mutations: {}, state: {}, getters: {}, actions: {}}}
 */
const dataModule = {
  state: {
    format: language.SHACL,
    dataFile: {},
    dataFileName: String,
    dataFileExtension: String,
    dataText: "",
    validationReport: {},
    showValidationReportModal: false
  },

  mutations: {
    /**
     * Show the validation report modal.
     * @param state
     */
    toggleValidationReport(state) {
      event.preventDefault();
      Vue.set(
        state,
        "showValidationReportModal",
        !state.showValidationReportModal
      );
    },

    /**
     * Clear the data from the current state.
     * @param state
     */
    clearData(state) {
      Vue.set(state, "dataFileName", undefined);
      Vue.set(state, "dataFile", {});
      Vue.set(state, "dataFileExtension", undefined);
      Vue.set(state, "dataText", "");
    },

    /**
     * Set the data file to the given contents.
     * @param state
     * @param {string} name the name of the data file.
     * @param {string} contents the contents of a read data file.
     * @param {string} extension the extension of the data file.
     * @param {string} data the data parsed from the given file.
     */
    setData(state, { name, contents, extension, data }) {
      Vue.set(state, "dataFileName", name);
      Vue.set(state, "dataFile", contents);
      Vue.set(state, "dataFileExtension", extension);
      Vue.set(state, "dataText", JSON.stringify(data, null, 2));
    },

    /**
     * Set the given JSON data as the current data file.
     * @param state
     * @param {string} text the data in JSON format.
     */
    setJsonData(state, { text }) {
      Vue.set(state, "dataText", text);
      Vue.set(state, "dataFileExtension", "json");
      Vue.set(state, "dataFile", text);
    },

    /**
     * Parse the model to the expected format and validate the data file using these shapes.
     * If there is no data file loaded, this will print an error.
     * @param state
     * @param {object} model the current model.
     */
    validateWithModel(state, model) {
      /**
       * Validate the given data using the given model in the given format.
       * Use the generated report to show the validation report modal.
       *
       * Used to avoid code duplication.
       * Does not work if placed outside `validateWithModel` due to the way the mutations work.
       *
       * @param state
       * @param {object} data the data objects in Turtle.
       * @param {object} shapes the shape objects in SHACL.
       * @param {string} format the format of the data.
       */
      const validateData = function(state, data, shapes, format) {
        ValidatorManager.validate(data, shapes, format)
          .then(report => {
            Vue.set(state, "validationReport", report);
            Vue.set(state, "showValidationReportModal", true);
          })
          .catch(e => console.error(`Error while validating: ${e}`));
      };

      /* Check if there is data loaded. */
      if (state.dataFile.length > 0) {
        /* Serialize the model to SHACL. */
        SerializerManager.serialize(
          ShaclTranslator.toSHACLSimple(model),
          ETF.ttl
        )
          .then(shapes => {
            if (state.dataFileExtension === "json") {
              /* Serialize the data to turtle. */
              SerializerManager.serialize(
                JSON.parse(state.dataFile),
                ETF.ttl
              ).then(data => validateData(state, data, shapes, state.format));
            } else {
              /* If the data is already in turtle format, go straight to validating. */
              validateData(state, state.dataFile, shapes, state.format);
            }
          })
          .catch(e => console.error(`Error while serializing: ${e}`));
      } else {
        /* Throw an error if there is no data to validate. */
        console.error("No data file loaded.");
      }
    }
  },

  actions: {
    /**
     * Receives a datafile and sends its contents to the parser.
     * @param commit
     * @param dispatch
     * @param {any} file file containing data to check on.
     * */
    uploadDataFile({ commit, dispatch }, file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = event => {
        const args = {
          name: file.name,
          contents: event.target.result,
          extension: file.name.split(".").pop()
        };
        dispatch("setDataFile", args).then(newState =>
          /* Save the state to undo later. */
          commit("saveOperation", {
            state: newState,
            action: { type: "setDataFile", args }
          })
        );
      };
    },

    /**
     * Parse the given data file and send its contents to the state
     * @param commit
     * @param rootState
     * @param {string} name the name of the data file.
     * @param {string} contents the contents of a read data file.
     * @param {string} extension the extension of the data file.
     */
    setDataFile({ commit, rootState }, { name, contents, extension }) {
      return new Promise((resolve, reject) => {
        try {
          if (extension.toLowerCase() === "json") {
            alert("Importing JSON files is not yet supported.");
            throw new Error("Importing JSON files is not yet supported.");
          } else {
            /* Parse the data from Turtle to JSON. */
            ParserManager.parse(contents, ETF[extension]).then(data => {
              commit("setData", { name, contents, extension, data });
              resolve(rootState);
            });
          }
        } catch (e) {
          reject(e);
        }
      });
    },

    /**
     * Takes a file and reads the extension.
     * Depending on the used format, it will use the correct parser to turn it into an internal model.
     * @param {any} rootState
     * @param {any} file the uploaded file
     * */
    uploadSchemaFile({ rootState }, file) {
      const reader = new FileReader();
      const fileExtension = file.name
        .split(".")
        .pop()
        .toLowerCase();
      const type = ETF[fileExtension];
      const self = this;

      if (fileExtension === "json") {
        alert("Importing JSON files is not yet supported.");
        throw new Error("Importing JSON files is not yet supported.");
      } else {
        reader.readAsText(file);
        reader.onload = function(event) {
          ParserManager.parse(event.target.result, type).then(e => {
            self.dispatch("updateModel", e);
            /* Save the state to undo later. */
            self.commit("saveOperation", {
              state: rootState,
              action: { type: "updateModel", args: e }
            });
          });
        };
      }
    },

    /**
     * Set the model to the given one.
     * @param commit
     * @param rootGetters
     * @param rootState
     * @param {array} model the shapes we want to use as a model now.
     */
    updateModel({ commit, rootGetters }, model) {
      commit("setModel", { model, getters: rootGetters });
    },

    /**
     * Validate the interal model.
     * @param rootState
     */
    validateWithCurrentModel({ rootState }) {
      this.commit("validateWithModel", rootState.mShape.model);
    },

    /**
     * Export the internal model to a file.
     * FIXME the default is SHACL for now
     * @param rootState
     * @param rootGetters
     * @param {string} filename the name of the exported file.
     * @param {string} extension the extension of the exported file.
     */
    exportFileWithName({ rootGetters }, { filename, extension }) {
      if (extension === "json") {
        /* If the file is in JSON, export the model directly. */
        downloadFile(
          filename,
          JSON.stringify(rootGetters.internalModelToJson, null, 2)
        );
      } else if (extension === "nt") {
        /* Otherwise, serialize to (n-triples) Turtle first. */
        SerializerManager.serialize(
          ShaclTranslator.toSHACL(rootGetters.shapes),
          ETF.ttl
        ).then(e => {
          downloadFile(filename, e);
        });
      } else {
        console.err(`Extension ${extension} not supported.`);
      }
    },

    /**
     * Update the data file to the given data text.
     * If the given text is not valid JSON, this wil print an error.
     * @param state
     * @param commit
     * @param {string} dataText the text we want to use as data.
     */
    updateData({ commit }, { dataText }) {
      try {
        JSON.parse(dataText); /* Try parsing the text first. */
        /* Call mutation if the parsing was successful. */
        commit("setJsonData", { text: dataText });
      } catch (e) {
        console.err("Entered data is no valid JSON.");
      }
    }
  },

  getters: {
    /**
     * Get the validation report.
     * @param state
     * @returns {string} the validation report as a string.
     */
    validationReport: state => {
      return state.ValidationReport;
    }
  }
};

export { dataModule as default };
