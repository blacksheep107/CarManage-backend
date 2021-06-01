<template>
  <el-container>
    <el-header>CarE</el-header>
    <el-container>

      <el-aside width="300px">
        <el-menu default-active="allUsers" router>
          <el-menu-item-group>
            <el-menu-item index="allUsers">所有用户</el-menu-item>
            <el-menu-item index="findCar">车牌管理</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <keep-alive>
          <router-view></router-view>
      </keep-alive>
    </el-container>
  </el-container>
</template>

<script>
export default {
    mounted(){
        this.$router.push('allUsers');
	},
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.el-header {
  position: fixed;
  width: 100%;
  background-color: #108cee;
  line-height: 60px;
  color: white;
  font-size: 50px;
  font-weight: bold;
}
.el-aside{
    background-color: #f0f0f0;
    bottom: 0;
    position: fixed;
    top: 60px;
}
</style>
