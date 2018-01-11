// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueResource from 'vue-resource'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.http.options.root = 'http://10.0.1.2:8080/';



router.beforeEach((to, from, next) =>{

  if (to.path != '/login'){
    if(localStorage.access_token != undefined){
      next();
    } else {
      next({path:'login', query: {redirect: to.path}})
    }

  } else {
    next()
  }


});


const store = new Vuex.Store({
  state:{
    username :''
  },

  mutations:{
    setUsername(state, user){
      state.username = user;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store:store,
  template: '<App/>',
  components: { App }

});





