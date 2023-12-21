<template>
    <div class="container">
      <div class="ant-layout">
        <div class="top-sticky">
          <div class="total-num">
            共<span  style="margin: 0px 3px;">{{totalNum}}</span>件商品
          </div>
      </div>
      </div>
      <div class="pc-items">
          <ul class="pc-items-list">
              <li class="pc-items-item"  v-for="it in items">
                  <div class="pc-items-item-a" @click="getItems(it.product_number)">
                      <div class="img-box">
                        <img v-bind:src="it.img" alt="">
                      </div>
                      <div class="pc-items-item-title">
                          <span class="title-text"> {{it.title}} </span>
                      </div>
                      <div class="price-con">
                          <span class="coupon-price-title">¥</span>
                          <span class="coupon-price-afterCoupon">{{it.price}}</span>
                      </div>
                      <div class="seller-info">
                          <div class="seller-name">
                              <span class="atbfont seller-icon"></span>{{it.type}}
                          </div>
                      </div>
                      <div class="item-footer">
                          <div class="item-tags"></div>
                          <div class="sell-info">{{it.school}}</div>
                      </div>
                  </div>
              </li>
            </ul>
      </div>
      </div>
  </template>
  
  <script>
import { reqAllGoods } from '../api/index'
import { reqAcc } from '../api/index'
export default {
     mounted() {
      this.getGood();
    },
    name: 'one',
    data() {
      return {
          totalNum:'',
          items: [],
          item: {
            img:'',
            title: '',
            price: '',
            type: '',
            school: '',
            product_number:''
          },
          // {
          //   img:require('../assets/img/item.webp'),
          //   title: '棉质通勤府绸长袖衬衫',
          //   price: '59.90',
          //   type: '服饰',
          //   school:'重庆理工大学'
          // },
          // {
          //   img:require('../assets/img/item.webp'),
          //   title: '棉质通勤府绸长袖衬衫',
          //   price: '59.90',
          //   type: '服饰',
          //   school:'重庆理工大学'
          // },
          // {
          //   img:require('../assets/img/item.webp'),
          //   title: '棉质通勤府绸长袖衬衫',
          //   price: '59.90',
          //   type: '服饰',
          //   school:'重庆理工大学'
          // },
          // {
          //   img:require('../assets/img/item.webp'),
          //   title: '棉质通勤府绸长袖衬衫',
          //   price: '59.90',
          //   type: '服饰',
          //   school:'重庆理工大学'
          // }],
          value: '',
        }
    },
    methods: {
      //获取接口数据赋值给items
      async getGood() {
        let res = await reqAllGoods();
        console.log(res);
        let data = res.data.data;
        this.totalNum = data.length;
        // this.items[0].img = data[1].product_image;
        //   this.items[0].title = data[1].title;
        //   this.items[0].price = data[1].price;
        //   this.items[0].type = data[1].product_type_name;
        //   this.items[0].school = data[1].school_name;
        for (var i = 0; i < data.length; i++) {
          let newItems = {
            img : data[i].product_image,
            title : data[i].title,
            price : data[i].price,
            type : data[i].product_type_name,
            school: data[i].school_name,
            product_number:data[i].product_number
          }
          this.items.push(newItems)
        }
        // console.log(items)
      },
      // async item(product_number) {
      //   // console.log(product_number)
      //  await this.getItems(product_number)
      //   // this.$router.push("/item");
      // },
      async getItems(number) {
        let res = await reqAcc({productNumber:number});
        console.log(res);
        let data = res.data.data;
        this.$router.push({
            path: "/item",
            query: {
              itemPrice: data.price,
              itemTitle: data.title,
              itemInfo: data.product_description,
              classifiInfo: data.product_type_name,
              region: data.area_name,
              school: data.school_name,
              urlList: data.product_image,
              product_number:data.product_number
            }
        }).catch(() =>{});
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  a{
    text-decoration: none;
  }
  li{
    list-style: none;
  }
  .container {
      // width: 100%;
      // min-width: 1280px;
      // max-width: 1376px;
      padding: 0 100px;
      margin: 0 auto;
  }
  .total-num{
      width: 294px;
  }
  
  
  .total-num{
      font-size: 14px;
      height: 90px;
      line-height: 90px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color:#838383;
      background-color: #fff;
  }
  .top-sticky{
    height: 90px;
    display: flex;
    // position: absolute;
  }
  
  
    .pc-items{
      // padding-right: 0;
      // padding:30px 30px;
      width: 100%;
      // display: flex;
    }
  
  .pc-items-list {
    width: 100%;
      // width: 924px;
      font-size: 0;
      font-family: 'helvetica neue', tahoma, 'hiragino sans gb', stheiti, 'wenquanyi micro hei', sans-serif;
      // border-top: 1px solid #f2f2f2;
      // border-left: 1px solid #f2f2f2;
      padding-left: 0;
      padding-right: 0;
  }
  
  .pc-items-list .pc-items-item {
      width: 25%;
      // width: 236px;
      height: 550px;
      box-sizing: border-box;
      display: inline-block;
      font-size: 12px;
      // border: 1px solid #f2f2f2;
      border-top: none;
      border-left: none;
      background: #fff;
      vertical-align: top;
      // margin-right:30px;
      margin-bottom: 50px;
  }
  
  .pc-items-list .pc-items-item:hover {
      // border: 1px solid #fd3f31;
      text-decoration: none;
      transform: translate(-1px, -1px);
  }
  
  .pc-items-list .pc-items-item-a {
      padding: 20px 20px;
      background: #fff;
      position: relative;
  }
  .img-box{
    height: 430px;
  }
  .pc-items-list .pc-items-item-a .img-box img {
      width: 100%;
  }
  
  .pc-items-list .title-text {
      vertical-align: middle;
  }
  
  .pc-items-list .pc-items-item-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #9b9b9b;
      line-height: 20px;
      padding-top: 10px;
  }
  
  .pc-items-list .price-con {
      height: 40px;
      padding: 6px 0 0;
      line-height: 1.6;
  }
  
  .pc-items-list .price-con .coupon-price-title {
      vertical-align: baseline;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #111;
  }
  
  .pc-items-list .price-con .coupon-price-afterCoupon {
      margin-left: 4px;
      vertical-align: baseline;
      text-align: left;
      line-height: 25px;
      font-family: PingFangSC-Medium;
      font-size: 18px;
      color: #111;
  }
  
  .pc-items-list .seller-info {
      margin-top: 9px;
      font-size: 12px;
      color: #9b9b9b;
      line-height: 17px;
      background-color: #fff;
  }
  
  .pc-items-list .item-footer {
      margin-top: 4px;
      border-top: 1px solid #f2f2f2;
      padding: 9px 0;
      position: relative;
  }
  
  .pc-items-list .item-tags {
      overflow: hidden;
      white-space: nowrap;
      vertical-align: middle;
  }
  
  .pc-items-list .sell-info {
      position: absolute;
      right: 0;
      top: 2px;
      color: #9b9b9b;
      font-size: 12px;
      line-height: 17px;
      background: #fff;
      padding-left: 12px;
  }
  
  </style>