<template>
  <el-container>
    <el-main>
        <div v-for="(item,index) in usersdata" :key="item.feedbackId" class="feedback">
            <div class="userHead">
                <img v-if="item.userinfo" :src="item.userinfo.avatarUrl" class="avatar">
                <span v-if="item.userinfo">userId:{{item.userinfo.userId}}</span>
                <span v-if="item.userinfo">{{item.userinfo.userName}}</span>
                <i v-if="item.schedule==0" v-on:click="toggleSchedule(item.feedbackId,index)" class="el-icon-warning-outline"></i>
                <i v-if="item.schedule==2" class="el-icon-circle-check"></i>
            </div>
            <el-divider></el-divider>
            <div class="content">
                <span class="font">电话号码：{{item.phoneNumber}}</span>
                <span class="font">车牌号：{{item.licensePlate}}</span>
                <span class="font">反馈内容：{{item.content}}</span>
                <span class="font">反馈图片：</span>
                <span class="pictures">
                    <div v-for="i in item.pictures" :key="i">
                        <img :src="i" class="picture">
                    </div>
                </span>
                <span class="date">{{item.createTime}}</span>
            </div>
        </div>
    </el-main>
  </el-container>
</template>

<script>
import axios from 'axios';
export default {
  name: 'feedback',
  methods:{
    initData(){
      axios.get('feedback/findAll').then(res=>{
        this.usersdata=res.data.data;
        for(let i=0;i<res.data.data.length;i++){
            axios.get('user/getInfo',{
                params:{
                    userId:res.data.data[i].userId
                }
            }).then(res1=>{
                this.usersdata[i]["userinfo"]=res1.data.data;
            });
        }
        console.log(this.usersdata);
      });
    },
    toggleSchedule(feedback,index){
        console.log(feedback)
        this.$confirm('确认已完成反馈处理？','提示',{
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(()=>{
            let data={
                feedbackId:feedback,
                schedule:2
            }
            axios.post('feedback/update',JSON.stringify(data)).then(res=>{
                console.log(res);
                if(res.data.code==0){
                    this.usersdata[index].schedule=2;
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '请求失败'
                    });
                }
            })            
        }).catch(()=>{
            this.$message({
                type: 'info',
                message: '取消'
            });
        })

    }
  },
  created(){
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
    .el-main{
        margin: 0;
        margin-left: 300px;
        margin-top: 100px;
    }
    .el-icon-warning-outline{
        font-size: 30px;
        color: #e1701a;
    }
    .el-icon-circle-check{
        font-size: 30px;
        color: yellowgreen;
    }
    .userHead{
        display: flex;
        flex-direction: row;
        font-size: 13px Small;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        color: gray;
        height: 40px;
    }
    .font{
        margin-bottom: 10px;
        word-break: break-all;
    }
    .date{
        align-self: flex-end;
        font-size: 14px;
        color: gray;
    }
    .feedback{
        padding: 20px;
        margin: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .avatar{
        height: 60px;
        width: 60px;
        border-radius: 50%;
    }
    .content{
        display: flex;
        flex-direction: column;
        color: black;
        font-size: 16px;
        align-items: flex-start;
    }
    .pictures{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
    .picture{
        max-width: 600px;
        max-height: 400px;
    }
</style>
