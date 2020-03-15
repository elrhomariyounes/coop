<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Login from './components/Login';
export default {
  name:"App",
  components:{
    Login
  },
  mounted(){

  },
  computed:{

  },
  created(){
    if(this.$store.state.token){
      axios.get("members/"+this.$store.state.id+"/signedin")
      .then((response)=>{
        console.log(response);
      }).catch((error)=>{
        this.$router.push('login')
      })
    }
  }
}
</script>
