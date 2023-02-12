<template>
    <div>
        <el-card class="box-card">
            <el-form label-width="70px"
                     :model="loginForm"
                     :rules="rules"
                     ref="loginForm"
                     class="login-container">
                <h3>欢迎登录后台管理界面</h3>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password"
                              v-model="loginForm.password"
                              show-password
                              v-on:keyup.enter.native="loginSubmit"
                              placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                            style="margin-left: 54px"
                            @click="loginSubmit"
                            type="primary">登录</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script>
    import Mock from "mockjs";
    import Cookie from 'js-cookie'
    import {getMenu} from "@/api";

    export default {
        name: "Login",
        data() {
            return {
                loginForm:{
                    username: '',
                    password:'',
                },
                rules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            loginSubmit() {
                // const token=Mock.Random.guid() token一般是后台给的
                // //tocken存入cookie用于不同页面间通信
                // Cookie.set('token',token)
                this.$refs.loginForm.validate((valid)=>{    //先对表单进行校验
                    if (valid) {
                        //console.log(this.loginForm)
                        getMenu(this.loginForm).then(({data})=>{
                            //console.log(data)
                            if (data.code === 20000) {  //code是20000代表成功,
                                Cookie.set('token',data.data.token)     //将后台传来的token设置到当前cookie

                                //动态获取左侧菜单数据存入store中
                                this.$store.commit('setMenu',data.data.menu)
                                //动态设置菜单路由
                                this.$store.commit('addMenuRouter',this.$router)

                                this.$router.push('/home')
                            }else{
                                this.$message.error(data.data.message)
                            }
                        })
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .box-card{
      width: 400px;
      //border: 1px solid black;
      margin: 200px auto;
      padding: 20px 20px 15px 20px;
      border-radius: 15px;
      box-shadow: 0 0 25px #cac6c6;
      box-sizing: border-box;
      .login-container{
        h3{
          text-align: center;
          margin-bottom: 30px;
          color: #505458;
        }
        .el-input{
          width: 198px;
        }
        
      }

    }

</style>