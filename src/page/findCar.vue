<template>
  <div class="main">
    <el-main>
      <el-input placeholder="输入车牌号" v-model="carnum">
        <el-button slot="append" icon="el-icon-search" @click="findCarnum"></el-button>
      </el-input>
    </el-main> 
    <div class="info">
      <el-card v-if="carInfo!=undefined&&carInfo.licensePlate!=undefined" class="box-card">
        <div slot="header" class="clearfix">
          <span>{{carInfo.licensePlate}}</span>
          <el-button style="float: right; padding: 3px 0" type="text">删除车辆</el-button>
        </div>
          <div class="carInfo">
            <p>类型：{{carInfo.type==1?'电动车':'汽车'}}</p>
            <p>品牌：{{carInfo.brand}}</p>
            <p>颜色：{{carInfo.color}}</p>
            <div class="pictures">
              <el-image
              v-for="item in carInfo.pictures" :key="item.picture"
              style="width: 100px; height: 100px"
              :src=item.picture
              :preview-src-list=Array(item.picture)></el-image>            
            </div>
          </div>     
      </el-card>

      <el-card v-if="personInfo!=undefined&&personInfo.openId!=undefined" class="box-card">
        <div slot="header" class="clearfix">
          <div class="headinfo">
            <img :src="personInfo.avatarUrl" class="avatar">
            <span>{{personInfo.userName}}</span>            
          </div>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">删除车辆</el-button> -->
        </div>
          <div class="carInfo">
            <p>openId：{{personInfo.openId}}</p>
            <div class="licensePlates">
              <p>车辆车牌</p>
              <p v-for="i in licensePlates" :key="i" class="licensePlate">
                {{i}}
              </p>
            </div>
            <p>好友</p>
            <div class="pictures">
              <img
              v-for="item in relatives"
              :key="item.picture"
              :src=item
              class="avatar">
            </div>
          </div>     
      </el-card>
    </div> 
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'findCar',
  methods:{
    findCarnum(){
      this.carInfo={};
      this.licensePlates=[];
      this.relatives=[];
      this.personInfo={};
      this.relativesname={};
      axios.get('api/vehicle/search',{
        params:{
          licensePlate:this.carnum
        }
      }).then(res=>{
        console.log(res);
        if(res.data.code!=0){
          this.$message.error('没找到车牌！');
        }else{
          this.carInfo=res.data.data;
          axios.get('api/user/getInfo',{
            params:{
              userId:res.data.data.carOwnerId
            }
          }).then(res1=>{
            console.log(res1);
            if(res1.data.code==0){
              this.personInfo=res1.data.data;
              for(let i=0;i<res1.data.data.vehicles.length;i++){
                axios.get('api/vehicle/findById',{
                  params:{
                    vehicleId:res1.data.data.vehicles[i]
                  }
                }).then(res2=>{
                  console.log(res2);
                  this.licensePlates.push(res2.data.data.licensePlate);
                })
              }
              for(let i=0;i<res1.data.data.relatives.length;i++){
                axios.get('api/user/getInfo',{
                  params:{
                    userId:res1.data.data.relatives[i]
                  }
                }).then(res2=>{
                  console.log(res2);
                  this.relatives.push(res2.data.data.avatarUrl);
                  this.relativesname.push(res2.data.data.userName);
                })
              }
              this.$message({
                message:'成功',
                type:'success'
              });
            }
          })
        }
      })
    }
  },
  mounted(){
  },
  data(){
    return{
      carnum:'',
      carInfo:{},
      personInfo:{},
      licensePlates:[],
      relatives:[],
      relativesname:[],
    }    
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.licensePlates{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.licensePlate{
  margin: 2px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px;
  background-color: #f5f5f5;
  box-shadow: 1px 1px 8px 0px #c0c0c0;
  width: 140px;
}
.avatar{
  border-radius: 50%;
  height: 60px;
  width: 60px;
}
.headinfo{
  display: flex;
  flex-direction: column;
  font-size: 20px;
  align-items: center;
}
.info{
  display: flex;
  flex-direction: row;
  margin-left: 300px;
  justify-content: space-evenly;
}
.carInfo{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.pictures{
  display: flex;
  min-width: -webkit-fill-available;
  justify-content: space-evenly;
}
.el-main{
  width: fit-content;
  margin-left: 300px;
  margin-top: 60px;
  display: flex;
  min-width: fit-content;
  text-align: -webkit-center;
}
.el-input{
  width: 700px;
  border: 1px solid #c0c0c0;
  border-radius: 5px;
}
.box-card{
  width: fit-content;
  margin-top: 60px;
  height: max-content;
  min-width: 300px;
}
.main{
  text-align: -webkit-center;
  width: -webkit-fill-available;
}
</style>
