<template>
    <div>

        <el-container>
<!--            左侧边栏自动适应宽度-->
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-container>
                <el-header>
                    <common-header></common-header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer height="54px">
                    <common-footer></common-footer>
                </el-footer>
            </el-container>
        </el-container>
    </div>

</template>

<script>
    import CommonAside from "@/components/CommonAside";
    import CommonHeader from "@/components/CommonHeader";
    import CommonFooter from "@/components/CommonFooter";
    export default {
        name: "Main",
        components:{
            CommonAside,
            CommonHeader,
            CommonFooter,
        }
    }
</script>

<style scoped>
    .el-header{
        padding:0
    }
    .el-main{
        padding: 10px 20px;
    }
    .el-footer{
        padding: 0;
    }
</style>