<template>
  <div id="app">
    <el-container v-if="isLogin">
      <el-aside width="auto" class="container-left">
        <div class="logo" style="text-align: center" @click="$router.replace('/')">
                    <span class="logo-title" :hidden="isCollapse"><span class="bold">W</span>ee <span
                        class="bold">W</span>ebsite <span class="bold">A</span>dmin</span>
          <span class="logo-title bold" :hidden="!isCollapse">WWA</span>
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
              <el-menu-item index="1-3" @click="$router.replace('/blog/tag')">标签</el-menu-item>
              <el-menu-item index="1-4" @click="$router.replace('/blog/image')">图片</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="64px" style="text-align: left">
          <div class="header-content">
            <div class="header-menu" @click="switchMenu"><img src="../src/assets/menu.svg" class="header-menu-img"/>
            </div>
            <div class="header-title">{{this.$route.name}}</div>
          </div>
        </el-header>
        <el-main>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>

    <div v-if="!isLogin">
        <el-card class="login-card">
          <span class="logo-title" :hidden="isCollapse"><span class="bold">W</span>ee <span
              class="bold">W</span>ebsite <span class="bold">A</span>dmin</span>
          <el-form>
            <el-form-item label="用户名">
              <el-input type="text" v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input type="password" v-model="form.password" />
            </el-form-item>
            <el-button @click="toLogin">登录</el-button>
          </el-form>
        </el-card>

    </div>
  </div>


</template>

<script>
  import UserSystemAPI from "@/network/user_system_api";
  export default {
    name: 'App',
    components: {},
    data() {
      return {
        isCollapse: false,
        isLogin: false,
        form: {
          username: null,
          password: null,
        }
      }
    },
    methods: {
      switchMenu() {
        this.isCollapse = !this.isCollapse;
      },
      toLogin() {
        UserSystemAPI.login(this.form.username, this.form.password).then(res => {
          if (res.result) {
            localStorage.setItem("token", res.data);
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.isLogin = true;
            this.$router.push('/home');
          } else {
            this.$message({
              message: res.message,
              type: "success"
            });
          }
        });
      }
    },
    computed: {
      navigationTitle() {
        return '';

      }
    },
    mounted() {
      let token = localStorage.getItem("token");
      if (token) {
        UserSystemAPI.valid().then(res => {
          if (res.result) {
            localStorage.setItem("token", res.data);
            this.isLogin = true;
            this.$router.push('/home');
          } else {
            localStorage.clear();
          }
        })
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
    line-height: 64px;
    border-bottom: 1px solid #f3f3f3;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    border: none;
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
    /*background-color: #B3C0D1;*/
    color: #333;
    line-height: 60px;
    border-bottom: 1px solid #f3f3f3;
  }

  .el-menu {
    border-right: none;
  }


  .header-content {
    display: flex;
  }

  .logo-title {
    font-family: "Gurmukhi MN", serif;
    /*font-weight: bold;*/
    font-size: 16px;
    cursor: pointer;
  }

  .container-left {
    border-right: 1px solid #f3f3f3;
  }

  .header-menu {
    margin-top: 14px;
    height: 36px;
    width: 50px;
    text-align: center;
    background-color: white;
    border-radius: 3px;
    border: 1px solid #f3f3f3;
    cursor: pointer;
  }

  .header-menu-img {
    width: 20px;
    height: 36px;
  }


  .bold {
    font-weight: bold;
  }

  .header-title {
    width: 100%;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  .login-card {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 400px;
    transform: translate(-200px, -200px);

  }
</style>
