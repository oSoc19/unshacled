<template>
    <button v-on:click="$emit('add-shape')">Add a shape</button>
</template>

<script>
    export default {
        name: "ShapeAdder",
    }
</script>

<style scoped>

</style>