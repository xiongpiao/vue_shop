<template>
    <div class="my-container">
      <div class="my-head">
          <div class="head-title">
              我的发布
          </div>
      </div>
      <div class="my-content">
          <div class="total">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="全部商品" name="first">
                      <ul class="list">
                          <li v-for="(item,index) in lists">
                            <div class="list-content">
                                <div class="img-box">
                                    <img v-bind:src="item.img" alt="">
                                </div>
                                <div class="list-son">
                                     <div class="item-info">
                                            {{item.itemInfo}}
                                        </div>
                                        <div class="bgnum">
                                            <span>数量</span>
                                            <span style="margin-left:10px">1</span>
                                        </div>
                                        <div class="price">
                                            <span>￥</span>
                                            <span>{{item.itemPrice}}</span>
                                        </div>
                                        <div class="purchased" v-show="item.be_purchased == '0' ?false:true">
                                            已被购买
                                        </div>
                                        <el-button class="delete" @click="deleteMyItems(item.product_number)" v-show="item.be_purchased == '1' ?false:true">
                                            下架
                                        </el-button>
                                    </div>
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
import { reqMyItems } from '../api/index'
  import {reqDeleteMyItems} from '../api/index'
export default {
    mounted() {
        this.getMyItems()
    },
      data() {
        return {
            activeName: 'first',
            lists:[],
            //     {
            //     img: require('../assets/img/bag2.webp'),
            //     itemInfo: ' 女童 品牌标志嵌花针织羊毛混纺围巾',
            //     itemPrice: 90,
            // },
            //     {
            //     img: require('../assets/img/bag3.webp'),
            //     itemInfo: ' 女童 品牌标志嵌花针织羊毛混纺围巾',
            //     itemPrice: 90,
            // },
            //     {
            //     img: require('../assets/img/bag3.webp'),
            //     itemInfo: ' 女童 品牌标志嵌花针织羊毛混纺围巾',
            //     itemPrice: 90,
            // },
            //     {
            //     img: require('../assets/img/bag3.webp'),
            //     itemInfo: ' 女童 品牌标志嵌花针织羊毛混纺围巾',
            //     itemPrice: 90,
            // }],
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
          },
        async getMyItems() {
            let res = await reqMyItems()
            console.log(res)
            let data = res.data.data
            for (var i = 0; i < data.length; i++) {
                let newList = {
                    img : data[i].product_image,
                    itemInfo : data[i].title,
                    itemPrice: data[i].price,
                    product_number: data[i].product_number,
                    be_purchased: data[i].be_purchased
                }
                this.lists.push(newList)
            }
          },
          async deleteMyItems(product_number) {
              let res = await reqDeleteMyItems({ product_number: product_number })
                console.log(res)
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
      height: 600px;
  }
  .list-content{
      padding: 30px 35px;
  }
  .list-content .img-box {
    height: 400px;
  }
  .list-content .img-box img{
    width: 100%;
  }
  .info div{
      color: #656565;
      margin-top: 20px;
  }
  .list-son{
    // margin-left: 20px;
    margin-bottom: 30px;
}
.list-son{
    color:#656565
}
.list-son img{
    text-align: center;
    justify-content: center;
}
.list-son .price{
    color: #111;
    font-size: 20px;
    font-weight: 550;
   
}
.list-son div{
    margin-bottom: 10px;
}
.bgnum,.star,.delete{
    font-size: 13px;
}
.item-info{
    color:#111
}
  </style>