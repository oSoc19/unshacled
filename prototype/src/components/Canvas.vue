<template>
    <div>
        <v-stage ref="stage" :config="configKonva" id="canvas" style="background-color: lightgrey;">
            <v-layer>
                <div v-for="(prop, index) in nodes" v-bind:key="index">
                    <parent-shape></parent-shape>
                </div>
            </v-layer>
        </v-stage>
        <ShapeAdder @add-shape="createShape()"></ShapeAdder>
    </div>
</template>

<script>
    import ShapeAdder from './ShapeAdder.vue';
    // import Konva from 'konva';
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
                },
                nodes: []
            };
        },
        methods: {
            createShape: function () {
                this.nodes.push(ParentShape);
                // const stage = this.$refs.stage.getNode();
                this.$refs.stage.getNode().draw();
            }
        },
    };
</script>

<style scoped>

</style>