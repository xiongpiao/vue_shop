<template>
  <div class="a-container">
    <div class="a-head">
        <div class="head-title">
            发布商品
        </div>
    </div>
    <div class="a-content">
        <div class="item-info">
            <el-input
                type="text"
                placeholder="商品标题"
                v-model="addInfo.title"
                maxlength="50"
                show-word-limit
            >
            </el-input>
            <div style="margin: 30px 0;"></div>
            <el-input
                type="textarea"
                placeholder="商品描述"
                v-model="addInfo.description"
                maxlength="500"
                rows="6
                "
                show-word-limit
            >
            </el-input>
        </div>
        <div class="item-pic">
            <el-upload
                ref="uploadRef"
                action=""
                :http-request="postPic"
                :auto-upload="true"
                list-type="picture-card"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                    >
                    <span class="el-upload-list__item-actions">
                        <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                        >
                        <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                        >
                        <i class="el-icon-download"></i>
                        </span>
                        <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                        >
                        <i class="el-icon-delete"></i>
                        </span>
                    </span>
                    </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <div class="item-more">
            <div class="item-classify" >
                <el-select v-model="addInfo.type" placeholder="分类" >
                    <el-option
                    v-for="item in coptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="block">
            <el-cascader
              v-model="areaInfo"
                placeholder="地区学校"
                :options="poptions"
                filterable
                @change="areaHandleChange"
                ></el-cascader>
            </div>
        </div>
        <div class="item-price">
            <span style="color:#656565;margin-right: 10px;">价格￥</span>
            <el-input-number v-model="addInfo.price"  :min="0" label="价格"></el-input-number>
        </div>
        <div class="item-add">
            <button class="add-btn" @click="addGood">
                发布
            </button>
        </div>
    </div>
  </div>
</template>

<script>
import { reqAdd } from '@/api';
import axios from 'axios'
export default {
    data() {
    return {
        text: '',
        textarea: '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        fileList: [{
        name: '',
        fileName:''
      }],
        coptions: [{
          value: '图书音像',
          label: '图书音像'
        }, {
          value: '服饰鞋帽',
          label: '服饰鞋帽'
        }, {
          value: '包表首饰',
          label: '包表首饰'
        }, {
          value: '数码',
          label: '数码'
        }, {
          value: '家居生活',
          label: '家居生活'
        },{
          value: '运动户外',
          label: '运动户外'
        }],
        poptions: [{
          value: '重庆',
          label: '重庆',
          children: [{
            value: '重庆市',
            label: '重庆市',
            children: [{
              value: '重庆理工大学',
              label: '重庆理工大学'
            }, {
              value: '重庆交通大学',
              label: '重庆交通大学'
            }, {
              value: '重庆工商大学',
              label: '重庆工商大学'
            }]
          }]
        }],
      num: 0,
      areaInfo: [],
      formdata: new FormData(),
      addInfo: [{
          price: '',//价格
          title: '',//标题
          description: '',//描述
          type: '',//类型
          area: '',//地区
          school:''//学校
      }]
    }
    },
  methods: {
    postPic(e) { 
      this.formdata.append('multipartFile', e.file)
    },
      async addGood() {
        let res = await this.postAddInfo();
        let msg = res.data.msg
        if (res.data.code == '200') {
          this.$message({
            message: '商品上架成功',
            type: 'success'
          });
          this.addInfo.title = '';
          this.addInfo.description = '';
          this.addInfo.type = '';
          this.areaInfo = '';
          this.addInfo.price = '';
          this.$refs.uploadRef.clearFiles();
          this.$router.push("/home").catch(() =>{});
        }
        else {
          this.$message.error(msg);
        }
        console.log(res);
      },
      handleRemove(file) {
        // console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
      addHandleChange(file) {
        this.addInfo.multipartFile = file
      },
      areaHandleChange() {
        // console.log(111);
        // console.log(this.areaInfo[0])
        this.addInfo.area = this.areaInfo[0] + this.areaInfo[1];
        this.addInfo.school = this.areaInfo[2];
        // console.log(this.addInfo.area);
        // console.log(this.addInfo.school);
      },
      //
    async postAddInfo() {
      this.formdata.append('price',this.addInfo.price) 
      this.formdata.append('title',this.addInfo.title) 
      this.formdata.append('description',this.addInfo.description) 
      this.formdata.append('type',this.addInfo.type) 
      this.formdata.append('area',this.addInfo.area) 
      this.formdata.append('school',this.addInfo.school) 

        let res = await reqAdd(this.formdata);
        // console.log(res.data);
        return res;
    }
    }
}
</script>

<style lang="less" scoped>
.a-container{
    width: 100%;
}
.a-head{
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
.a-content{
    padding:20px 300px 0 300px;
}
// .item-info{
//     // width: 600px;
// }
.item-pic{
    margin: 30px 0;
}
.item-more{
    display: flex;
}
.item-classify{
    margin-right: 20px;
}
.item-price{
    margin: 30px 0;
}
.item-add{
    text-align: right;
}
.add-btn{
    background-color: skyblue;
    width: 100px;
    height: 50px;
    color:#fff;
    border: skyblue;
  }
</style>