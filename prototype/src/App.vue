<template>
    <div id="app">
        <!--        <img alt="Vue logo" src="./assets/logo.png">-->
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
        <Canvas></Canvas>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import Canvas from './components/Canvas.vue'

    export default {
        name: 'app',
        components: {
            // HelloWorld,
            Canvas
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    canvas {
        border: 1px solid black;
    }
</style>
