<template>
    <div>
        <v-group :draggable="true">
            <node-shape :pos-y=posY :pos-x=posX></node-shape>
            <div v-for="(prop, index) in properties" v-bind:key="index">
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
                properties: [],
                posX: 100,
                posY: 100,
                addBtnConfig: {
                    x: 225, y: 85, radius: 10,
                    fill: "green", stroke: "black", strokeWidth: 4
                }
            };
        },
        methods: {
            calculatePropertyPlace(index) {
                return (this.posY + index * 40 + 50)
            },
            addProperty() {
                this.properties.push(NodeShape);
            }
        }
    };
</script>

<style scoped>

</style>