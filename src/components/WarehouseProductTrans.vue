<template>
  <el-main class="main">


    <el-row class="content_header">

      <el-col :span="4">
        <h2>Product Transfer</h2>
      </el-col>

      <el-col :span="3" :offset="16">
        <el-button @click="dialogFormVisible = true">Create</el-button>
      </el-col>
    </el-row>

    <el-row style="line-height: 50px">

      <el-col :span="6" :offset="16">
    <el-radio-group v-model="order_type" @change="onChange($event)">
      <el-radio :label="1" >Processing</el-radio>
      <el-radio :label="2">Finished</el-radio>
      <el-radio :label="3">All</el-radio>
    </el-radio-group>
      </el-col>
    </el-row>
    <el-dialog title="Create a new product" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="Product Name" >
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Price" >
          <el-input v-model="form.price" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>



    <el-row class="table">
      <el-table stripe :data="tableData">
        <el-table-column prop="name" label="Product" align="center" ></el-table-column>
        <el-table-column prop="num" label="Number" align="center"></el-table-column>
        <el-table-column prop="type" label="Fetch/Put" align="center"></el-table-column>
        <el-table-column prop="state" label="State" align="center"></el-table-column>
        <el-table-column prop="time" label="Time" align="center"></el-table-column>


        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleFinish(scope.$index, scope.row)" v-if="order_type === 1">Finish</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
  </el-main>

</template>

<script>

  function convertType(i) {
    if (i === 0){
      return 'Fetch';
    } else if(i === 1){
      return 'Put';
    } else if (i === 'Fetch'){
      return 0;
    } else if(i === 'Put'){
      return 1;
    }
  }

  function convertState(i) {
    if (i === 0){
      return 'Processing';
    } else if(i === 1){
      return 'Finished';
    } else if (i === 'Processing'){
      return 0;
    } else if(i === 'Finished'){
      return 1;
    }
  }

  import ElRow from "_element-ui@2.0.11@element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    name: "warehouse",
    created: function () {
      this.$http.get("warehouse/product/transfers").then(response=> {
        console.log(response)
        for (let i of response.body.content) {
          console.log(i)
          i.type = convertType(i.type);
          i.state = convertState(i.state);
          console.log(i.time);
          i.time = new Date(i.time).toUTCString();
          console.log(i.time);
          this.responseData.push(i);
        }


        this.tableData = this.responseData.filter(i => {
          return i.state === 'Processing';
        });
        this.tableData.sort((a, b) => {
          return - (new Date(a.time) - new Date(b.time));

        });
      })
    },
    data() {
      return {
        tableData: [],
        responseData:[],
        dialogFormVisible : false,

        form:{
          name:'',
          price:'',
        },

        order_type:1,


      }

    },

    methods: {
      handleEdit(index, row){
        console.log(index,row);
      },
      handleDelete(index, row){
        this.tableData.splice(index,1);
        //TODO
      },
      handleFinish(index, row){
        console.log(row);

        this.$confirm("Confirm the request?", "Important", {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning',
            callback: ()=>{
              console.log(row);

              row.state = "Finished";
              this.tableData.splice(index, 1);
              this.$http.put(`warehouse/product/transfer/${row.id}?state=1`, (response)=>{
                this.$message({
                  type: 'success',
                  message: 'Success'
                });

          })}})
      },
      handleCreate(){
        //TODO
        console.log(this.tableData[10]);
        console.log("Create"+this.form.name+this.form.price);
      },
      onChange(event) {
        if (event === 1) {
          this.tableData = this.responseData.filter(i => {
            return i.state === 'Processing';
          })
        } else if (event === 2) {
          this.tableData = this.responseData.filter(i => {
            return i.state === 'Finished';
          })
        } else {
          this.tableData = this.responseData;
        }
      }
      }
    }

</script>

<style scoped>

  .table{
    line-height: 50px;
  }
  .el-table-column{
    line-height: 40px;
    height: 40px;
  }
  .content_header{
    line-height: 50px;
  }


</style>
