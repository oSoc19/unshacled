<template>
<div>
    
            <v-rect :config="configRectangle"></v-rect>
            <v-text :config="configText"></v-text>
 </div>
</template>

<script>
    export default {
       name:'PropertyShape',
       props:[ 
            "posY",
           "posX"
           ]
         
       ,
        data() {
            return {
               
                configRectangle: {
                    x: 0,
                    y: 0,
                    width:250,
                    height:40,
                    fill: "lightgray",
                    stroke: "black",
                    strokeWidth: 4,
                    
                },

                 configText:{
                    text: "",
                    size:20,
                    align:"center",
                    x:0,
                    y:0,
                    width:200
                }
            }
           
        },
         created(){
                this.configRectangle.x = Number.parseInt(this.posX);
                this.configRectangle.y= Number.parseInt(this.posY);
                this.configText.x=this.posX + 25;
                this.configText.y=Number.parseInt(this.posY +20);
               
            }
    };
</script>

<style scoped>

</style>