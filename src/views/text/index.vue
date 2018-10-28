<template>
    <div>
        <!-- <h1>上传图片的测试页</h1>
        <h1>传统的表单上传</h1>
        <div>
            <form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">
                <input type="file" name="file">
                <br>
                <input type="text" v-model="token" name="token">
                <br>
                <button>提交</button>
            </form>
        </div> -->

        <h2>上传图片的测试页</h2>
        <!-- <h1>ajax上传图片</h1>
        <div>
            <input type="file" @click="handleloding">
            <img :src="imgData">
        </div> -->
      <updataCom @success="uploadImg"></updataCom>
      <div><img :src="imgData" style="border:1px solid #000"></div>
    </div>
</template>

<script>
import updataCom from '../../components/updata-com.vue'
import axios from "axios";
export default {
  components:{
    updataCom
  },
  data() {
    return {
      token: "",
      imgData: ""
    };
  },
  methods: {
    getToken() {
      axios.get("http://upload.yaojunrong.com/getToken").then(res => {
        // console.log(res);
        this.token = res.data.data;
      });
    },
    handleloding(event) {
      // console.log(event)
      let file = event.target.files[0];

      let formData = new FormData();
      formData.append("file", file);
      formData.append("token", this.token);

        
        axios.post("https://upload-z1.qiniup.com", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
            // 'Content-Type':'application/x-www-form-urlencoded' , //发get请求默认是这个
            // 'Content-Type':'application/json',  //发送post请求且带参数默认是这个
          }
        })
        .then(res => {
            console.log(res)
          this.imgData = res.data.url;
        });
    },
    uploadImg(url){
      this.imgData = url
    }
  },
  created() {
    this.getToken();
  }
};
</script>

<style scoped>
</style>