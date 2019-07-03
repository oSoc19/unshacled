<template>
    <div>
        <v-stage ref="stage" :config="configKonva" id="canvas" style="background-color: lightgrey;">
            <v-layer>
                <parent-shape></parent-shape>        
            </v-layer>
        </v-stage>
        <ShapeAdder @add-shape="createShape()"></ShapeAdder>
    </div>
</template>

<script>
    import ShapeAdder from './ShapeAdder.vue';
    import Konva from 'konva';
    import ParentShape from './Shapes/ParentShape.vue'

    const width = 0.9 * window.innerWidth;
    const height = 0.9 * window.innerHeight;

    export default {
        components:{
            ParentShape,
            ShapeAdder
        },
        data() {
            return {
                configKonva: {
                    width: width,
                    height: height,
                },
                configRect: {
                    x: 100,
                    y: 100,
                    width: 300,
                    height:50,
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
                let group = new Konva.Group();
                group.setDraggable(true);
                let red = new Konva.Circle({
                    x: 200, y: 100, radius: 50,
                    fill: "red", stroke: "black", strokeWidth: 4,
                    // draggable: true,
                });
                let blue = new Konva.Circle({
                    x: 100, y: 200, radius: 50,
                    fill: "blue", stroke: "black", strokeWidth: 4,
                    // draggable: true,
                });
                group.add(red);
                group.add(blue);

                layer.add(group);
                stage.add(layer);
                stage.draw();
            }
        },
    };
</script>

<style scoped>

</style>