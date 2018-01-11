<template>
  <el-container style="top:0;bottom:0;">
    <el-header>

      <el-row>
      <el-menu  class="el-menu-demo" mode="horizontal" >
        <el-row type="flex" align="middle">
        <el-col :span="4" style="font-size: 30px;">Unicorn</el-col>
        <!--<el-submenu index="2">-->
          <!--<template slot="title">我的工作台</template>-->
          <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
          <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
          <!--<el-menu-item index="2-3">选项3</el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        <el-col :span="4" :offset="20" > <el-button class="user_avtor" size="mini"  @click="logout()">{{this.$store.state.username}}</el-button></el-col>
        </el-row>
      </el-menu>


      </el-row>

    </el-header>
    <el-container class="main_body">
      <el-aside class="left_side">
        <el-row>
          <el-menu
            class="el-menu-vertical-demo"
            :router="true">
            <el-submenu index="1">
              <template slot="title">
                <span>Warehouse</span>
              </template>

              <el-menu-item :route="{path: '/warehouse/productinfo'}" index="1-1">
                <span slot="title">Product</span>
              </el-menu-item>
              <el-menu-item :route="{path: '/warehouse/producttrans'}" index="1-2">
                <span slot="title">Product Transfer</span>
              </el-menu-item>

            </el-submenu>

              <el-menu-item :route="{path: '/factory'}" index="2-1">
                <span slot="title">Factory</span>
              </el-menu-item>
            <el-menu-item :route="{path: '/finance'}" index="3-1">
              <span slot="title">Finance</span>
            </el-menu-item>

            <el-menu-item :route="{path: '/OEM'}" index="4-1">
              <span slot="title">OEM</span>
            </el-menu-item>
            <el-menu-item :route="{path: '/Delivery'}" index="5-1">
              <span slot="title">Delivery</span>
            </el-menu-item>


          </el-menu>

        </el-row>

      </el-aside>


<router-view></router-view>



    </el-container>

  </el-container>
</template>

<script>
  import ElRow from "_element-ui@2.0.11@element-ui/packages/row/src/row";

  export default {
      components: {ElRow},
      name: "index",
        data(){
          return {
            username: 'lisirrx'
          }
      },
    methods:{
        logout(){
          localStorage.removeItem('access_token')
          this.$router.push('/login');
        }
    }

    }
</script>

<style scoped>

  .content_header{
    line-height: 50px;
  }
  .content{
    border-radius: 4px;
    min-height: 36px;
    background-color: aliceblue;
  }

  .user_avtor{
    /*float: right;*/
    /*margin-top: 5px;*/
  }

  .el-menu{
    border-right: 0;
  }

  .el-header{
    padding: 0;
  }
  .left_side{
    bottom: 0;
    height: 100vh;
    background-color: white;
    z-index: 10;
    border-right:  solid 1px #e6e6e6;
  }



  .main{
    background-color: white;
  }





</style>
