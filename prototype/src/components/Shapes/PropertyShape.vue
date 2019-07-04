<template>
    <div>
        <v-rect :config="configRectangle"></v-rect>
        <v-text :config="configText" v-on:click="changetext"></v-text>
    </div>
</template>

<script>
    export default {
        name: "PropertyShape",
        props: ["posY", "posX"],
        data() {
            return {
                configRectangle: {
                    x: 0, y: 0,
                    width: 250, height: 40,
                    fill: "white", stroke: "black", strokeWidth: 2
                },
                configText: {
                    text: "Property",
                    size: 20,
                    align: "center",
                    x: 0, y: 0,
                    width: 200
                },
            };
        },
        created() {
            this.configRectangle.x = Number.parseInt(this.posX);
            this.configRectangle.y = Number.parseInt(this.posY);
            this.configText.x = this.posX + 25;
            this.configText.y = Number.parseInt(this.posY + 15);
        },
        methods: {
            changetext() {
                let configText = this.configText;

                let textarea = document.createElement("textarea");
                document.body.append(textarea);
                textarea.id = "textarea";
                textarea.textContent = configText.text;
                textarea.width = configText.width;
                textarea.style.bottom = configText.y + "px";
                textarea.style.left = configText.x + "px";
                textarea.style.position = "absolute";
                textarea.style.height = this.configRectangle.height + "px";
                textarea.style.top = this.configText.y + "px";
                textarea.style.left = this.configText.x + "px";
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