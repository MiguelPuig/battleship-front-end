<template>
<v-app>
  <div v-if="getGames" class="home">


     <v-toolbar dark dense>
     

      <v-toolbar-title>{{getGames.player.userName}}</v-toolbar-title>

      <v-spacer></v-spacer>

    
        
       <v-btn icon class="navbarButton" v-on:click="logOut">Log Out</v-btn>
        
    

    
         <router-link :to="'/ladderBoard'">
         
          <v-btn class="navbarButton" icon>
              Ladder Board
      </v-btn>
         
         </router-link>
        
      

      <v-btn  v-on:click="createGame" class="navbarButton" icon>
        
       Create Game
      </v-btn>

     

      
    </v-toolbar>
   
    <h1 class="titleGames">Games</h1>

   
  <v-container>
   <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr class="tableTitle">
          <th class="text-center">Date</th>
          <th  colspan="2" class="text-center">Players</th>
          <th class="text-center">State</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in getGames.games" :key="index">
          <td class="text-center">{{ game.created}}</td>
          
          <td  v-for="(gamePlayer, index) in game.gamePlayers" :key="index">{{ gamePlayer.player.userName }}</td>
          <td  v-if="game.gamePlayers.length == 1">Waiting for opponent</td>
          <td  v-if="getGames.player != null">
            <h4 v-for="(gamePlayer, index) in game.gamePlayers" :key="index">
            <router-link
              v-if="gamePlayer.player.id == getGames.player.id"
              :to="`/game/${gamePlayer.id}`"
              > <v-btn> Enter</v-btn></router-link
            >
            <v-btn
              v-if="
                game.gamePlayers.length == 1 &&
                  gamePlayer.player.id !== getGames.player.id
              "
              v-on:click="joinGame(game.id)"
            >
              Join
            </v-btn>
            </h4>
          
          </td>
        
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </v-container>

   

 
  </div>
</v-app>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  data() {
    return {
     
      search: "",
      tags: [],
      items: [
        // { text: "LOGIN", route: "/Login" },
        { text: "CHAT & LOGIN", route: "/Chat" }
      ],
      pages: [
        { text: "CHAMPIONS", route: "/" },
        { text: "ITEMS", route: "/Items" }
      ],
      drawer: false
    };
  },
  computed: {
    ...mapGetters(["getGames"]),

    compareId() {}
  },
  methods: {
    ...mapActions(["getAllGames", "actCreateGame", "actJoinGame","actLogOut"]),
     logOut(){
      this.actLogOut()
    },





    
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
<style>
th{
  font-size: 20px !important;
  font-weight: bold !important;
}
td{
  text-align: center;
  width: 180px
}
.titleGames{
  text-align: center;
  background: black;
  color: white;
  padding-top: 30px;
  padding-bottom: 10px;
}
.home{
  background:black;
}
.navbarButton{
  width: 200px !important;
}

</style>
