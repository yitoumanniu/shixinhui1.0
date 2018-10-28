<template>
    <div class="warp">
        <h2>修改个人信息</h2>
        <div class="form-wrap" :model="formData">
            
            <el-form size="small" 
            label-width="80px"
            label-position="left"
            >
                <el-form-item label="用户名">
                    <el-input v-model="formData.username" :disabled="true"></el-input>
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
                    <el-button type="primary" @click="handClick" :loading=loading>
                        提交
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
        nickname: "",
        email: "",
        desc: "",
        avatar: ""
      },
      loading: false //设置一个'加载中初值'
    };
  },

  methods: {
    // 初始化数组，把vuex里的数据放入formDa里。可以用v-model绑定
    initData() {
      this.formData = {
        ...this.$store.state.userinfo
      };
    },
    handClick() {
      this.loading = true;
      this.$axios.put("/user/userInfo", this.formData).then(res => {
        if (res.code == 200) {
          let userinfo = res.data;
          this.$store.commit("CHANGE_USERINFO", userinfo);
          this.initData();
          this.$message({
            message: "修改信息成功",
            type: "success"
          });
        }
        this.loading = false;
      });
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style scoped lang="scss">
.warp {
  padding-top: 30px;
}
.form-wrap {
  width: 800px;
  margin-top: 50px;
}
</style>