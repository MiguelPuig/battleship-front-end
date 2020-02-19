<template>
 

    <div class="title">

<h1>STAR WARS BATTLESHIP</h1>

  <div class="login">


    <div class="backgroundLogin">
    <form class="form" id="login-form" onsubmit="return false">
      <v-text-field dark label="Name" name="username" v-model="userName" :rules="nameRules" required
            
        > 
      </v-text-field>
      <v-text-field dark  type= "password" label = "Password"  name="password" v-model="password" :rules="passwordRules" required
        > 
      </v-text-field>

    
      <v-text-field dark label = "E-mail"  name="email" v-model="email" :rules="emailRules" required
        > 
      </v-text-field>
      <div class="loginButton">

       
      <v-btn dark v-on:click=" register">Sing in</v-btn>
       

      </div>
    </form>
    </div>

  </div>
  </div>
    
 
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
        nameRules: [v => !!v || "Name is required"],
      passwordRules: [v => !!v || "Password is required"],
      emailRules: [v => !!v || "E-mail is required"],
      userName: "",
      password: "",
      email: ""
    };
  },
  methods: {
    ...mapActions(["actRegister"]),
    register() {
      this.actRegister({ userName: this.userName, password: this.password, email: this.email });
    }
  }
};
</script>

<style>
.login{
      display: flex;
    justify-content: center;
    padding-top: 150px;
   
   height: 650px;
   
}
.form{
background-color: black;
 padding: 20px;
}
.loginButton{
      display: flex;
    justify-content: center;
    padding-top: 20px;

}

h1{
  text-align: center;
  color: white;
  padding-top: 30px;
  padding-bottom: 10px;
  
}
.title{
   background-image: url("../assets/background3.jpg");
    background-size: cover;
   
}
</style>

