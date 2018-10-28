<template>
    <div>
        <div class="breadcrumb">
            <!-- 这是一段我一只没有逾越过得鸿沟 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/layout/index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:'/login'}">退出登录</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/layout/user' }">用户管理</el-breadcrumb-item>
            </el-breadcrumb>    
        </div>
        <h1> i  wish  i konw how to quit you</h1>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>