<template>
  <div class="regist-container">
    <div class="regist-box">
      <div class="r-head">立即注册</div>
      <el-form
        ref="registFormRef"
        :model="registForm"
        :rules="registFormRules"
        class="regist-form"
        label-width="80px"
      >
        <el-form-item prop="username" label="用户名">
          <el-input
            v-model="registForm.username"
            prefix-icon="el-icon-user"
            placeholder="请设置用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input
            v-model="registForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请设置登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码">
          <el-input
            v-model="registForm.checkPassword"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请确认登录密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="regist">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <span>{{registmsg}}</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { reqRegist } from '../api/index'
export default {
  data() {
    const comfirmPassword = (rule, value, callback) => {
      if (value !== this.registForm.password) {
        return callback(new Error("两次输入密码不一致"));
      }
      callback();
    };
    return {
      //表单数据绑定对象
      registForm: {
        username: "",
        password: "",
        checkPassword: "",
      },
      //表单验证规则对象
      registFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
        checkPassword: [
          { required: true, trigger: "blur", message: "请再一次输入密码" },
          { validator: comfirmPassword, trigger: "blur" },
        ],
        number: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
      },
      dialogVisible: false,
      registmsg:''
    };
  },
  methods: {
    resetRegistForm() {
      this.$refs.registFormRef.resetFields();
    },
    async regist() {
      // this.$router.push("/login");
      let res = await this.postUser();
      if (res.data.code == '500') {
        this.registmsg = res.data.msg;
        this.dialogVisible = true;
        this.resetRegistForm()
      }
      else if (res.data.code == '200') {
         this.$router.push("/login");
      }
    },
    async postUser() {
      const res = await reqRegist({ username: this.registForm.username, password: this.registForm.password });
      return res;
    }
  },
};
</script>

<style lang="less" scoped>
.regist-container {
  // background-color: #2b4b6b;
  height: 100%;
}
.regist-box {
  width: 500px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.regist-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.r-head{
  font-family: ChronicleDisplayLight,Times New Roman,Serif,MSungPRC;
  font-weight: 500;
  font-size: 25px;
  padding-top: 20px;
  padding-left: 20px;
}
.btns{
  width: 100%;
}
/deep/ .regist-box .el-button{
  border-radius: 0px;
  width: 100%;
}
/deep/.regist-box .el-button--primary {
    color: #FFF;
    background-color: rgb(46, 78, 114);
    border-color: rgb(46, 78, 114);
}
</style>