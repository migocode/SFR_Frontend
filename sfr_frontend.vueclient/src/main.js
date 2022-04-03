import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = true;
Vue.config.ignoredElements = [
    'auto-complete-wc'
]

new Vue({
    render: h => h(App)
}).$mount('#app');
