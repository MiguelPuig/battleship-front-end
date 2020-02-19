<template>
  <div class="title">
    <h1>STAR WARS BATTLESHIP</h1>

    <div class="login">
      <div class="backgroundLogin">
        <form class="form" id="login-form" onsubmit="return false">
          <v-text-field
            dark
            label="Name"
            name="username"
            v-model="name"
            :rules="nameRules"
            required
          >
          </v-text-field>
          <v-text-field type="password" dark label="Password" name="password" v-model="pwd"  :rules="passwordRules"
            required>
          </v-text-field>
          <div class="loginButton">
            <v-btn dark v-on:click="logIn">Log in</v-btn>

            <router-link :to="'/register'">
              <v-btn dark v-on:click="logIn">Sing in</v-btn>
            </router-link>
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
    logOut() {
      this.actLogOut();
    }
  }
};
</script>

<style>
.login {
  display: flex;
  justify-content: center;
  padding-top: 150px;

  height: 650px;
}
.form {
  background-color: black;
  padding: 20px;
}
.loginButton {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
/* .backgroundLogin{
  background-image: url("../assets/backgroundLogin1.jpg");
  
} */
h1 {
  text-align: center;
  color: white;
  padding-top: 30px;
  padding-bottom: 10px;
}
.title {
  background-image: url("../assets/background3.jpg");
  background-size: cover;
}
</style>
