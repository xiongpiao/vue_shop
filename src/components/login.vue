<template>
  <div class="login-container">
    <!-- <home></home> -->
    <div class="login-box">
      <div class="l-head">
        登录账户
      </div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入登录密码"
          ></el-input>
          <el-link
            type="primary"
            :underline="false"
            class="login-regist"
            @click="regist"
            >没有账号？注册</el-link
          >
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>用户登录名或密码错误</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import home from './home.vue'
import { reqUserinfo } from '../api/index'
export default {
  name: 'login',
  components: { home },
  mounted() {
     
    },
  data() {
    return {
      //表单数据绑定对象
      loginForm: {
        username: "",
        password: "",
      },
      //表单验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在3到15个字符", trigger: "blur" },
        ],
      },
      dialogVisible: false
    };
  },
  methods: {
    //重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    async login() {
      //   this.$refs.loginFormRef.validate((valid) => {});
      
      let res = await this.postUserInfo();
      // console.log(res);
      // 用户登录名或密码错误
      if (res.data.code == '500') {
        // console.log(res.data.msg);
        this.dialogVisible = true;
        this.resetLoginForm();
      }
      else if(res.data.code == '200'){
        this.$router.push({
            path: "/home"
        });
        console.log(res);
        let token = res.data.data;
        window.localStorage.setItem("key", token);
      }
    },
    regist() {
      this.$router.push("/regist");
    },
    async postUserInfo() {
      let res = await reqUserinfo({ username: this.loginForm.username, password: this.loginForm.password });
      // console.log(res.data);
      return res;
    }
  },
};
</script>

<style lang="less" scoped>
.login-container {
  // background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  border-radius: 2%;
  width: 500px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.l-head{
  font-family: ChronicleDisplayLight,Times New Roman,Serif,MSungPRC;
  font-weight: 500;
  font-size: 25px;
  padding-top: 20px;
  padding-left: 20px;
}
.login-form {
  position: absolute;
  bottom: 50px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  // display: flex;
  // justify-content: flex-end;
  width: 100%;
}
.login-regist {
  position: relative;
  text-align: center;
}
/deep/ .el-link.el-link--primary {
    color: #656565;
}
/deep/ .login-box .el-button{
  border-radius: 0px;
  width: 100%;
}
/deep/ .login-box .el-button--primary {
    color: #FFF;
    background-color: rgb(46, 78, 114);
    border-color: rgb(46, 78, 114);
}
</style>