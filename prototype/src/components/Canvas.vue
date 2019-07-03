<template>
    <div id="container" style="background-color: lightgrey;">
        <v-stage :config="configKonva" id="canvas">
            <v-layer>
                <v-circle :config="configCircle"></v-circle>
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
    const width = 0.9 * window.innerWidth;
    const height = 0.9 * window.innerHeight;

    export default {
        data() {
            return {
                configKonva: {
                    width: width,
                    height: height,
                    container: 'container',
                },
                configCircle: {
                    x: 100,
                    y: 100,
                    radius: 70,
                    fill: "white",
                    stroke: "black",
                    strokeWidth: 4
                }
            };
        }
    };
</script>

<style scoped>

</style>