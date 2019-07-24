<template>
    <div>
        <properties-editor></properties-editor>
        <gomba-editor></gomba-editor>
        <css-panel></css-panel>
    </div>
</template>
<script>
import { mapState } from "vuex";

export default {
    data() {
        return {
            message: this.$store.state.message
        }
    }
}
</script>

<style lang="scss">
    .__editor {
        padding: 15px;
        border: 1px solid #d0d0d0;
    }
</style>
