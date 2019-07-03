<template>
    <v-group :draggable="true">
        <node-shape :pos-y=posY :pos-x=posX></node-shape>
       
        <div v-for="(prop,index) in properties" v-bind:key="index">
           <property-shape :pos-y=calculatePropertyPlace(index) :pos-x=posX></property-shape>
        </div>
        
    </v-group>
</template>

<script>
import NodeShape from './NodeShape'
import PropertyShape from './PropertyShape'
    export default {
        name:"ParenShape",
        components:{
            NodeShape,
            PropertyShape
        },
        data() {
            return {
                properties:[
                  PropertyShape,PropertyShape,PropertyShape
                ],
                posX:100,
                posY:100
 
            };
        },

        methods:{
            calculatePropertyPlace(index){
                return (this.posY + index*40 +50)
                }
        }
    };
    
</script>

<style scoped>

</style>