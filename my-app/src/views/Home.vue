<template>

    <el-row>
<!--        左侧占1/3-->
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-card class="box-card">
                    <div class="user">
                        <img src="../assets/images/user.png" alt="用户头像">
                        <div class="user-info">
                            <p class="name">Admin</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登陆时间: <span>2023.2.8</span></p>
                        <p>上次登陆地点: <span>黑龙江省哈尔滨市</span></p>
                    </div>


                </el-card>

                <el-card class="box-card" style="margin-top: 20px;height: 400px">
                    <el-table
                            :data="tableData"
                            stripe
                            style="width: 100%">    <!--tableData就是表对应的数据-->

<!--                        使用v-for生成列,注意v-for遍历对象时,第一个为对象的值,第二个为对象的键-->
                        <el-table-column v-for="(value,key) in tableLabel"
                                         :key="key"
                                         :prop="key"
                                         :label="value"
                        />
<!--                        <el-table-column-->
<!--                                prop="name"-->
<!--                                label="课程"-->
<!--                                width="auto">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="todayBuy"-->
<!--                                label="今日购买"-->
<!--                                width="auto">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="monthBuy"-->
<!--                                label="本月购买"-->
<!--                                width="auto">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column-->
<!--                                prop="totalBuy"-->
<!--                                label="总购买"-->
<!--                                width="auto">-->
<!--                        </el-table-column>-->
                    </el-table>
                </el-card>
            </div>
        </el-col>

        <el-col :span="16">
            <div class="num">
                <el-card v-for="(value,key) in countData " :key="key" :body-style="{display:'flex',padding:0}">
                    <i class="icon" :class="`el-icon-${value.icon}`" :style="{background:value.color}"></i>
                    <div class="detail">
                        <p class="price">¥{{value.value}}</p>
                        <p class="description">{{value.name}}</p>
                    </div>
                </el-card>
            </div>

            <!--                下方折线图的部分-->
            <el-card style="height:280px">
                <div ref="echarts1" style="height: 280px "></div>
            </el-card>

<!--            饼状图的部分-->
            <div class="gragh">
                <el-card>
                    <div ref="echarts2"style="height: 280px"></div>
                </el-card>
                <el-card>
                    <div ref="echarts3"style="height: 250px"></div>
                </el-card>
            </div>

        </el-col>
    </el-row>
</template>

<script>
    import {getData} from "../api";
    import * as echarts from 'echarts'
    export default {
        name: "Home",
        data(){
            return {
                tableData: [],

                tableLabel:{    //列名与属性的映射,用v-for生成列
                    name: '课程',
                    todayBuy: '今日购买',
                    monthBuy: '本月购买',
                    totalBuy: '总购买',
                },

                countData: [
                    {
                        name: "今日支付订单",
                        value: 114,
                        icon: "success",
                        color: "#2ec7c9",
                    },
                    {
                        name: "今日收藏订单",
                        value: 514,
                        icon: "star-on",
                        color: "#ffb980",
                    },
                    {
                        name: "今日未支付订单",
                        value: 1919,
                        icon: "s-goods",
                        color: "#5ab1ef",
                    },
                    {
                        name: "本月支付订单",
                        value: 810,
                        icon: "success",
                        color: "#2ec7c9",
                    },
                    {
                        name: "本月收藏订单",
                        value: 210,
                        icon: "star-on",
                        color: "#ffb980",
                    },
                    {
                        name: "本月未支付订单",
                        value: 1234,
                        icon: "s-goods",
                        color: "#5ab1ef",
                    },
                ],
            }
        },
        mounted() {
            getData().then(({data})=>{    //http://localhost:8080/api/home/getData
                const {tableData} = data.data
                console.log(data)
                //console.log(tableData)
                this.tableData=tableData

                //从response的数据中获取图表所需数据
                const {orderData,userData,videoData}=data.data

                //基于准备好的dom,初始化echart1实例
                const echarts1=echarts.init(this.$refs.echarts1)

                //指定图表配置项和数据
                let echarts1option={}

                //处理数据
                //获取折线图x轴的属性名称
                let xBrands = Object.keys(orderData.data[0]);
                echarts1option.xAxis={data:orderData.date}
                echarts1option.yAxis={}
                echarts1option.legend={
                    data:xBrands
                }

                echarts1option.series=[]
                xBrands.forEach((key)=>{
                    echarts1option.series.push({
                        name:key,
                        data:orderData.data.map(item=>item[key]),
                        type:'line'
                    })
                })
                console.log(echarts1option)
                echarts1.setOption(echarts1option)
                //echart1结束

                //echart2开始
                const echarts2=echarts.init(this.$refs.echarts2)
                let echarts2option={
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: userData.map(item=>item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
                    series: [
                        {
                            name:'新增用户',
                            data:userData.map(item=>item.new),
                            type:'bar'
                        },
                        {
                            name: "活跃用户",
                            data:userData.map(item=>item.active),
                            type:'bar'
                        }
                    ],
                }

                echarts2.setOption(echarts2option)
                //第二个柱状图结束

                //第三个echarts开始
                const echarts3=echarts.init(this.$refs.echarts3)
                let echarts3option={
                    tooltip: {
                        trigger: "item",
                    },
                    color: [
                        "#0f78f4",
                        "#dd536b",
                        "#9462e5",
                        "#a6a6a6",
                        "#e1bb22",
                        "#39c362",
                        "#3ed1cf",
                    ],
                    series: [
                        {
                            data:videoData,
                            type:'pie'
                        }
                    ],
                }
                echarts3.setOption(echarts3option)


            })


        }
    }
</script>

<style lang="less" scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }

    .user{
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom:1px solid #999999;
      display: flex;
      align-items: center;
      img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
        margin-right: 50px;
      }
      .user-info{
        .name{
          font-size: 32px;
          margin-bottom: 10px;
        }
        .access{
          color: #999999;
        }
      }

    }

    .login-info{
        p{
          line-height: 28px;
          font-size: 14px;
          color: black;
          margin-left: 30px;
          span{
            color: gray;
            margin-left: 60px;
          }
        }
    }

    .num{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .icon{
        width: 80px;
        height: 80px;
        font-size: 30px;
        text-align: center;
        line-height: 80px;
        color: white;
      }
      .detail{
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .price{
            font-size: 30px;
            margin-bottom: 10px;
            line-height: 30px;

        }
        .description{
            font-size: 14px;
            color: #999999;
            text-align: center;
        }
      }
      .el-card{
        width: 32%;
        margin-bottom: 20px;
      }
    }
    .gragh{
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      .el-card{
        width: 48%;
        height:260px
      }
    }
</style>