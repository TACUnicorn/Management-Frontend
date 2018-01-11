<template>
  <el-main class="main">


    <el-row class="content_header">

      <el-col :span="4">
        <h2>Finance Information</h2>
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
        <el-form-item label="Description" >
          <el-input type="textarea" v-model="form.description" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>





    <el-row class="table">
      <el-table stripe :data="tableData">
        <el-table-column prop="fromAccount" label="From" align="center"></el-table-column>
        <el-table-column prop="toAccount" label="To" align="center"></el-table-column>
        <el-table-column prop="sum" label="Amount" align="center"></el-table-column>


        <el-table-column label="操作" align="center">
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
  </el-main>

</template>

<script>
  import ElRow from "_element-ui@2.0.11@element-ui/packages/row/src/row";

  export default {
    components: {ElRow},
    name: "warehouse",
    created: function () {

      this.$http.get('finance/bill?start=2017-01-01 00:00:00&end=2020-01-01 00:00:00').then(response=>{
        console.log(response);

        for (let i of response.body.content){
          this.tableData.push(i);
        }

        console.log(this.tableData);
      })


    },
    data() {
      return {
        tableData: [],

        dialogFormVisible : false,

        form:{
          fromAccount:'',
          toAccount:'',
          sum:'',
        },


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
      handleCreate(){
        //TODO



        this.$http.post("warehouse/product", this.form)
          .then(response =>{

            this.tableData.unshift(this.form)

          });

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
