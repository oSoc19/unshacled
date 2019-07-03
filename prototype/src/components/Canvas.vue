<template>
    <div>
        <v-stage ref="stage" @wheel="scroll" :config="configKonva" id="canvas" style="background-color: lightgrey;">
            <v-layer>
                <div v-for="(prop, index) in nodes" v-bind:key="index">
                    <v-group :draggable="true">
                        <parent-shape></parent-shape>
                        <v-circle v-on:click=removeParent() :config=rmvBtnConfig></v-circle>
                    </v-group>
                </div>
            </v-layer>
        </v-stage>
        <ShapeAdder @add-shape="createShape()"></ShapeAdder>
    </div>
</template>

<script>
    import ShapeAdder from './ShapeAdder.vue';
    import ParentShape from './Shapes/ParentShape.vue'

    const width = 0.9 * window.innerWidth;
    const height = 0.9 * window.innerHeight;

    export default {
        components: {
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
                    x: 100, y: 100,
                    width: 300, height: 50,
                    fill: "white", stroke: "black", strokeWidth: 4
                },
                nodes: [],
                map: {},
                counter: 0,
                rmvBtnConfig: {
                    x: 370, y: 138, radius: 10,
                    fill: "red", stroke: "black", strokeWidth: 1
                },
            };
        },
        methods: {
            createShape() {
                const p = ParentShape;
                this.nodes.push(p);
                this.counter += 1;
                this.map[p] = this.counter;
                this.$refs.stage.getNode().draw();
            },
            removeParent(key) {
                const index = this.nodes.indexOf(this.map[key]);
                this.nodes.splice(index, 1);
            },
            scroll(e) {
                const stage = this.$refs.stage.getNode();
                const scaleBy = 1.01;
                const oldScale = stage.scaleX();
                e.evt.preventDefault();

                const mousePointTo = {
                    x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
                    y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
                };

                const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
                stage.scale({x: newScale, y: newScale});

                const newPos = {
                    x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
                    y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
                };
                stage.position(newPos);
                stage.batchDraw();
            }
        },
    };
</script>

<style scoped>

</style>