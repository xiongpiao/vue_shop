<template>
  <div class="i-container">
    <div class="i-head">
        <div class="head-title">
            商品详情
        </div>
    </div>
    <div class="i-content">
        <div class="i-intro">
            <div class="i-pic">
                <div class="select">
                    <ul>
                        <li class="p-select" v-for="(img,index) in urlList" @click="arrowClick(index)">
                            <img v-bind:src="img" alt="">
                        </li>
                    </ul>
                </div>
                <div class="block">
                    <el-carousel trigger="click" height="600px"  :autoplay="false" ref="carousel">
                        <el-carousel-item name="index"  v-for="img in urlList">
                            <!-- <img src="../assets/img/item1.webp" alt="" class="i-img"> -->
                            <img v-bind:src="img" alt="" class="i-img">
                        </el-carousel-item>
                    </el-carousel>
                </div>  
            </div>
            <div class="i-info" >
                <div class="i-price">￥<span class="price-num">{{itemPrice}}</span></div>
                <div class="i-title">
                    <div class="title-text">{{itemTitle}}</div>
                    <div class="title-info">
                        
                        {{itemInfo}}
                    </div>
                </div>
                <div class="i-more">
                    <div class="i-classfi">
                        <span class="classfi">分类</span>
                        <span class="classfi-info">{{classifiInfo}}</span>
                    </div>
                    <div class="i-region">
                        <span class="region">地区</span>
                        <span class="region-info">{{region}}</span>
                    </div>
                    <div class="i-school">
                        <span class="school">学校</span>
                        <span class="school-info">{{school}}</span>
                    </div>
                </div>
                <div class="i-add">
                    <button class="add-btn" @click="addBag()">
                        加入购物车
                    </button>
                </div>
                <div class="i-buy">
                    <button class="buy-btn" @click="Imebuy()">
                        立即购买
                    </button>
                </div>
                <!-- <div class="i-favor">
                    <i class="el-icon-star-off"></i>
                    <span>加入收藏</span>
                </div>
                <div class="i-contact">
                    <div style="float:right">
                        联系卖家
                    </div>
                </div> -->
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { reqBag } from '../api/index'
import {reqBuy} from '../api/index'
export default {
    mounted() {
        this.getItemInfo()
    },
    data() {
        return {
            // itemPrice: '79',
            // itemTitle: '棉质通勤府绸长袖衬衫',
            // itemInfo: ' 棉质通勤府绸长袖衬衫就系你计算机好像还是江苏快三神经病学才能家乡家乡开始就是能奶凶奶凶',
            // classifiInfo: '服饰鞋帽',
            // region: '重庆',
            // school: '重庆理工大学',
            // urlList: [
            //     require('../assets/img/item1.webp'),
            //     require('../assets/img/item2.webp'),
            //     require('../assets/img/item3.webp')
            // ]
            itemPrice: this.$route.query.itemPrice,
            itemTitle: this.$route.query.itemTitle,
            itemInfo:this.$route.query.itemInfo,
            classifiInfo: this.$route.query.classifiInfo,
            region:this.$route.query.region,
            school: this.$route.query.school,
            urlList: [
                this.$route.query.urlList
            ],
            product_number:this.$route.query.product_number
        }
    },
    methods: {
        //获取接口item的值
        getItemInfo() {
            
        },
        arrowClick(index) {
            this.$refs.carousel.setActiveItem(index);
            console.log(index)
        },
        async addBag() {
            // console.log()
            let res = await reqBag({ productNumber: this.product_number })
            let data = res.data
            let msg = data.msg
            if (data.code == '200') {
                this.$message({
                    message: msg,
                    type: 'success'
                });
            }
            else {
                this.$message.error(msg);
            }
            console.log(res)
        },
        async Imebuy() {
            let res = await reqBuy({ productNumber: this.product_number })
            console.log(res)
            let data = res.data
            let msg = res.data.msg
            if (data.code == '200') {
                this.$message({
                    message: msg,
                    type: 'success'
                });
            }
            else {
                this.$message.error(msg);
            }
        }
    }

}
</script>

<style lang="less" scoped>
li{
    list-style:none;
}
.i-container{
    width: 100%;
}
.i-head{
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
.i-intro{
    padding-top: 20px ;
    padding-left: 200px;
    padding-right: 200px;
    display: flex;
}
.i-pic{
    display: flex;
}


  
  .i-pic .el-carousel{
    width: 400px;
  }
  .i-img{
    width: 400px;
    height: 600px;
  }
  .p-select:visited{
    border:2px solid #111;
  }
 
  .select{
    // margin-top: 30px;
    margin-right: 30px;
  }
  .p-select{
    // display: inline-block;
    // display: flex;
    // float: left;
    margin-right: 10px;
  }
  .p-select img{
    width: 60px;
    height: 90px;
  }
  .i-info{
    margin-left:200px;
    width: 400px;
    // font-family: AkkuratPro-Regular,MHeiPRC-Medium,sans-serif;
   
  }
  .i-info div{
    margin-bottom: 30px;
  }
  .i-price{
    font-size: 30px;
  }
  .title-text{
    font-size: 20px;
  }
  .classfi,.region,.school{
    color: #656565;
    margin-right: 15px;
  }
 .buy-btn, .add-btn{
    background-color: skyblue;
    width: 400px;
    height: 50px;
    color:#fff;
    border: skyblue;
  }
  .i-favor{
    width: 400px;
    text-align: center;
  }
  .i-contact{
    width: 400px;
  }
  .i-same{
    margin-top: 60px;
    padding-left: 200px;
    color:#656565
  }
  .pc-items-list {
    width: 1200px;
    font-size: 0;
    font-family: 'helvetica neue', tahoma, 'hiragino sans gb', stheiti, 'wenquanyi micro hei', sans-serif;
    // border-top: 1px solid #f2f2f2;
    // border-left: 1px solid #f2f2f2;
    padding-left: 0;
    padding-right: 0;
}

.pc-items-list .pc-items-item {
    width: 22%;
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
    margin-right:30px;
    margin-bottom: 32px;
}

.pc-items-list .pc-items-item:hover {
    // border: 1px solid #fd3f31;
    text-decoration: none;
    transform: translate(-1px, -1px);
}

.pc-items-list .pc-items-item-a {
    display: inline-block;
    width: 100%;
    height: 100%;
    // height: px;
    // box-sizing: border-box;
    // padding: 22px 20px 0;
    background: #fff;
    position: relative;
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
.i-same .el-carousel{
    margin-top: 50px;
    width: 1200px;
  }
</style>