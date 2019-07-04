<template>
    <div>
        <v-group>
            <node-shape :pos-y=posY :pos-x=posX></node-shape>
            <div v-for="(props, index) in properties" v-bind:key="counter">
                <v-circle ref=index v-on:click=removeProperty(index) :config="getRmvPropBtnConfig(index, posX)"></v-circle>
                <property-shape :pos-y=calculatePropertyPlace(index) :pos-x=posX></property-shape>
            </div>
            <v-circle v-on:click=addProperty() :config=addBtnConfig></v-circle>
        </v-group>
    </div>
</template>

<script>
    import NodeShape from './NodeShape'
    import PropertyShape from './PropertyShape'

    export default {
        name: "ParentShape",
        components: {
            NodeShape,
            PropertyShape
        },
        data() {
            return {
                counter: 0,
                properties: [],
                posX: 100,
                posY: 100,
                addBtnConfig: {
                    x: 370, y: 112, radius: 10,
                    fill: "green", stroke: "black", strokeWidth: 1
                },
            };
        },
        created(){
            this.addBtnConfig.x = this.posX +125;
            this.addBtnConfig.y = this.posY -25;
        },
        updated(){
            console.log(this.posX)
        }
,
        methods: {
            calculatePropertyPlace(index) {
                return (this.posY + index * 40 + 50)
            },
            getRmvPropBtnConfig(index, x) {
                const y = this.calculatePropertyPlace(index);
                return {x: x - 10, y: y + 20, radius: 5, fill: "red", stroke: "black", strokeWidth: 1};
            },
            addProperty() {
                this.counter += 1;
                this.properties.push(NodeShape);
            },
            removeProperty(nodeShape) {
                const index = this.properties.indexOf(nodeShape);
                this.properties.splice(index, 1);
            },
        }
    };
</script>

<style scoped>

</style>