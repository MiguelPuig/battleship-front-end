<template>
  <div v-if="getGames" class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

    <h1>Games</h1>

    <button v-on:click="createGame">Create Game</button>
    <div class="gamesTable">
      <div v-for="(game, index) in getGames.games" :key="index">
        <p>created {{ game.created }}</p>

        <div v-for="(gamePlayer, index) in game.gamePlayers" :key="index">
          <div>{{ gamePlayer.player.userName }}</div>
          <div>{{ gamePlayer.player.email }}</div>

          <div v-if="getGames.player != null">
            <router-link
              v-if="gamePlayer.player.id == getGames.player.id"
              :to="`/game/${gamePlayer.id}`"
              >Enter</router-link
            >
            <button
              v-if="
                game.gamePlayers.length == 1 &&
                  gamePlayer.player.id !== getGames.player.id
              "
              v-on:click="joinGame(game.id)"
            >
              Join
            </button>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  computed: {
    ...mapGetters(["getGames"]),

    compareId() {}
  },
  methods: {
    ...mapActions(["getAllGames", "actCreateGame", "actJoinGame"]),
    createGame() {
      this.actCreateGame();
    },
    joinGame(gameId) {
      this.actJoinGame(gameId);
    }
  },
  created() {
    this.getAllGames();
  }
};
</script>
<style scoped></style>
