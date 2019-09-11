import Vue from "vue";
import { ETF } from "../util/enums/extensionToFormat";
import ParserManager from "../parsing/parserManager";
import SerializerManager from "../parsing/serializerManager";
import ValidatorManager from "../validation/validatorManager";
import language from "../util/enums/languages";
import getConstraints from "../util/constraintSelector";
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
     * Set the data file to the given contents.
     * @param state
     * @param name {string} the name of the data file.
     * @param contents {string} the contents of a read data file.
     * @param extension {string} the extension of the data file.
     */
    setData(state, { name, contents, extension }) {
      Vue.set(state, "dataFileName", name);
      Vue.set(state, "dataFile", contents);
      Vue.set(state, "dataFileExtension", extension);
      ParserManager.parse(contents, ETF.ttl).then(data =>
        Vue.set(state, "dataText", JSON.stringify(data, null, 2))
      );
    },

    /**
     * Set the given JSON data as the current data file.
     * @param state
     * @param text {string} the data in JSON format.
     */
    setJsonData(state, { text }) {
      Vue.set(state, "dataText", text);
      Vue.set(state, "dataFileExtension", "json");
      Vue.set(state, "dataFile", text);
    },

    /**
     * Execute the validation using the given arguments.
     * @param state
     * @param data
     * @param shapes
     * @param format
     */
    validate(state, { data, shapes, format }) {
      ValidatorManager.validate(data, shapes, format)
        .then(report => {
          state.validationReport = report;
          state.showValidationReportModal = true;
        })
        .catch(e => console.error(`Error while validating: ${e}`));
    },

    /**
     * Parse the model to the expected format and validate the data file using these shapes.
     * If there is no data file loaded, this will print an error.
     * @param state
     * @param model
     */
    validateWithModel(state, model) {
      console.log(JSON.stringify(model, null, 2));
      if (state.dataFile.length > 0) {
        SerializerManager.serialize(
          ShaclTranslator.toSHACLSimple(model),
          ETF.ttl
        )
          .then(shapes => {
            if (state.dataFileExtension === "json") {
              SerializerManager.serialize(
                JSON.parse(state.dataFile),
                ETF.ttl
              ).then(data =>
                ValidatorManager.validate(data, shapes, state.format)
                  .then(report => {
                    state.validationReport = report;
                    state.showValidationReportModal = true;
                  })
                  .catch(e => console.error(`Error while validating: ${e}`))
              );
            } else {
              ValidatorManager.validate(state.dataFile, shapes, state.format)
                .then(report => {
                  state.validationReport = report;
                  state.showValidationReportModal = true;
                })
                .catch(e => console.error(`Error while validating: ${e}`));
            }
          })
          .catch(e => console.error(`Error while serializing: ${e}`));
      } else {
        console.error("No data file loaded.");
      }
    }
  },
  actions: {
    /**
     * Recieves a datafile and takes its content to the state
     * @param state
     * @param commit
     * @param file The file containing data to check on
     * */
    uploadDataFile({ commit }, file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = event =>
        commit("setData", {
          name: file.name,
          contents: event.target.result,
          extension: file.name.split(".").pop()
        });
    },

    /**
     * Takes a file, reads the extension and depending on the format uses the correct parser to turn it into an intern model
     * @param _
     * @param file The uploaded file
     * */
    uploadSchemaFile(_, file) {
      const reader = new FileReader();
      const fileExtension = file.name.split(".").pop();
      const type = ETF[fileExtension];
      const self = this;

      reader.readAsText(file);
      reader.onload = function(event) {
        ParserManager.parse(event.target.result, type).then(e => {
          self.dispatch("updateModel", e);
        });
      };
    },

    /**
     * Set the model to the given one.
     * @param commit
     * @param getters
     * @param model
     */
    updateModel({ commit, rootGetters }, model) {
      commit("setModel", { model, getters: rootGetters }, { root: true });
    },

    /**
     * Validate the interal model.
     * @param rootState
     */
    validate({ rootState }) {
      this.commit("validateWithModel", rootState.mShape.model);
    },

    /**
     * Export the internal model to a file.
     * // FIXME the default is SHACL for now
     * @param rootState
     * @param rootGetters
     * @param filename {string} the name of the exported file.
     * @param extension {string} the extension of the exported file.
     */
    exportFileWithName({ rootGetters }, { filename, extension }) {
      if (extension === "json") {
        downloadFile(
          filename,
          JSON.stringify(rootGetters.internalModelToJson, null, 2)
        );
      } else if (extension === "ttl") {
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
     * TODO
     * @param commit
     * @param dataText
     */
    updateData({ commit }, { dataText }) {
      try {
        JSON.parse(dataText);
        commit("setJsonData", { text: dataText });
      } catch (e) {
        console.err("Entered data is no valid JSON.");
      }
    }
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
     * Get the validation report.
     * @param state
     * @returns {string}
     */
    validationReport: state => {
      return state.ValidationReport;
    }
  }
};

export { dataModule as default };
