<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

  import router from './router/index';
  import Vue from 'vue';
  import Vuex from 'vuex';


  // router.beforeEach((to, from, next)=>{
  //   console.log(to.path);
  //   console.log(to.name);
  //
  //   if(to.path != '/login'){
  //     if(auth()){
  //       next();
  //     } else {
  //       next({
  //         path: '/login',
  //       })
  //     }
  //   } else{
  //     next();
  //
  //   }
  //
  // });
export default {
  name: 'app',
}
</script>



<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
