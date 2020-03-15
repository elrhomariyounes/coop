<template>
    <section>
      <div>
        <div>
          <div>
            <div>
              <form @submit.prevent="LogIn">
                <div>
                  <label for="">Email</label>
                  <input type="email" v-model='email' name="email" placeholder="younes@gmail.com" class="input" required>
                </div>
                <div>
                  <label for="">Password</label>
                  <input type="password" v-model='password' class="input" name="password" required>
                </div>
                <div>
                  <button class="btn btn-primary">
                    Login
                  </button>
                  <div class="register">
                    <router-link to="register">
                      <a>S'enregistrer</a>
                    </router-link>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name:'Login',
    created(){
        this.$store.commit('LogOut');
    },
    data(){
        return{
            email:null,
            password:null,
        }
    },
    methods:{
        LogIn(){
            if(this.email&&this.password){
                axios.post('members/signin',{
                    email : this.email,
                    password : this.password
                }).then((response)=>{
                    this.$store.commit("setMemberId",response.data.member.id);
                    this.$store.commit("setToken",response.data.token);
                    this.$store.commit("setId",response.data.member.id);
                    this.$store.commit("ChangeConnectionState");
                    this.$router.push('/');
                }).catch((error)=>{
                    alert("Email or password are incorrect !!");
                    console.log(error);
                })
            }
            else{
                alert('Please verify the inputs');
            }
        }
    }
}
</script>