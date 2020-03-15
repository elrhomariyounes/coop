import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

const vp = new VuexPersist({
  key:'store',
  storage:window.localStorage
})

Vue.use(Vuex)
Vue.prototype.$bus = new Vue()

export default new Vuex.Store({
  plugins:[vp.plugin],
  state: {
    id:null,
    token:null,
    isLogged:false,
    members:new Array(),
    idMember:null
  },
  mutations: {
    setMemberId(state,idMember){
      state.idMember=idMember;
    },
    LogOut(state){
      state.id=null,
      state.token=null,
      state.isLogged=false
      state.members=[];
      state.idMember=null;
    },
    setToken(state,token){
      state.token=token;
    },
    setId(state,id){
      state.id=id;
    },
    ChangeConnectionState(state){
      state.isLogged=!state.isLogged;
    },
    setMembers(state,members){
      state.members=members;
    }
  },
  actions: {
  },
  modules: {
  }
})
