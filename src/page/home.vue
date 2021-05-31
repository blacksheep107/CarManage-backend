<template>
    <div class="home">
      <img alt="logo" src="@/static/logo.png">
      <HelloWorld msg="Welcome to Your CarE App"/>
    </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld.vue'
export default {
    name:'home',
    data(){
        return{
        }
    },
    components:{
        HelloWorld
    }
}
</script>