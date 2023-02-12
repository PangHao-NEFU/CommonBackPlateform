//管理菜单相关的数据的vuex

import Cookie from "js-cookie";
export default {
    state:{
        isCollapse:false,  //此字段是控制左边菜单是否展开的,false是展开,true是收起
        tabsList:[          //header中的面包屑数据,也是当前页面的信息
            {
                path: '/home',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ],
        asideMenu:[]
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        },

        //更新面包屑数据
        selectMenu(state,val) {
            if (val.name!=='home'){
                const index=state.tabsList.findIndex(function (it){
                    return it.path===val.path
                })

                if (index===-1){
                    state.tabsList.push(val)
                }
            }
        },

        //设置menu的数据
        setMenu(state,val) {
            state.asideMenu=val
            Cookie.set('asideMenu',JSON.stringify(val))
        },

        //动态注册左侧菜单的路由,做权限控制
        addMenuRouter(state,router) {
            //如果cookie里没有asideMenu,那就不用做了
            if (!Cookie.get('asideMenu')) return
            let menuDatas = JSON.parse(Cookie.get('asideMenu'));
            state.asideMenu=menuDatas

            //组装动态路由的数据
            const menuArray=[]
            menuDatas.forEach(item=>{
                //有子菜单的要在子菜单中添加子菜单的路由组件属性
                if (item.children) {
                    item.children = item.children.map(eachItem => {
                        eachItem.component = () => import(`../views/${eachItem.url}`)  //组装路由对象的component属性
                        return eachItem
                    });
                    menuArray.push(...item.children);
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            console.log(menuArray,'menuArray')
            menuArray.forEach(item=>{
                router.addRoute('Main',item)
            })
        },
    }
}