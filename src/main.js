import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from "vuex"
import Login from "./components/Login";
import Splash from "./components/Splash";
import GuestSplash from "./components/GuestSplash";

Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store(
    {
      state: {
        authenticated: false,
        username:'',
        fname:'',
        lname:'',
        isGuest: false,
        userid:''
      },
      mutations: {
        setAuthentication(state, status) {
          state.authenticated = status;
        },
        setUsername(state,user){
          state.username = user;
        },
        setFirstname(state, firstName){
          state.fname = firstName;
        },
        setLastname(state, lastName){
          state.fname = lastName;
        },
        toggleGuestStatus(state, status){
          state.isGuest = status;
        },
        setUser_id(state, userid){
          state.userid = userid;
        }
      }
    }
);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: {
        name: "login"
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/GuestSplash",
      name: "GuestSplash",
      component: GuestSplash
    },
    {
      path: "/splash",
      name: "splash",
      component: Splash,
      beforeEnter: (to, from, next) => {
        if(store.state.authenticated == false) {
          next('/login');
        } else if(store.state.isGuest == true && store.state.authenticated == true ){
          next('/GuestSplash');
        } else{
          next();
        }
      }
    }
  ]
});

new Vue({
  el:'#app',
  store: store,
  router: router,

  render: h => h(App),
})//.$mount('#app')
