import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function getState() {
    const nodes = localStorage['nodes'];

    return {
        message: "Hello World",
        selected: null,
        properties: {

        },
        css: [
            { id: 1, color: 'red', background: 'transparent', padding: null },
            { id: 2, color: 'red', background: 'transparent', padding: '0 15px' },
            { id: 'asdasd', display: 'flex' }
        ],
        nodes: nodes && nodes.length ? JSON.parse(nodes) : [
            { type: 'item-group', content: '', id: 1, parentId: 0, cssId: 1, order: 0 },
            { type: 'paragraph', content: 'foobar 1', id: 2,  cssId: 1, parentId: 1, order: 0 },
            { type: 'paragraph', content: 'foobar 2', id: 3,  cssId: 1, parentId: 1, order: 1 },
            { type: 'paragraph', content: 'foobar 3', id: 4,  cssId: 1, parentId: 1, order: 2 },
            { type: 'paragraph', content: 'foobar 4', id: 5, cssId: 1, parentId: 1, order: 3 },
            { type: 'paragraph', content: 'foobar 5', id: 6, cssId: 1, parentId: 1, order: 4 },

            { type: 'item-group',id: 7, parentId: 1, order: 1,  cssId: 'asdasd' },

            { type: 'paragraph', content: 'Paragraph', id: 8, parentId: 7, order: 0,  cssId: 2 },
            { type: 'paragraph', content: 'foobar 2', id: 9, parentId: 7, order: 1,  cssId: 2 },
            { type: 'paragraph', content: 'foobar 3', id: 10, parentId: 7, order: 2,  cssId: 1 },
            { type: 'paragraph', content: 'foobar 4', id: 11, parentId: 7, order: 3,  cssId: 2 },
            { type: 'paragraph', content: 'foobar 5', id: 12, parentId: 7, order: 4,  cssId: 2 },
        ]
    }
}

const mutations = {
    changeContent(state, payload) {
        state.nodes = state.nodes.map(n => {
            if(n.id != payload.id) return n;

            return {
                ...n,
                ...payload
            }
        });

        localStorage['nodes'] = JSON.stringify(state.nodes);
    },
    addChild(state, payload) {

        state.nodes = [...state.nodes, {
            ...payload,
            id: state.nodes.length + 1
        }];
        localStorage['nodes'] = JSON.stringify(state.nodes);
    },
    select(state, payload) {
        state.selected = payload;
    },
    delete(state, payload) {
        state.nodes = state.nodes.filter(n => n.id != payload.id);
        localStorage['nodes'] = JSON.stringify(state.nodes);
    }
}


export default new Vuex.Store({
    state: getState(),
    mutations
});