<template>
    <div>
        <div ref="fake-container" v-show="true">
            <template v-for="cssStyle in css">
                .class-{{ cssStyle.id }} {
                    <template v-for="p in Object.keys(cssStyle).filter(c => c !== 'id')">
                        {{p}}: {{ cssStyle[p] }};
                    </template>
                }
            </template>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        const style = document.createElement('style');
        style.id = 'real-css';
        document.body.appendChild(style);

        document.getElementById('real-css').innerHTML = this.$refs["fake-container"].innerHTML;
    },
    updated() {
        this.$nextTick(() => {
            document.getElementById('real-css').innerHTML = this.$refs["fake-container"].innerHTML;
        });
    },
    computed: {
        css() {
            return this.$store.state['css'];
        }
    }
}
</script>
