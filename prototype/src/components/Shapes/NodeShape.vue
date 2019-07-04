<template>
    <div>
        
        <v-rect :config="configRectangle"></v-rect>
        <v-text ref="node" :config="configText" v-on:click="changetext"></v-text>
    </div>
</template>

<script>
    export default {
        name: "NodeShape",
        props: ["posX", "posY", "tex"],
        data() {
            return {
                configRectangle: {
                    x: 0,
                    y: 0,
                    height: 50,
                    width: 250,
                    fill: "white",
                    stroke: "black",
                    strokeWidth: 4,
                },
                configText: {
                    text: "feozrsfizefeqfoeafo^p^",
                    size: 20,
                    align: "center",
                    x: 0,
                    y: 0,
                    width: 200
                }
            };
        },
        created() {
            this.configRectangle.x = Number.parseInt(this.posX);
            this.configRectangle.y = Number.parseInt(this.posY);
            this.configText.x = this.posX + 25;
            this.configText.y = Number.parseInt(this.posY + 20);
        },
        methods: {
            changetext() {

                let configText = this.configText;
                let node = this.$refs.node;
            
                let textarea = document.createElement("textarea");
                let rect = textarea.getBoundingClientRect();
                let bodrect = document.body.getBoundingClientRect();
               
               let height = node.clientHeight;
                document.body.append(textarea);
               
                textarea.id = "textarea";
                textarea.textContent = configText.text;
                textarea.width = configText.width;
                textarea.style.bottom = rect.bottom + "px";
                textarea.style.left = rect.left+ "px";
                textarea.style.position = "absolute";
                textarea.style.height = height + "px";
                textarea.style.top = configText.y + "px";
                textarea.style.left = configText.x + "px";
                textarea.style.width = configText.width + "px";
                textarea.style.fontSize = configText.fontSize + "px";
                textarea.style.border = "none";
                textarea.style.padding = "0px";
                textarea.style.margin = "0px";
                textarea.style.overflow = "hidden";
                textarea.style.background = "none";
                textarea.style.outline = "none";
                textarea.style.resize = "none";
                textarea.style.textAlign = "center";
                this.configText.text = " ";

                textarea.addEventListener('keydown', function (e) {
                    // hide on enter
                    // but don't hide on shift + enter
                    if (e.keyCode === 13 && !e.shiftKey) {
                        configText.text = textarea.value;
                        document.getElementById("textarea").remove();
                    }
                    // on esc do not set value back to node
                    
                });
            }
        }
    };
</script>

<style scoped>

</style>