<template>
    <div>
  <b-navbar toggleable="lg" type="light" variant="light" style="border-bottom:3px solid #000">
    <b-navbar-brand href="/" style="font-size:30px;font-family:Century-gothic">COOP</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/members" right>Members</b-nav-item>
        <b-nav-item href="/" right>Channels</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item :to="{ name: 'member', params: {id : this.$store.state.id} }">Profile</b-dropdown-item>
          <b-dropdown-item @click="LogOut()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
  name:"Nav",
  data(){
    return{

    }
  },
  methods:{
    LogOut(){
      axios.delete('members/signout').then((response)=>{
        this.$store.commit("LogOut");
        this.$router.push('login');
      }).catch((error)=>{
        console.log(error);
      });
     
    }
  }
}
</script>