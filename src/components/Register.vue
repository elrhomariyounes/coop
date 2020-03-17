<template>
    <div id="register">
    <div class="section">
      <div class="container" style="border-right:6px solid #278701;border-bottom:6px solid #278701;padding:30px;border-bottom-right-radius:40px;background-color:rgba(182,255,211,0.5);border-top-left-radius:40px;align-items:center;justify-content:center;display:flex;flex-direction:column">
        <div class="title">
          Sign Up</div>
        <form id="register-form" @submit.prevent="register">
          <div class="field">
            <label class="label" for="email">Email</label>
            <input required style="border: none; width:130%;border-bottom: 4px solid #278701 " type="email" v-model='email' name="email"/>
            <div class="columns row-one">
              <div class="column">
                <label class="label" for="fullName">Full Name</label>
                <div class="control">
                  <input required style="border: none; width:130%;border-bottom: 4px solid #278701" type="text" v-model='fullname' name="fullName"/>
                </div>
              </div>
            </div>
            <div class="columns row-one">
            <div class="column">
                <label class="label" for="password">Password</label>
                <div class="control">
                <input required style="border: none; width:130%;border-bottom: 4px solid #278701 " type="password" v-model='password' name="password"/>
              </div>
            </div>
            </div>
            <div class="field is-grouped">
              <div class="control" style="width:100%">
                <button class="buttonRegister button is-dark is-medium" style="width:130%" type="submit">Register</button>
              </div>
              
            </div>
            <a style="color:black;font-style:italic;font-weight:bolder" class="loginRef" href="/">Vous avez déjà un compte ? Connectez-vous</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            email:null,
            fullname:null,
            password:null
        }
    },
    methods:{
        register(){
            if(this.email && this.fullname&&this.password){
                axios.post('members',{
                    fullname:this.fullname,
                    email:this.email,
                    password:this.password
                }).then((response)=>{
                    this.$store.commit('setId',response.data.id);
                    this.$router.push('login');
                }).catch((error)=>console.log(error))
            }
            else{
                alert("Inputs are invalid !!");
            }
        }
    }
}
</script>