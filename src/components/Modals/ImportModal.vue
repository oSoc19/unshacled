<template>
  <sui-modal v-model="this.$store.state.showImportModal">
    <sui-modal-header>
      Import Shapes
    </sui-modal-header>
    <sui-modal-content>
      Do you want to override the current shapes? All unsaved shapes will be
      lost.
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button @click="toggleImportModal">Cancel</sui-button>
      <sui-button negative @click="confirmOverride">Override</sui-button>
      <sui-button positive @click="confirmAppend">Append</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: "ImportModal",
  props: {
    onConfirm: {
      type: Function,
      required: true
    }
  },
  methods: {
    confirmOverride() {
      this.$props.onConfirm(true);
      this.toggleImportModal();
    },
    confirmAppend() {
      this.$props.onConfirm(false);
      this.toggleImportModal();
    },
    toggleImportModal() {
      this.$store.commit("toggleImportModal");
    }
  }
};
</script>

<style scoped></style>
