<template>
    <div id="register">
    <div class="section">
      <div class="container">
        <div class="title">Sign Up</div>
        <div class="subtitle">With Your Email</div>
        <form id="register-form" @submit.prevent="register">
          <div class="field">
            <label class="label" for="email">Email</label>
            <input required class="input" type="email" placeholder="Email" v-model='email' name="email"/>
            <div class="columns row-one">
              <div class="column">
                <label class="label" for="fullName">Full Name</label>
                <div class="control">
                  <input required class="input" type="text" placeholder="Full Name" v-model='fullname' name="fullName"/>
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column">
                <label class="label" for="password">Password</label>
                <input required class="input" type="password" placeholder="Password" v-model='password' name="password"/>
              </div>
            </div>
            <div class="field is-grouped">
              <div class="control">
                <button class="buttonRegister button is-primary is-medium" type="submit">Register</button>
              </div>
              <a class="loginRef" href="/">Vous avez déjà un compte ? Connectez-vous</a>
            </div>
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