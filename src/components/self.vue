<template>
  <div class="s-container">
    <div class="s-head">
        <div class="head-title">
            我的账户
        </div>
    </div>
    <div class="s-content">
        <div class="card" @click="myItem">
            <div class="card-content">
                <div class="card-title">我发布的</div>
                <el-divider></el-divider>
                <div class="card-info">查看、编辑您发布的商品</div>
            </div>
        </div>
        <div class="card" @click="guestOrder">
            <div class="card-content">
                <div class="card-title">客户订单</div>
                <el-divider></el-divider>
                <div class="card-info">查看并处理客户的订单</div>
            </div>
        </div>
        <div class="card" @click="myOrder">
            <div class="card-content">
                <div class="card-title">我的订单</div>
                <el-divider></el-divider>
                <div class="card-info">查看并追踪您的订单，或创建退换货</div>
            </div>
        </div>
        <div class="card">
            <div class="card-content" @click="logout()">
                <div class="card-title">退出登录</div>
                <el-divider></el-divider>
                <div class="card-info">退出登录，将不保存您的个人信息</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data (){
        return{

        }
    },
    methods: {
        myOrder() {
            this.$router.push("/myOrder");
        },
        guestOrder() {
            this.$router.push("/guestOrder");
        },
        myItem() {
            this.$router.push("/myItem");
        },
        myInfo() {
            this.$router.push("/myInfo");
        },
        logout () {
      // 清空token
            window.localStorage.clear()
            // 跳转到登录页
            this.$router.push('/home')
        }
    }
    
}
</script>

<style lang="less" scoped>
.s-container{
    width: 100%;
}
.s-head{
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
.s-content{
    padding: 40px 250px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.card{
    width: 480px;
    height: 220px;
    box-shadow: 0 2px 5px #d5d5d5;
    margin-bottom: 60px;
}
.card-content{
    padding: 0 30px;
    text-align: center;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.card-title{
    font-family: ChronicleDisplayLight,Times New Roman,Serif,MSungPRC;
    font-weight: 600;
    font-size: 20px;
}
.card-info{
    color: #656565;
    font-size: 14px;
}
</style>