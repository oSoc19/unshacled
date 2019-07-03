<template>
    <div id="container" style="background-color: lightgrey;">
        <v-stage :config="configKonva" id="canvas">
            <v-layer>
                <parent-shape></parent-shape>        
            </v-layer>
        </v-stage>
    </div>
</template>

<script>
    import ParentShape from './Shapes/ParentShape.vue'

    const width = 0.9 * window.innerWidth;
    const height = 0.9 * window.innerHeight;

    export default {
        components:{
            ParentShape
        },
        data() {
            return {
                configKonva: {
                    width: width,
                    height: height,
                    container: 'container',
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
        }
    };
</script>

<style scoped>

</style>