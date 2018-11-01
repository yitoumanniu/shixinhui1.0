<template>
    <div class="user-manage">
        <div class="breadcrumb">
            <!-- 这是一段我一只没有逾越过得鸿沟 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/login'}">退出登录</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/user' }">用户管理</el-breadcrumb-item>
            </el-breadcrumb>    
        </div>
         <el-table
                :data="tableData"
                border    
            >
                <el-table-column
                    prop="nickname"
                    label="姓名"
                    width="180"
                >
                </el-table-column>
                 <el-table-column
                    prop="createdTime"
                    label="日期"
                    width="180"
                >
                </el-table-column>
                 <el-table-column
                    prop="desc"
                    label="个性签名"
                    width="180"
                >
                </el-table-column>
                 <el-table-column
                    prop="avatar"
                    label="头像"
                    width="200"  
                >
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" class="avatar">
                </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    align='center'
                >
                   <template slot-scope="scope" >
                        <el-button @click="handleDetalis" size="small" type="primary" >
                            查看详情
                        </el-button>
                        <el-button @click="handleDelete(scope.row._id)" size="small" type="danger" >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
           <div class="packpage">
              <el-pagination
                background
                :total= "count"
                layout="prev, pager, next"
                @current-change='changePage'
                >
            </el-pagination>
           </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1
    };
  },
  methods: {
    getData() {
      this.$axios.get("/user", { pn: this.page, size: 10 }).then(res => {
        if (res.code == 200) {
          console.log(res.data);
          this.tableData = res.data;
          this.count = res.count;
        }
      });
    },

    handleDetalis() {
      this.$router.push("/layout/userDetails");
    },
    handleDelete(id) {
      this.$confirm("我不打算骗你，如果你删了，我会揍你", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios.post("/user/delete", { userIds: [id] }).then(res => {
            this.$message({
              type: "success",
              message: "我的大刀早已饥渴难耐"
            });
            this.getData()          //删除后重新刷新页面
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "乖，爸爸爱你💗"
          });
        });
    },
    changePage(page) {
      console.log(page);
      this.page = page;
      // this.count = count
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style>
.packpage{
  position: relative;
  top: 50px;
  left: 50px;
}
</style>



<style scoped lang="scss">
.breadcrumb {
  margin-top: 10px;
  margin-bottom: 50px;
}
.avatar {
  width: 150px;
  height: 100px;
}

</style>