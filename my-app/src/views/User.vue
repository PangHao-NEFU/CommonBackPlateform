<template>
    <div class="manage">
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd">+ 新增</el-button>
            <el-form :model="userForm" label="姓名" :inline="true">
                <el-form-item >
                    <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryName">查询</el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="common-table">

                <el-table
                        height="90%"
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="name"
                            label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="sex"
                            label="性别">
                        <!--                这里的sex为01，需要显示为男女，所以需要自定义列模板，elementui提供了插槽的方式自定义-->
                        <template slot-scope="scope">
                            <span style="margin-left: 10px">{{scope.row.sex==1?'男':'女'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="age"
                            label="年龄">
                    </el-table-column>
                    <el-table-column
                            prop="birth"
                            label="出生日期">
                    </el-table-column>
                    <el-table-column
                            prop="phoneNum"
                            label="手机号">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.row)">编辑</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>

            <div class="pager">
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="10"
                        @current-change="handlePage"
                >
                </el-pagination>
            </div>
        </div>




        <el-dialog title="收货地址"
                   :visible.sync="dialogFormVisible"
                   width="50%"
                   :before-close="handleClose"
        >

            <el-form ref='form' :model="form" :inline="true" :rules="rules">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="请输入姓名" ></el-input>
                </el-form-item>
                <el-form-item class='age' label="年 龄" prop="age">
                    <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
                </el-form-item>

                <el-form-item label="性  别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择性别" width="180px">
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="出生日期" prop="birth">
                    <el-col :span="11">
                        <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.birth"
                                style="width:180px;"
                                value-format="yyyy-MM-DD"
                        ></el-date-picker>
                    </el-col>

                </el-form-item>

                <el-form-item label="手机号" prop="phoneNum">
                    <el-input v-model="form.phoneNum" placeholder="请输入手机号"></el-input>
                </el-form-item>


            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelForm">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import {getUser,addUser,deleteUser,editUser} from "@/api";
    export default {
        name: "User",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    age: '',
                    sex:'',
                    birth: '',
                    phoneNum:''

                },
                formLabelWidth: '120px',
                rules:{
                    name:[
                        {required:true,message:'请输入姓名',trigger:'blur'},
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    phoneNum:[
                        {required:true,message:'请输入手机号',trigger:'blur'}
                    ],
                },
                tableData:[],
                modelType:0,   //0表示新增用户,1表示编辑用户
                total: 0 ,        //数据总条数
                pageData:{          //分页数据,page是当前页码,limit是每页的数据个数
                    page:1,
                    limit:10
                },
                userForm:{          //顶部搜索栏部分,通过name来查找
                    name:''
                }
            }
        },
        methods:{
            submit() {
                this.$refs.form.validate((valid)=>{ //先对表单进行验证,如果通过则向后台发送axios请求
                    if (valid){
                        //axios请求
                        if (this.modelType === 0) {     //0代表首次添加,1代表修改
                            addUser({body:this.form}).then(()=>{   //添加后再调用获取用户列表
                                this.getUserList();
                            })

                        } else {
                            editUser(this.form).then(()=>{   //添加后再调用获取用户列表
                                this.getUserList();
                            })
                        }

                        this.cancelForm()
                    }
                })

            },
            handleClose() {
                this.dialogFormVisible=false
            },
            cancelForm() {
                this.dialogFormVisible=false
                this.$refs.form.resetFields()
            },
            handleEdit(row) {
                this.modelType=1
                this.dialogFormVisible=true
                this.form=JSON.parse(JSON.stringify(row))      //此处不能直接赋值,否则会直接修改,需要深拷贝
            },
            handleDelete(row) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {         //点击确认
                    deleteUser({id:row.id}).then(()=>{
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    })
                    this.getUserList()

                }).catch(() => {           //点击取消
                    this.$message({
                        type: 'warning',
                        message: '已取消删除'
                    });
                });

            },
            //此方法从后端调用用户列表,并加载到tableData模型上
            getUserList() {
                //注意get请求是从params中获取参数的
                getUser({params:{...this.userForm,...this.pageData}}).then(({data})=>{      //发送ajax请求从后端接口(mock模拟)接收用户数据
                    console.log(data)
                    this.tableData=data.list
                    this.total=data.list?data.count:0     //列表总条目数,用于分页展示
                })
            },

            //添加用户的回调
            handleAdd() {
                this.modelType=0
                this.dialogFormVisible=true
            },

            //更改页码,val就是当前页码
            handlePage(val) {
                console.log(val)
                this.pageData.page=val
                this.getUserList()
            },
            queryName(){
                this.getUserList()
            }

        },

        mounted() {
            this.getUserList()
        }
    }
</script>

<style lang="less" scoped>
    .manage{
      height: 99%;
      .manage-header{
        margin: 10px;
        display: flex;
        justify-content: space-between;
      }
      /deep/.el-dialog__body{
        padding: 50px;
        display: flex;
        justify-content: space-between;
        .el-form{
            .el-input__inner{
              padding-right: 10px
            }
            .el-form-item__label{
              padding: 0 20px;
            }

        }
      }
      .common-table{
        position: relative;
        height: calc(100% - 70px);
        .pager{
          position: absolute;
          bottom: 0;
          right: 20px;
        }
      }
    }

</style>