<template>
    <div id="members">
    <Nav></Nav>
    <div class="">
      <h1>Membres ({{members.length}} membres)</h1>
      <div id="listMembers">
        <article class="conversations panel is-info">
          <p class="panel-heading">Membres</p>

          <p v-for="member in members" class="panel-block" :key="member.id">
            <img :src="'https://api.adorable.io/avatars/48/'+member.email">
            <router-link class="content" :to="{ name: 'member', params: {id : member.id} }">{{member.fullname}}, {{member.email}}</router-link>
            <button class=" fa fa-trash" @click="deleteMember(member.id)"></button>
          </p>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from './Nav.vue';
export default {
    data(){
        return{
            members:[]
        }
    },
    components:{
        Nav
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
        },
        deleteMember(member){
            if(member===this.$store.state.id){
                alert("you cannot delete yourself !!")
            }
            else{
                if(confirm("Do you really want to delete this member ?")){
                    axios.delete("members/"+member).then((response)=>{
                        const pos = this.members.findIndex(m=>m.id===member);
                        this.members.splice(pos,1);
                        /* this.refreshMembers(); */
                    }).catch((error)=>{
                            console.log(error);
                        })
                }
            }
            
        }
    },
    created(){
        this.refreshMembers();
    }
}
</script>