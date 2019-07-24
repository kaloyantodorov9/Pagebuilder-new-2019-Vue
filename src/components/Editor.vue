<template>
    <div class="__editor">
        <component :is="ch.type" v-for="(ch, index) in children" :key="index" :node="ch">
        </component>
    </div>
</template>
<script>
export default {
    computed: {
        children() {
            return this.$store.state['nodes'].filter(n => n.parentId == 0);
        }
    }
}
</script>

