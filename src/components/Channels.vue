<template>
    <div>
     
        <Nav></Nav>
        <div id="displayChannels" style="padding:20px">
            <article class="channels">
                <div class="panel-heading row" style="background-color:rgba(182,255,211,0.5)">
                  <p class="col-1" style="font-family:Helvetica;font-weight:bolder;font-size:40px">
                    Channels
                  </p>
                 
                </div>
                <div class="row" style="padding:10px">
                 <button @click="showHideModal()" class="btn btn-add">+ Ajouter une conversation</button>
                </div>
                <div v-for="channel in this.channels" class="panel-block" :key="channel.id" style="width:70%;padding:0px;margin:5px;border:1px solid rgba(182,255,211,1);border-radius:5px">
                  
                    <router-link tag = "div" :to="{ name: 'channelDetail', params: {id : channel.id} }" class="conversation" >
                    {{channel.label}}
                  </router-link>
                  
                  
                </div>
            </article>
        </div>
        <div class="modal" v-if=showModal :class="{'is-active':showModal}" style="border:2px solid orange">
              <div class="modal-background"></div>
              <div class="modal-card">
                  <header class="modal-card-head">
                      <p class="modal-card-title">Add channel</p>
                      <button @click="closeModal()" class="delete" aria-label="close"></button>
                  </header>
                  <section class="modal-card-body">
                      <input type="text" v-model='title' name="titre" placeholder="Title Example ..." class ="input" required>
                      <input type="text" v-model='tags' name="tags" placeholder="Tags Example ..." class="input" required>
                  </section>
                  <footer class="modal-card-foot">
                      <button @click="addChannel()" class="button is-success">Create channel</button>
                      <button @click="closeModal()" class="button">Cancel</button>
                  </footer>
              </div>
              </div>
        </div>   
</template>
 <style>
  .btn-add:hover{
    background-color:rgb(182,255,211)
  }
  .conversation{
    color:#000;font-weight:100;font-family:Gothic-century;font-size:20px;width:100%;cursor: pointer;height: 100%;padding:10px
  }
  .conversation:hover{
    background-color: rgb(182,255,211);
  }

</style>

<script>
import Nav from './Nav.vue';
export default {
  data(){
      return{
          title:null,
          tags:null,
          channels:null,
          showModal:false
      }
  },
  components:{
      Nav
  },
  methods:{
    showHideModal(){
      this.showModal=true;
    },
    closeModal(){
      this.showModal=false;
    },
    addChannel(){
      if(this.title!=null&&this.tags!=null){
        this.closeModal();
        axios.post('channels',{
          label:this.tags,
          topic:this.title,
          token:this.$store.state.token
        }).then((response)=>{
          axios.get('channels').then((response)=>{
            this.channels=response.data;
            this.title=null,
            this.tags=null;
          }).catch((error)=>console.log(error))
        }).catch((error)=>console.log(error))
      }
      else{
        alert("The inputs are invalid !!")
      }
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
      this.getMembers();
      axios.get('channels').then((response)=>{
          this.channels=response.data;
      }).catch((error)=>{
          console.log(error);
      })
  }
}
</script>