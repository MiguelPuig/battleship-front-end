<template>
  <div>
    
    <form id="login-form" onsubmit="return false">
      <label
        >Name: <input type="text" name="username" v-model="name"
      /></label>
      <label
        >Password: <input type="text" name="password" v-model="pwd"
      /></label>
      <button v-on:click="logIn">Log in</button>
    </form>

  
     <form id="logout-form" onsubmit="return false">
      <button v-on:click="logOut">Log Out</button>
    </form>
   
   
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      pwd: ""
    };
  },
  created() {},
  methods: {
    ...mapActions(["actLogIn", "actLogOut"]),
    logIn() {
      this.actLogIn({ userName: this.name, password: this.pwd });
    },
    logOut(){
      this.actLogOut()
    }
  }
};
</script>

<style></style>
