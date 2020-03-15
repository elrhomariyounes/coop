<template>
    <div id="memberdetail">
    <Nav></Nav>
    <article class="member panel is-primary">
      <p class="panel-heading">Profil Utilisateur</p>

      <div class="panel-block">
        <img class="centered" :src="'https://api.adorable.io/avatars/128/'+member.email">
        <div class="container">
            <div class="row">
                <div class="col-1">{{member.fullname}}</div>
                <div>{{member.email}}</div> 
            </div>
        </div>
             
      </div>
      <div>
            <h2>Historique des messages</h2>
        </div>
    </article>
  </div>
</template>

<script>
import Nav from './Nav.vue'
export default {
    data(){
        return{
            members:[]
        }
    },
    components:{
        Nav
    },  
    computed:{
        //filter the member
        member:function(){
            return this.members.find(m=>m.id===this.$route.params.id);
        }
    },
    methods:{
        refreshMembers(){
            this.getMembers();
            this.members=this.$store.state.members;
        },
        getMembers(){
            axios.get('members').then((response)=>{
                this.$store.commit("setMembers",response.data);
                }).catch((error)=>{
                console.log(error);
            })
        }
    },
    created(){
        this.refreshMembers();
    }
}
</script>