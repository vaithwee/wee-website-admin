<template>
  <div id="app">
    <el-container >
      <el-aside width="auto">
        <div class="logo" style="text-align: center" @click="$router.replace('/')">

        </div>
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse">
          <el-submenu index="0">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">博客</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="$router.replace('/blog/article')">文章</el-menu-item>
              <el-menu-item index="1-2" @click="$router.replace('/blog/category')">分类</el-menu-item>
              <el-menu-item index="1-3">标签</el-menu-item>
              <el-menu-item index="1-4">选项3</el-menu-item>
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
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="64px" style="text-align: right">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
          <el-button @click="switchMenu"></el-button>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    };
    return {
      isCollapse: false,
      tableData: Array(50).fill(item)
    }
  },
  methods: {
    switchMenu() {
      this.isCollapse = !this.isCollapse;
    }
  }
}
</script>

<style>
  body {
    margin: 0;
  }

  .logo {
    height: 64px;
    background-color: #fea00f;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }

  .el-container {
    height: 100vh;
    margin: 0;
    padding: 0;
  }

  .el-aside {
    min-height: 100vh;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
