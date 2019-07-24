<template>
    <div class="property-editor">
        <div>Редактирай</div>
        <div v-if="item !== null">
            <template v-for="p in properties">
                <label :key="`label-${p}`">{{ p }}</label>
                <input :value="item[p]" @change="handlePropertyChange($event, p)" :key="`input-${p}`" />
            </template>
            <div>
                Background: <input /><br>
                Display: <input /><br>
                Color: <input /><br>
                FontSize: <input /><br>
                Padding: <input /><br>
                Margin: <input /><br>
                Border: <input  /><br>
            </div>
            <button @click="deleteItem(item.id)">Del</button>
        </div>
        <div v-else>
            Няма избран елемент
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        item() {
            const selected = this.$store.state['selected'];
            return selected;
        },
        properties() {
            if(this.item == null) return [];
            return Object.keys(this.item).filter(p => p !== 'id' && p !== 'cssId' );
        }
    },
    methods: {
        handlePropertyChange(event, property) {
            this.$store.commit('changeContent', {
                [property]: event.target.value,
                id: this.item.id
            });
        },
        deleteItem(id) {
            this.$store.commit('delete', { id });
        }
    }
}
</script>
