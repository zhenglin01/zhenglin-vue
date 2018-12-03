<template>
  <div >
    <el-row style="height: 100%; ">
      <el-header class="el-header">后台管理系统</el-header>
      <el-col :span="4" class="el-col">
        <el-menu router :default-active="$route.path">
          <el-menu-item index="manager"><i class="el-icon-star-on"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-d-caret"></i>用户管理</template>
            <el-menu-item index="user">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-d-caret"></i>组织管理</template>
            <el-menu-item index="org">查询组织</el-menu-item>
            <el-menu-item index="tree">组织管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {

}
</script>
<style>

  .el-header{
    font-size: 20px;
    text-align: center;
  }
</style>
