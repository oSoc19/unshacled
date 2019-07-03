<template>
    <div>
        <v-stage ref="stage" :config="configKonva" id="canvas" style="background-color: lightgrey;">
            <v-layer>
                <v-circle :config="configCircle"></v-circle>
            </v-layer>
        </v-stage>
        <ShapeAdder @add-shape="createShape()"></ShapeAdder>
    </div>
</template>

<script>
    import ShapeAdder from './ShapeAdder.vue';
    import Konva from 'konva';

    const width = 0.9 * window.innerWidth;
    const height = 0.9 * window.innerHeight;

    export default {
        data() {
            return {
                configKonva: {
                    width: width,
                    height: height,
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
        },
        methods: {
            createShape: function () {
                const stage = this.$refs.stage.getNode();
                let layer = new Konva.Layer();
                let item = new Konva.Circle({
                    x: 200,
                    y: 100,
                    radius: 70,
                    fill: "red",
                    stroke: "black",
                    strokeWidth: 4,
                    draggable: true,
                });
                layer.add(item);
                stage.add(layer);
                stage.draw();
            }
        },
        components: {
            ShapeAdder
        }
    };
</script>

<style scoped>

</style>