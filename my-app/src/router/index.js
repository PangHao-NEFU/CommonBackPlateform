import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import User from "../views/User";
import Main from "@/views/Main";
import Mall from "@/views/Mall";
import PageTwo from "@/views/PageTwo";
import PageOne from "@/views/PageOne";
import Login from "@/views/Login";
Vue.use(VueRouter)

const routes=[
    {
        path: '/',
        component: Main,
        redirect:'/home',
        name: "Main",
        children:[
            {
                path:'home',
                component:Home,

            },  //首页
            // {
            //     path:'user',
            //     component:User
            // },  //用户管理
            // {path:'mall',component: Mall},   //商品,业务属性
            // {path:'pageone',component: PageOne},
            // {path:'pagetwo',component: PageTwo}
        ]
    },
    {
        path:'/login',
        component: Login,
        name:'login',

    }

]

const router=new VueRouter({
    routes
})

export default router





