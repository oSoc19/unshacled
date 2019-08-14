<template>
  <sui-modal v-model="this.$store.state.showClearModal">
    <sui-modal-header>
      Clear page?
    </sui-modal-header>
    <sui-modal-content>
      All your unsaved changes will be lost.
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button @click="toggleClearModal">Cancel</sui-button>
      <sui-button negative @click="confirm">Clear</sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: "ClearModal",
  methods: {
    confirm() {
      this.$store.commit("clear");
      this.toggleClearModal();
    },
    toggleClearModal() {
      this.$store.commit("toggleClearModal");
    }
  }
};
</script>

<style scoped></style>
