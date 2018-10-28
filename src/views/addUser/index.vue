<template>
    <div class="warp">
        <h2>添加管理员</h2>
        <div class="form-wrap" :model="formData">
            <el-form size="small" 
            label-width="120px"
            label-position="left"
            >
                <el-form-item label="用户名">
                    <el-input v-model="formData.username"></el-input>
                </el-form-item>
                 <el-form-item label="密码">
                    <el-input v-model="formData.password"></el-input>
                </el-form-item>
                 <el-form-item label="请再次确认密码">
                    <el-input v-model="formData.checkpassword" ></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="formData.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="用户头像">
                   <updataImg v-model="formData.avatar"></updataImg>
                </el-form-item>
                <el-form-item label="个性签名">
                     <el-input type="textarea" v-model="formData.desc"></el-input>
                </el-form-item>
               <el-form-item>
                    <el-button type="primary" @click="submitData" :loading=loading>
                        添加
                    </el-button>
               </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import updataImg from "../../components/updata-com.vue";
export default {
  components: {
    updataImg
  },
  data() {
    return {
      formData: {
        username: "",
        password: "",
        checkpassword: "",
        nickname: "",
        email: "",
        desc: "",
        avatar: ""
      },
      loading: false
    };
  },
  methods: {
    submitData() {
      this.loading = true;
      if (this.formData.password != this.formData.checkpassword) {
        this.$message.error("两次密码输入不一样");
      } else {
        this.$axios.post("/user", this.formData).then(res => {
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "恭喜您！添加成功"
            });
            setTimeout(() => {
              this.$router.push("/layout/user");
            }, 1000);
          }
        });
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.warp {
  padding-top: 20px;
}
.form-wrap {
  width: 600px;
  margin-top: 20px;
}
</style>