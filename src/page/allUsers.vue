<template>
  <el-container>
    <el-main>
      <el-table :data="usersdata">
        <el-table-column prop="userId" label="id">
        </el-table-column>
        <el-table-column prop="avatarUrl" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="昵称">
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'allUsers',
  methods:{
    initData(){
      axios.get('api/user/findAll').then(res=>{
        this.usersdata=res.data.data;
      })
    }
  },
  mounted(){
    this.initData();
  },
  data(){
    return{
      usersdata:[]
    }    
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.el-table{
  margin-top: 60px;
  z-index: -1;
  margin-left: 300px;
  width: auto;
  height: 90%;
  overflow: hidden;
}
.avatar{
  border-radius: 50%;
  overflow: hidden;
  width: 50px;
  height: 50px;
}
</style>
