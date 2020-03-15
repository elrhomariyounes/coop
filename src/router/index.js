import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Login from '../components/Login'
import Channels from '../components/Channels'
import ChannelDetail from '../components/ChannelDetail.vue'
import Register from '../components/Register'
import Members from '../components/Members'
import MemberDetail from '../components/MemberDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path:'/',
    name:'channels',
    component: Channels
  },
  {
    path:'/channelDetail/:id',
    name:'channelDetail',
    component:ChannelDetail
  },
  {
    path:'/register',
    name:'register',
    component: Register
  },
  {
    path:'/members',
    name:'members',
    component:Members
  },
  {
    path:'/members/:id',
    name:'member',
    component:MemberDetail
  }
]

const router = new VueRouter({
  routes
})

//Authorization
router.beforeEach((to,from,next)=>{
  console.log(to);
  if(!store.state.isLogged && to.name!=="login" && to.name!=="register"){
    next({name : "login"});
  }
  else{
    next();
  }
})
export default router
