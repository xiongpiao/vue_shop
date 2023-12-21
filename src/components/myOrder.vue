<template>
  <div class="my-container">
    <div class="my-head">
        <div class="head-title">
            我的订单
        </div>
    </div>
    <div class="my-content">
        <div class="total">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部订单" name="first">
                    <ul class="list">
                        <li v-for="(item,index) in lists" >
                            <div class="list-content">
                                <div class="img-box">
                                    <img v-bind:src="item.img" alt="">
                                    <!-- <img src="../assets/img/bag1.webp" alt=""> -->
                                </div>
                                <div class="info">
                                    <div class="title">
                                        {{item.title}}
                                        <!-- 女童 品牌标志嵌花针织羊毛混纺围巾 -->
                                    </div>
                                    <div class="price">
                                        实付金额：￥{{item.price}}
                                    </div>
                                    <div class="num">
                                        商品件数：{{item.num}}
                                    </div>
                                </div>
                                <el-divider></el-divider>
                                
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="待收货" name="second">
                    <ul class="list">
                    <li v-for="(item,index) in notGetlists" >
                            <div class="list-content">
                                <div class="img-box">
                                    <img v-bind:src="item.img" alt="">
                                    <!-- <img src="../assets/img/bag1.webp" alt=""> -->
                                </div>
                                <div class="info">
                                    <div class="title">
                                        {{item.title}}
                                        <!-- 女童 品牌标志嵌花针织羊毛混纺围巾 -->
                                    </div>
                                    <div class="price">
                                        实付金额：￥{{item.price}}
                                    </div>
                                    <div class="num">
                                        商品件数：{{item.num}}
                                    </div>
                                </div>
                                <el-button class="get" @click="getItems(item.product_number)">收货</el-button>
                                <el-divider></el-divider>
                                
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
                <el-tab-pane label="已完成" name="third">
                    <ul class="list">
                    <li v-for="(item,index) in endlists" >
                            <div class="list-content">
                                <div class="img-box">
                                    <img v-bind:src="item.img" alt="">
                                    <!-- <img src="../assets/img/bag1.webp" alt=""> -->
                                </div>
                                <div class="info">
                                    <div class="title">
                                        {{item.title}}
                                        <!-- 女童 品牌标志嵌花针织羊毛混纺围巾 -->
                                    </div>
                                    <div class="price">
                                        实付金额：￥{{item.price}}
                                    </div>
                                    <div class="num">
                                        商品件数：{{item.num}}
                                    </div>
                                </div>
                                <el-divider></el-divider>
                                
                            </div>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
  </div>
</template>

<script>
import { reqselfOrder } from "../api/index"
import {reqgetItems} from '../api/index'
export default {
    inject: ['reload'],
    mounted() {
        // console.log(111)
        this.getOrder()
    },
    data() {
      return {
          activeName: 'first',
          lists: [],
          notGetlists: [],
          endlists:[],
          list: {
                img: '',
                title: '',
                price: '',
                num: '',
                is_get: '',
                product_number:''
            },
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
        },
        async getOrder() {
            let res = await reqselfOrder()
            console.log(res)
            let data = res.data.data
            for (var i = 0; i < data.length; i++) {
                let newList = {
                    img : data[i].product_info.product_image,
                    title : data[i].product_info.title,
                    price: data[i].product_info.price,
                    num: 1,
                    is_get: data[i].is_get,
                    product_number:data[i].product_info.product_number
                }
                this.lists.push(newList)
                //没有收货
                if (data[i].is_get == '0') {
                    this.notGetlists.push(newList)
                }
                else if (data[i].is_get == '1') {
                    this.endlists.push(newList)
                }
            }
        },
      async getItems(product_number) {
          let res = await reqgetItems({ product_number: product_number })
          console.log(res)
          this.reload()  
      }
    }
}
</script>

<style lang="less" scoped>
li{
    list-style: none;
}
.my-container{
    width: 100%;
}
.my-head{
    height: 90px;
//    background-color: #111;
    border-bottom: 1px solid  rgb(209, 205, 205)  ;
    background-color: skyblue;
}
.head-title{
    text-align: center;
    line-height: 90px;
    color:#fff;
    font-size: 24px;
    // letter-spacing: 5px;
    font-family: ChronicleDisplayLight,Times New Roman,Serif,MSungPRC;
    font-weight: 500;
}
.my-content{
    padding: 30px 100px;
}
/deep/ .el-tabs__item:hover {
    color: #111;
}
.list{
    width: 100%;
}
.list li{
    // border: 1px solid #656565;
    float: left;
    width: 25%;
    height: 650px;
}
.list-content{
    padding: 30px 35px;
}
.img-box{
    height: 400px;
}
.list-content .img-box img{
    width: 100%;
}
.get{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
.info div{
    color: #656565;
    margin-top: 20px;
}
</style>