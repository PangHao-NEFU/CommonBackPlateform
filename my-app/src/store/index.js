//这是一个管理vuex的主文件,里面存放着各种vuex的模块,对于不同部分,使用不同的vuex模块
import Vue from "vue"
import Vuex from 'vuex'
import tab from "./tab";

Vue.use(Vuex)


const store=new Vuex.Store({
    modules:{
        tab
    }
})
export default store

