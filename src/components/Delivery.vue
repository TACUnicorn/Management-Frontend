<template>
  <el-main class="main">


    <el-row class="content_header">

      <el-col :span="4">
        <h2>Delivery Order</h2>
      </el-col>

      <el-col :span="3" :offset="16">
        <el-button @click="dialogFormVisible = true">Create</el-button>
      </el-col>
    </el-row>


    <el-dialog title="Create a new Order" :visible.sync="dialogFormVisible">
      <el-form :model="form">

        <el-form-item label="Product ID" >
          <el-input v-model="form.materialId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Product Name" >
          <el-input v-model="form.materialName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="Number" >
          <el-input v-model="form.materialNo" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="OEM" >
          <el-input v-model="form.oem" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCreate()">确 定</el-button>
      </div>
    </el-dialog>








    <el-row class="table">
      <el-table stripe :data="tableData">
        <el-table-column prop="toUser" label="Customer" align="center" >
        </el-table-column>
        <el-table-column prop="toUserPhone" label="Phone" align="center"></el-table-column>
        <el-table-column prop="destination" label="Destination" align="center"></el-table-column>
        <el-table-column prop="time" label="Time" align="center"></el-table-column>


        <el-table-column label="操作" align="center">
          <template slot-scope="scope">

            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row) ">Delete</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-row>
  </el-main>

</template>

<script>
  import ElRow from "_element-ui@2.0.11@element-ui/packages/row/src/row";


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



  export default {
    components: {ElRow},
    name: "warehouse",
    created: function () {


      this.$http.get("http://10.0.1.2:8001/express/deliveries")
        .then(response=>{
          console.log("----------: + " +response.body.content);

          for(let i of response.body.content){
            console.log(i);
            i.time = new Date(i.time).toUTCString();
            this.tableData.push(i);
          }
        });

      this.tableData.sort((a, b) => {
        return - (new Date(a.time) - new Date(b.time));

      });







    },
    data() {
      return {
        tableData: [],

        factory_orders :[],
        product_info:[],


        dialogFormVisible : false,

        form:{
          materialId:'',
          materialName:'',
          materialNo:'',
          oem:''
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
      handleCreate(){
        //TODO
        console.log(this.tableData[10]);
        console.log("Create"+this.form.name+this.form.price);


        this.$http.post('http://10.0.1.2:8000/oem/order', this.form).then((response)=>{

          console.log(response);

        })
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

            let update_data = {
              id:row.id,
              p_id:row.p_id,
              num:row.num,
              state: convertState(row.state),
              time:  new Date(row.time)
            };


            this.$http.put(`factory/order`, update_data).then(response=>{
              this.$message({
                type: 'success',
                message: 'Success'
              })
            });

          }})}}


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
