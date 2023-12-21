<template>
    <div>
        <div class="s-head">
            <div class="s-title">
                <el-input placeholder="搜索" v-model="input">
                    <el-button slot="append" icon="el-icon-search" @click="getSearch()"></el-button>
                </el-input>
            </div>
        </div>
        <div class="s-list">
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
        <el-empty description="未查到相关结果" v-show="noItems"></el-empty>
    </div>
</template>

<script>
import { reqSearch } from '../api/index'
import {reqAcc} from '../api/index'
export default {
    name: "search",
    data(){
        return {
            input: '',
            items: [],
            noItems:false
        }
    },
    methods: {
        async getSearch(){
            let res = await reqSearch({ info: this.input })
            console.log(res)
            if (res.data.code == '200') {
                let data = res.data.data;
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
            }
            else {
                this.noItems=true
            }
            
        },
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
                product_number: data.product_number,
            }
        });
      }
       
    },
      
}
</script>

<style lang="less" scoped>
li{
    list-style: none;
}
.s-head{
    height: 90px;
   background-color: skyblue;
}
.s-title{
    margin: 0 auto;
    width: 500px;
    padding-left:70px;
    padding-top:30px;
}

/deep/ .el-input--prefix .el-input__inner {
    padding-left: 40px;
}
.s-container{
    width: 100%;
}
.s-content{
    padding-top:30px;
    padding-left:80px;
}
.delete{
    // padding-top:10px;
    margin-left: 200px;
}
.r-text,.h-text{
    color:#656565;
}
.r-list,.h-list{
    padding-top: 20px;
}
.recent{
    margin-bottom: 30px;
}
.r-list,.h-list li{
    height: 40px;
    line-height: 40px;
}
.s-list{
    margin: 50px 100px;
}
.pc-items-list {
    width: 100%;
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
    // margin-right:px;
    margin-bottom: 50px;
    // margin-top: 20px;
}

.pc-items-list .pc-items-item:hover {
    // border: 1px solid #fd3f31;
    text-decoration: none;
    transform: translate(-1px, -1px);
}

.pc-items-list .pc-items-item-a {
   padding: 20px 20px;
    // height: px;
    // box-sizing: border-box;
    // padding: 22px 20px 0;
    background: #fff;
    position: relative;
}
.img-box{
    height: 430px;
}

.pc-items-list .pc-items-item-a img {
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
.pc-items-list li:nth-child(4n){
    margin-right: 0;
}
</style>