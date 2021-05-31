import Vue from 'vue'
import App from './App.vue'
import {Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
Vue.use(Button);
Vue.use(VueRouter)
Vue.config.productionTip = false
const allUsers=r=>require.ensure([],()=>r(require('@/page/allUsers')),'allUsers');
const home=r=>require.ensure([],()=>r(require('@/page/home')),'home');

const routes=[
  {
    path:'/',
    component:home
  },
  {
    path:'/allUsers',
    component:allUsers
  },
]
const router=new VueRouter({
  routes
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
