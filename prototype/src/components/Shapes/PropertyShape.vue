<template>
    <v-rect :config="configRectangle"></v-rect>
</template>

<script>
    export default {
        name: 'PropertyShape',
        props: [
            "posY",
            "posX"
        ],
        data() {
            return {
                configRectangle: {
                    x: 0,
                    y: 0,
                    width: 250,
                    height: 40,
                    fill: "lightgray",
                    stroke: "black",
                    strokeWidth: 4,
                }
            }
        },
        created() {
            this.configRectangle.x = Number.parseInt(this.posX);
            this.configRectangle.y = Number.parseInt(this.posY);
        }
    };
</script>

<style scoped>

</style>