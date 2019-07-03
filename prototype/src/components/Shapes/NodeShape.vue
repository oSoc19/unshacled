<template>
    <v-rect :config="configRectangle"></v-rect>
</template>

<script>
    export default {
        name: "NodeShape",
        props: ["posX", "posY"],
        data() {
            return {
                configRectangle: {
                    x: 0,
                    y: 0,
                    height: 50,
                    width: 250,
                    fill: "white",
                    stroke: "black",
                    strokeWidth: 4,
                }
            };
        },
        created() {
            this.configRectangle.x = Number.parseInt(this.posX);
            this.configRectangle.y = Number.parseInt(this.posY);
        }
    };
</script>

<style scoped>

</style>