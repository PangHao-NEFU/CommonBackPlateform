<template>
<div>

    <el-menu default-active="1-4-1"
             class="el-menu-vertical-demo el-menu"
             @open="handleOpen"
             @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             activate-text-color="#fffd04b"
    >
        <h3>{{!isCollapse?'通用后台管理系统':'后台'}}</h3>
        <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>

        <el-submenu v-for="(item,index) in hasChildren" :key="index" :index="`${index}`">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{item.label}}</span>
            </template>

            <el-menu-item-group v-for="(subItem,index) in item.children" :key="subItem.name">
                <el-menu-item @click="clickMenu(subItem)" :index="subItem.url">{{subItem.label}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>


        <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">用户设置</span>
        </el-menu-item>

<!--        控制菜单展开的按钮-->
<!--        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">-->
<!--            <el-radio-button :label="false" >展开</el-radio-button>-->
<!--            <el-radio-button :label="true">收起</el-radio-button>-->
<!--        </el-radio-group>-->
    </el-menu>

</div>
</template>

<script>
    import Cookie from 'js-cookie'
    export default {
        name: "CommonAside",
        data() {
            return {
                // menudata:[
                //     {
                //         path: '/',
                //         name: 'home',
                //         label: '首页',
                //         icon: 's-home',
                //         url: 'Home/Home'
                //     },
                //     {
                //         path: '/mall',
                //         name: 'mall',
                //         label: '商品管理',
                //         icon: 'video-play',
                //         url: 'MallManage/MallManage'
                //     },
                //     {
                //         path: '/user',
                //         name: 'user',
                //         label: '用户管理',
                //         icon: 'user',
                //         url: 'UserManage/UserManage'
                //     },
                //     {
                //         label: '其他',
                //         icon: 'location',
                //         name: 'others',
                //         children: [
                //             {
                //                 path: '/pageone',
                //                 name: 'page1',
                //                 label: '页面1',
                //                 icon: 'setting',
                //                 url: 'Other/PageOne'
                //             },
                //             {
                //                 path: '/pagetwo',
                //                 name: 'page2',
                //                 label: '页面2',
                //                 icon: 'setting',
                //                 url: 'Other/PageTwo'
                //             }
                //         ]
                //     }
                // ],

            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            clickMenu(item){
                //1.如果跳转路径与当前路径一样,则不跳转 2.如果当前为home,跳到/也不跳,会重定向到home
                if (this.$route.path !== item.path&&!(this.$route.path==='/home'&&(item.path==='/'))) {
                    this.$router.push(item.path);
                }

                this.$store.commit('selectMenu',item)

            }
        },
        computed:{
            //没有子菜单
            noChildren(){
                return this.asideMenuData.filter((item)=>!item.children)
            },
            //有子菜单的进行过滤
            hasChildren(){
                return this.asideMenuData.filter((item)=>item.children)
            },
            //管理左侧菜单开闭的,通过计算属性获得vuex里state的tab中的isCollapse属性
            isCollapse() {
                return this.$store.state.tab.isCollapse     //使用的是state中tab的isCollapse属性
            },

            //左侧菜单的权限管理,显示的数据由后端数据得来
            asideMenuData() {
                //判断菜单数据,若果缓存中没有则从store中获取
                //console.log({aside:this.$store.state.tab.asideMenu})
                if (this.$store.state.tab.asideMenu.length === 0) {
                    return JSON.parse(Cookie.get('asideMenu'));
                } else {
                    return this.$store.state.tab.asideMenu;
                }
            },

        }
    }

</script>

<style scoped lang="less">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;

    }
    .el-menu{
        height: 100vh;
        h3{
            color: white;
            text-align: center;
            line-height: 48px;
            font-size: 16px;
            font-weight: 400;   //粗细设定为400

        };
        border:none;  //清除边界空隙
    }
</style>