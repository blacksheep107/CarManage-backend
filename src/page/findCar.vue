<template>
    <p>1</p>
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

</style>
