<template>
    <section style="display:flex;align-items:'center;justify-content:center">
      <div style="border-right:6px solid #278701;border-bottom:6px solid #278701;border-top-left-radius:40px;width:50%;background-color:rgba(182,255,211,0.5);padding:30px;margin-top:150px;border-bottom-right-radius:40px">
        <div>
          <div>
            <div>
              <form @submit.prevent="LogIn">
                <div>
                  <label style="font-weight:bold" for="">Email</label>
                  <input  type="email" style="border: none; width:130%;border-bottom: 4px solid #278701" v-model='email' name="email"  class="input" required>
                </div>
                <div>
                  <label style="font-weight:bold" for="">Password</label>
                  <input type="password" style="border: none; width:130%;border-bottom: 4px solid #278701"  v-model='password' class="input" name="password" required>
                </div>
                <div style="margin-top:10px;width:100%">
                  <button class="btn btn-dark" style="width:100%">
                    Login
                  </button>
                  <div class="btn btn-light" style="width:100%;margin-top:10px">
                    <router-link to="register" tag="div">
                      S'enregistrer
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
            email:"test@test.fr",
            password:"test",
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