import Vue from "vue";
import Main from "./Main.vue";
import Editor from "./Editor.vue";
import Test from "./Test.vue";
import Group from "./Group.vue";
import PropertyEditor from "./PropertyEditor.vue";
import Image from "./Image.vue";
import CssPanel from "./CssPanel.vue";

Vue.component('main-component', Main);
Vue.component('gomba-editor', Editor);
Vue.component('paragraph', Test);
Vue.component('item-group', Group);
Vue.component('properties-editor', PropertyEditor);
Vue.component('item-image', Image);
Vue.component('css-panel', CssPanel);