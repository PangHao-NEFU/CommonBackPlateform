<template>

    <div class="header-container">

        <!--头部左侧区域-->
        <div class="l-content">
            <el-button style='margin-right: 20px' icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <span class="intext"><el-breadcrumb separator-class="el-icon-arrow-right">
<!--                面包屑中的数据受vuex中state中的tabList管理-->
                <el-breadcrumb-item
                        v-for="item in tags" :key="item.path"
                        :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
                </el-breadcrumb>
            </span>

        </div>

        <!--头部右侧区域-->
        <div class="r-content">
            <el-dropdown @command="hanleClick">
                <span class="el-dropdown-link">
                  <img class="user-head" src="../assets/images/user.png" alt="用户头像">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logOut">退出</el-dropdown-item>

                </el-dropdown-menu>
            </el-dropdown>

        </div>

    </div>
</template>

<script>
    import { mapState } from 'vuex'  //简化调用state中数据的mapstate
    import Cookie from "js-cookie";

    export default {
        name: "CommonHeader",
        methods:{
            handleMenu() {
                //触发Vuex的collapseMenu方法,在aside组件中使用,通过commit来触发
                this.$store.commit('collapseMenu')
            },
            hanleClick(command){
                if (command == 'logOut') {
                    console.log('点击退出')
                    Cookie.remove('token')
                    Cookie.remove('asideMenu')
                    this.$router.push('/login')
                }
            },

        },
        computed:{
            ...mapState({tags:state=>state.tab.tabsList})
        },
        mounted() {
            console.log(this.tags)
        }


    }
</script>

<style lang="less" scoped>
    .header-container{
      padding: 0 30px;
      background-color: darkblue;
      height: 60px;
      display: flex; //开启弹性布局,容器可伸缩
      justify-content: space-between; //弹性布局两端对齐
      align-items: center;
      .intext{
        color: white;
        font-size: 12px;
        margin-left: 10px;
      };
      .r-content {
        justify-content: center;

        .user-head {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .l-content{
        display: flex;
        align-items: center;
        justify-content: center;
        /deep/.el-breadcrumb__item{         //注意,当标签上没有vue的唯一标识时,需要用/deep/来进行样式穿刺,scss中是::v-deep
          .el-breadcrumb__inner{
            &.is-link{
              color: white;
            }
          }
        }

      }


    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }

</style>