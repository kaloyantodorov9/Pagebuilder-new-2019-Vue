<template>
    <div class="__group" 
        :title="node.id"
        draggable="true"
        @click="selectGroup"
        ref="group">
        <div :class="`class-${node.cssId}`">
            <component :is="ch.type" v-for="(ch, index) in children" :key="index" :node="ch">
            </component>
        </div>
        <div>
            <button @click="addChild">+</button>
            <button @click="addChildGroup">Group+</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['node'],
    computed: {
        children() {
            const ch = this.$store.state['nodes'].filter(n => n.parentId == this.node.id);
            return ch;
        }
    },
    mounted() {
        this.$refs["group"].addEventListener('dragover', event => event.preventDefault());
        this.$refs["group"].addEventListener('drop', event => {
            event.preventDefault();
            event.stopPropagation();

            const files = event.dataTransfer.files;

            if(files.length) {
                Array.prototype.slice.call(files, 0).forEach(f => {
                        this.$store.commit('addChild', {
                            content: f.name,
                            parentId: this.node.id,
                            type: 'item-image',
                            file: f,
                            src: ''
                        });
                    }
                );

                return;
            }


            const data = event.dataTransfer.getData("text");
            if(!data) return;

            const item = JSON.parse(data);
            this.$store.commit('changeContent', {
                ...item,
                parentId: this.node.id
            });
        });

        this.$refs["group"].addEventListener('dragstart', event => {
            event.stopPropagation();
            event.dataTransfer.setData("text", JSON.stringify(this.node));
        });
    },
    methods: {
        addChild() {
            this.$store.commit('addChild', {
                parentId: this.node.id,
                content: '[ New Item ]',
                type: 'paragraph'
            });
        },
        addChildGroup() {
            this.$store.commit('addChild', {
                parentId: this.node.id,
                type: 'item-group'
            });
        },
        selectGroup(event) {
            event.stopPropagation();
            this.$store.commit('select', this.node);
        }
    }
}
</script>

<style>
    .__group {
        padding: 5px;
        background: #f1f1f1;
        border: 1px solid #d5d5d5;
    }
</style>
