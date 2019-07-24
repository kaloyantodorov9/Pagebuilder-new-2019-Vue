<template>
    <div ref="rootNode" @click="selectImage" class="item-image" :class="{selected: isSelected}">
        <img ref="image" v-show="node.src" :src="node.src" />
        <div v-if="!node.src">
            Loading {{ node.content }}
        </div>
    </div>
</template>
<script>
    export default {
        props: ['node'],
        data() {
            return {
                loaded: !this.node.src
            }
        },
        computed: {
            isSelected() {
                const selected = this.$store.state['selected'];
                return selected && selected.id == this.node.id
            }
        },
        mounted() {
            if(!this.node.src) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.$refs["image"].src = e.target.result;
                    this.loaded = true;
                    this.$store.commit('changeContent', {
                        ...this.node,
                        src: e.target.result
                    });
                }
                reader.readAsDataURL(this.node.file);
            }

            this.$refs["rootNode"].addEventListener('dragstart', event => {
                event.stopPropagation();
                event.dataTransfer.setData("text", JSON.stringify(this.node));
            });
        },
        methods: {
            selectImage(event) {
                event.stopPropagation();
                this.$store.commit('select', this.node);
            }
        }
    }
</script>


<style lang="scss">
.item-image {
    border: 1px solid transparent;
    display: inline-block;
}
.item-image.selected {
    border: 1px solid pink;
}
</style>