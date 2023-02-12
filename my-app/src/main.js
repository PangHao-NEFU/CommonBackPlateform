import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from "./router";
import store from "./store";
import mock from './api/mock'
import Cookie from "js-cookie";


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(store)

//全局前置路由守卫,没登录禁止访问home页面
router.beforeEach((to,from,next)=>{
    //判断token存不存在
    const token=Cookie.get('token')
    if (!token&&to.name!=='login'){   //需要注意当第一次进入login时就不要跳转了,否则会进入死循环
      next({
        name: 'login',
      })
    }else if (token && to.name==='login'){      //如果用户已经登录过了,在前往login时就直接跳到home
      next({name:'Main'})
    }else {
        next()      //其他情况放行
    }
})

new Vue({
  render: h => h(App),
  router,
  store,
    created() {
      store.commit('addMenuRouter',router)
    }
}).$mount('#app')
