<template>
    <div class="bag-container">
        <div class="bag-head">
            <div class="head-title">
                购物车
            </div>
        </div>
        <div class="bag-content">
            <div class="number">
                <span>购物车</span>
                <span>({{itemSum}})</span>
            </div>
            <div class="content">
                <div class="itemlist">
                    <div class="title">
                        <span>
                            <el-checkbox v-model="checkAll"  @change="handleCheckAllChange">全选</el-checkbox>
                        </span>
                        <span @click="deleteAll()">删除选中商品</span>
                        <!-- <span>移入心愿单</span> -->
                    </div>
                    <div class="list">
                        <!-- <el-checkbox-group v-model="items">
                            <el-checkbox v-for="(item,index) in items">
                                <span class="list-son">
                                    <img v-bind:src="item.img" alt="">
                                </span>
                                <span class="list-son">
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
                                        <div class="delete">
                                            删除
                                        </div>
                                    </span>    
                            </el-checkbox>
                        </el-checkbox-group> -->
                        <ul>
                            <li v-for="(item,index) in items" >
                                <el-checkbox v-model="item.checked"></el-checkbox>
                                    <span class="list-son"  @click="getItems(item.product_number)">
                                    <img v-bind:src="item.img" alt="">
                                    </span>
                                    <span class="list-son">
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
                                        <div class="delete">
                                            删除
                                        </div>
                                    </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="pay">
                    <div class="p-title" style="font-weight:600">订单明细</div>
                    <div class="p-sum">
                        <div>商品总价</div>
                        <div class="p-num">
                            <span>￥</span>
                            <span>{{priceSum}}</span>
                        </div>
                    </div>
                    <div class="trans">
                        <div>运费</div>
                        <div class="p-num">免邮</div>
                    </div>
                    <div class="p-total">
                        <div>合计</div>
                        <div class="p-num" style="font-weight:600">
                            <span>￥</span>
                            <span>{{priceSum}}</span>
                        </div>
                    </div>
                    <div class="p-btn">
                        <button @click="buy()">
                            <i class="el-icon-shopping-bag-2"></i>
                            去结算
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reqBagInfo } from '../api/index'
import { reqBagPay } from '../api/index'
import { reqAcc } from '../api/index'
import { reqBagDelete } from '../api/index'

export default {
    inject: ['reload'],
    mounted() {
        this.getSpbag()
    },
    data() {
        return{
            items: [],
            item: {
                checked:false,
                img: '',
                itemInfo: '',
                itemPrice: '',
                product_number:''
            },
            //     {
            //     checked:false,
            //     img: require('../assets/img/bag2.webp'),
            //     itemInfo: ' 女童 品牌标志嵌花针织羊毛混纺围巾',
            //     itemPrice: 90,
            // },
            //     {
            //     checked:true,
            //     img: require('../assets/img/bag3.webp'),
            //     itemInfo: ' 女童 品牌标志嵌花针织羊毛混纺围巾',
            //     itemPrice: 90,
            //     }],
            checkAll: '',
            // status : this.items.filter( item => item.checked ).length === this.items.length ? true : false
        }
    },
    methods: {
        //获取购物车数据
         async getSpbag() {
            let res = await reqBagInfo()
            let data = res.data.data
            for (let i = 0; i < data.length; i++){
                let newItem = {
                    cheched: false,
                    img: data[i].product_image,
                    itemInfo: data[i].title,
                    itemPrice: data[i].price,
                    product_number:data[i].product_number
                }
                this.items.push(newItem)
            }
            console.log(res)
        },
        handleCheckAllChange() {
            this.items.map(function( item ){
                item.checked = this.checkAll;
                return item;
            }.bind(this));
        },
        async buy() {
            let list = []
            for (var i= 0 ;i< this.items.length; i++) {
                if (this.items[i].checked == true) {
                    list.push(this.items[i].product_number)
                }
                // console.log(this.items[i].product_number)
            }
            const lists = JSON.stringify(list)
            let res = await reqBagPay({product_numbers: list})
            console.log(res)
            let msg = res.data.msg
            if (res.data.code == '200') {
                this.$message({
                    message: msg,
                    type: 'success'
                });
            }
            else {
                this.$message.error(msg);
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
              product_number:data.product_number
            }
        });
        },
         async deleteAll() {
            let list = []
            for (var i= 0 ;i< this.items.length; i++) {
                if (this.items[i].checked == true) {
                    list.push(this.items[i].product_number)
                }
                // console.log(this.items[i].product_number)
             }
            console.log(list)
            // const lists = JSON.stringify(list)
            let res = await reqBagDelete({product_numbers: list})
             console.log(res)
             this.reload()   
        },
    },
    computed: {
        // checkAll() {
        //     this.items.filter( item => item.checked ).length === this.items.length ? true : false
        // }
        priceSum: {
            get() {
                // console.log('调用了computed');
                var sum = 0;
                for (var i= 0 ;i< this.items.length; i++) {
                    if (this.items[i].checked == true) {
                        sum +=this.items[i].itemPrice;
                    }
                }
                return sum;
            }
        },
        itemSum(){
            return this.items.length
        }
    }

}
</script>

<style lang="less" scoped>
li{
    list-style: none;
}
.bag-head{
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
.bag-content{
    margin-top: 30px;
    padding: 0 80px;
}
.number{
    margin-bottom: 40px;
    font-size: 20px;
    font-family: ChronicleDisplayLight,Times New Roman,Serif,MSungPRC;
}
.title span{
    margin-right: 30px;
    color: #656565;
}
.list{
    margin-top: 50px;
}
// /deep/ .list .el-checkbox__input{
//     // padding-bottom: 100px !important;
// //    padding-bottom: 50%;
// }
.list img{
    width: 120px;
    height: 160px;
}
.list li{
    width: 808px;
    height: 192px;
    display: flex;
}
.list .el-checkbox{
    padding: 16px 0;
}
.list-son{
    margin-left: 20px;
}
.list-son{
    color:#656565
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
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      border-color: #333!important;
      background-color: #333!important;
    }
/deep/ .el-checkbox__input.is-focus .el-checkbox__inner{
      border-color:  #333!important;
    }
    //修改选中后文本的颜色
/deep/    .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#333!important;
}
.content{
    display: flex;
    width: 100%;
    justify-content: space-between;
    // overflow: hidden;
}
.pay{
    float: right;
//    margin-left: 100px;
   width: 500px;
   font-size: 20px;
}
.p-sum,.trans,.p-total{
    display: flex;
    justify-content: space-between;
}
.p-title,.p-sum,.trans,.p-total,.p-btn{
    margin-bottom: 40px;
}

.trans{
    padding-bottom: 15px;
    border-bottom: 1px solid rgb(209, 205, 205);
}
.p-btn button{
    background-color: skyblue;
    width:100%;
    height: 50px;
    color:#fff;
    border: skyblue;
  }
</style>