<template>
  <div>
    <form id="register-form" onsubmit="return false">
      <label>Name: <input type="text" name="username" v-model="userName"/></label>
      <label
        >Password: <input type="text" name="password" v-model="password"
      /></label>
      <label>
        E-mail: <input type="text" name="email" v-model="email" />
      </label>

      <button v-on:click="register">Register</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
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

<style></style>
