<template>
    <div>
        <Nav></Nav>
        <div id="displayChannels">
            <article class="channels">
                <div class="panel-heading row">
                  <p class="col-1">
                    Channels
                  </p>
                  <button @click="showHideModal()" class="btn btn-primary">+ Ajouter une conversation</button>
                </div>
                <div v-for="channel in this.channels" class="panel-block" :key="channel.id">
                  <router-link :to="{ name: 'channelDetail', params: {id : channel.id} }">
                    {{channel.label}}
                  </router-link>
                </div>
            </article>
        </div>
        <div class="modal" v-if=showModal :class="{'is-active':showModal}">
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