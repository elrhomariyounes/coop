<template>
    <div>
        <Nav></Nav>
        <div>
            <article class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-body">{{currentChannel.topic}}</h3>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </article>
            <div class="panel-block">
                <input name="addMessage" v-model='message' class="input" type="text" @keyup.enter="addMessage()" placeholder="New message">
                <button @click="addMessage()" class="btn btn-primary">Envoyer</button>
            </div>
            <div v-for="(message,index) in messages" :key="message.id">
                <div>
                    <router-link :to="{ name: 'member', params: {id : message.member_id} }">{{getMember(message)}}</router-link>
                    <input v-model="message.message" :disabled="!isPostWriter(index)">
                    <button v-if="isPostWriter(index)" @click="editMessage(message)">Edit</button>
                    <button v-if="isPostWriter(index)" @click="deleteMessage(message)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Nav from './Nav.vue'
export default {
    data(){
        return{
            channels:[],
            messages:[],
            message:null,
            editInput:null
        }
    },
    components:{
        Nav,
    },
    computed:{
        currentChannel(){
            return this.channels.find(c=>c.id===this.$route.params.id);
        },
    },
    methods:{
        deleteMessage(message){
            if(confirm('Do you really want to delete this post')){
                axios.delete('channels'+"/"+this.$route.params.id+"/posts/"+message.id).then((response)=>{
                    this.getPosts();
                }).catch((error)=>console.log(error))
            }
        },
        editMessage(message){
            axios.put('channels'+"/"+this.$route.params.id+"/posts/"+message.id,{
                message:message.message,
                token:this.$store.state.token
            }).then((response)=>{
                this.getPosts();
            }).catch((error)=>console.log(error))
        },
        isPostWriter(index){
            const message = this.messages[index]
            return message.member_id===this.$store.state.id;
        },
        getMember(message){
            const member= this.$store.state.members.find(m=>m.id===message.member_id);
            if(member!=null)
            return member.fullname;
        },
        getChannels(){
            axios.get('channels').then((response)=>{
                this.channels=response.data;
            }).catch((error)=>console.log(error))
        },
        getPosts(){
            axios.get('channels/'+this.$route.params.id+'/posts')
            .then((response)=>{
                this.messages=response.data;    
            }).catch((error)=>console.log(error))
        },
        addMessage(){
            if(this.message!=null){
                axios.post('channels/'+this.$route.params.id+'/posts',{
                    channel_id : this.$route.params.id,
                    member_id : this.$store.state.id,
                    message : this.message,
                    token : this.$store.state.token
                }).then((response)=>{
                        this.getPosts();
                }).catch((error)=>console.log(error))
                
            }
            else{
                alert("Input invalid");
            }    
        }
    },
    created(){
        this.getChannels();
        this.getPosts();
        this.getMember();
    }
}
</script>