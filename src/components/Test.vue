<template>
    <p
        contenteditable="false"
        draggable="true"
        @input="changeContent"
        @click.stop.prevent="select"
        class="paragraph-item"
        :class="{selected: isSelected, [`class-${node.cssId}`]: true}"
        ref="rootNode"
    >{{ node.content }}
    </p>
</template>

<script>
export default {
    props: ['node'],
    mounted() {
        this.$refs["rootNode"].addEventListener('dragstart', event => {
            event.stopPropagation();
            event.dataTransfer.setData("text", JSON.stringify(this.node));
        });
    },
    methods: {
        changeContent(event) {
            this.$store.commit("changeContent", {
                id: this.node.id,
                content: event.target.innerText
            })
        },
        select() {
            this.$store.commit('select', this.node);
        }
    },
    computed: {
        isSelected() {
            const selected = this.$store.state['selected'];
            return selected && selected.id === this.node.id;
        }
    }
}
</script>

<style lang="scss">
.paragraph-item {
    border: 1px solid transparent;
}
.paragraph-item.selected {
    border: 1px solid pink;
}
</style>