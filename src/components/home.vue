<template>
  <div>
    <div class="head" style="background-color:skyblue">
      <div class="head-inner">
        <el-menu
          :default-active="activeIndex"
          class="home-menu"
          mode="horizontal"
          text-color="#fff"
          active-text-color="#fff"
        >
         
        <el-menu-item index="1" @click="login"  v-show="!isLogin">
            请登录</el-menu-item
          >
          <el-menu-item  class="el-icon-user" @click="self" v-show="isLogin">
            个人中心</el-menu-item
          >
          <el-menu-item index="3" class="title" >校园二手交易网站</el-menu-item>

          <span class="bdr">
            <el-menu-item index="4" class="el-icon-search" @click="search"
              >搜索</el-menu-item
            >
            <el-menu-item index="5" class="el-icon-shopping-bag-1" @click="spbag"
              >购物车</el-menu-item
            >
            <!-- <el-menu-item index="5" class="el-icon-star-off" @click="star">收藏</el-menu-item> -->
            <el-menu-item index="6" class="el-icon-plus"  @click="add">发布商品</el-menu-item>
          </span>
        </el-menu>
      </div>
    </div>
    <one></one>
  </div>
</template>

<script>
import one from '../components/one.vue';
export default {
  components: { one },
  mounted() {
    // console.log(this.$route.query.isLogin)
    const tokenStr = window.localStorage.getItem('key');
  // 没有token，强制跳转到登录页
    if (!tokenStr) {
      this.isLogin = false
    }
    else {
      this.isLogin = true
    }
  },
  data() {
    return {
      isLogin: '',
      
      activeIndex: "2",
      select: "",
      activeName: "first",
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },

    go() {
      console.log("okkk");
      this.$router.push({ name: "one" });
    },
    search() {
      this.$router.push("/search").catch(() =>{});
    },
    spbag() {
      this.$router.push("/spbag").catch(() =>{});
    },
    add() {
      this.$router.push("/add").catch(() =>{})
    },
    self() {
      this.$router.push("/self")
    }
  },
};
</script>

<style lang="less" scoped>


a {
  text-decoration: none;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 500px;
}
.el-container {
  height: 100%;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
 .el-header,
.el-menu {
  background-color: skyblue;
}
.head-inner {
  padding: 0 100px;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: pink !important;
}
.el-select .el-input {
  width: 100px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.search {
  width: 500px;
  display: inline-block;
  vertical-align: top;
  position: relative;
}
.head {
  width: 100%;
  height: 60px;
}


.title {
  position: absolute;
  left: 50%;
  translate: (-50%);
  font-family: ChronicleDisplayLight,Times New Roman,Serif,MSungPRC;
  font-weight: 500;
  font-size: 20px;
}
.bdr {
  float: right;
}
.el-menu .el-menu--horizontal {
  border: none;
  text-decoration: none;
}
.router-inner {
  width: 100%;
}

</style>