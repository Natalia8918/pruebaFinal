import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { initializeApp } from "firebase/app";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from './plugins/vuetify'
import './plugins/element.js'

const firebaseConfig = {
    apiKey: "AIzaSyC3Cg5m9YPfY0OqQL1KKLGu9X-fsF8Mf0o",
    authDomain: "prueba-firebase-577c4.firebaseapp.com",
    projectId: "prueba-firebase-577c4",
    storageBucket: "prueba-firebase-577c4.appspot.com",
    messagingSenderId: "340662178731",
    appId: "1:340662178731:web:c5299b37678c7ff8f8b8ee",
    measurementId: "G-LWD07PLMEE"
};

initializeApp(firebaseConfig);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");