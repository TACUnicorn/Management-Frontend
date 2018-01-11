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
          </el-row>
        </el-menu>
      </el-row>
    </el-header>

    <el-main style=" height: 100vh">


      <el-row style="height: 100%" type="flex" align="middle">
        <el-col :span="12" :offset="6" style="height: 50%">
      <el-card class="box-card" style="height: 100%">
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item label="Username"  style="margin: 20px 40px 40px 20px; ">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="Password"  style="margin: 40px 40px 0px 20px">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-button @click="onSubmit()">Log in</el-button>
<br/>
          <el-button @click="dialogFormVisible = true" type="text">Create a new account?</el-button>


        </el-form>
      </el-card>
        </el-col>
      </el-row>


      <el-dialog title="New Account" :visible.sync="dialogFormVisible">
        <el-form :model="create_form">
          <el-form-item label="Username">
            <el-input v-model="create_form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="Password">
            <el-input v-model="create_form.password" type="password" auto-complete="off"></el-input>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="create_account">Confirm</el-button>
        </div>
      </el-dialog>

    </el-main>
  </el-container>
</template>

<script>

    export default {
        name: "login",

        created(){
          console.log(this.$store.state.username);
        },

        data(){
          return{
            form : {
              username:'',
              password:'',
            },

            create_form:{
               username:'',
               password:''
            },

            dialogFormVisible : false
          }

        },

        methods:{
          onSubmit(){

            console.log(this.form.username);

            this.$http.post(`auth-server/oauth/token?grant_type=password&username=${this.form.username}&password=${this.form.password}&client_id=android&client_secret=android`)
              .then(response =>{
                console.log(response);
                localStorage.access_token = response.body.access_token;
                this.$store.commit("setUsername",this.form.username);
                this.$router.push({path:'/warehouse/productinfo'})
              })
          },

          create_account(){
              this.$http.post("auth-server/users", this.create_form)
                .then((response)=>{
                  this.dialogFormVisible = false;
                  this.$store.commit("setUsername",response.body.username);
                })
          }
        }
    }
</script>

<style scoped>

</style>
