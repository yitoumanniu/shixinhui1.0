<template>
    <div class="contain">
        <h1 class="title">欢迎来到狮心会成员管理系统</h1>
            <!-- <h1 id="h1" ref="title">我非你杯茶</h1> -->

        <div class="login-box">
            <h2 class="login-box-title">请登录</h2>
            <el-form class="form" ref="form" :rules="rule">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请登录"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="formData.password" placeholder="请输入密码" @keyup.enter.native="handleLogin"></el-input>
                </el-form-item>
            </el-form> 
            <el-button class="btn"  type="primary" @click="handleLogin" :loading=loading>
                提交
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
  data() {

      const validateUsername = (rule, value, callback)=>{
          if(value){
              callback(new Error('请输入正确的用户名'))
          }else{
              callback()
          }
      }

    //   const validatePassword = (rule, value, callback)=>{
    //       if( value && value.length >=5){
    //           callback()
    //       }else{
    //           callback(new Error('请重新输入密码'))
    //       }
    //   }


    return {
      formData: {
        username: "",
        password: ""
      },
      loading: false,

      rule:{
          username:[
              { validator :validateUsername , trigger:'blur'}
          ],
          
      }

      


    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$axios
        .post("/login", this.formData)
        .then(res => {
          //   console.log(res)
          if (res.code == 200) {

            this.$store.commit('CHANGE_USERINFO' ,res.data)
            this.$message({
              message: "恭喜你，登录成功",
              type: "success"
            });
            setTimeout(() => {
              this.$router.push("./layout");
            }, 1000);
          } else {
            this.$message(res.msg);
          }
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },
    
  },
//   created(){    //vue实例准备好的时候，new Vue() 
//                 //此时组件离得xhml还没有被渲染，上面的html会被打包成js
//       let h1 = this.$refs.title
//       console.log(document.getElementById('h1'))
//       console.log(h1)
//   },
//   mounted(){    //只有在mounted的这个函数里面才会把html组件渲染到html里
//       let h1 = this.$refs.title
//       console.log(h1)
//   }
  
};
</script>

<style scoped lang="scss">
.contain {
  min-height: 100vh;
  background-color: #545c64;
  overflow: hidden;
}
.title {
  margin-top: 150px;
  text-align: center;
  color: #fff;
  font-weight: 400;
}
.login-box {
  width: 400px;
  height: 300px;
  border: 1px solid #f1f1f1;
  border-radius: 6px;
  padding: 40px;
  margin: 20px auto 0;
  background: #fff;
  .login-box-title {
    text-align: center;
    color: #333;
    font-stretch: 400;
  }
  .form {
    margin-top: 20px;
  }
  .btn {
    width: 100%;
    box-sizing: border-box;
  }
}
</style>