<template>
    <div class="layout">
        <div class="header ml">
            <h1 class="title" >
                狮  心    会 
            </h1>
        </div>
        <div class="side-bar">
            <el-menu
      background-color="#2c3949"
      text-color="#fff"
      :router="true"
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="/layout/index">首页</el-menu-item>
          <el-menu-item index="/layout/userEdit">修改个人信息</el-menu-item>
          <el-menu-item index="/layout/addUser">添加管理员</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
          <el-menu-item index="/layout/user">用户界面</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="/layout/text">图片上传</el-menu-item>
        </el-menu-item-group>
       
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
        </div>
        <div class="content ml">
            <router-view></router-view>
        </div>
    </div>
    
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
.layout {
  .header {
    // border: 1px solid #f1f1f1;
    background: #2c3949;
    .title {
      text-align: center;
      font-weight: 700;
      line-height: 60px;
      height: 60px;
      color: #fff;
      font-size: 20px;
    }
  }

  .ml {
    margin-left: 200px;
  }
  .side-bar{
      position: fixed;
      top: 0px;
      bottom: 0px;
      left: 0px;
      width: 200px;
      // border-right: 1px solid #f1f1f1;
      overflow: hidden;
      background: #2c3949;
      padding-top: 60px;  

      /deep/{
       .el-menu{
         border-right:  none;
       } 
      }
  }
  .content{
    padding-left: 10px;
  }
}
</style>