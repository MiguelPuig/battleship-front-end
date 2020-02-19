<template>
<v-app>
  <div class="game" v-if="getGames">

  
       <v-toolbar dark dense>
     

      <v-toolbar-title>{{getGames.player.userName}}</v-toolbar-title>

      <v-spacer></v-spacer>

    
        
       <v-btn icon class="navbarButton" v-on:click="logOut">Log Out</v-btn>
        
    

    
         <router-link :to="'/home'">
         
          <v-btn class="navbarButton" icon>
             Games
      </v-btn>
         
         </router-link>
        
      


       </v-toolbar>

         <v-container>

    <h1>LEADERBOARD</h1>
     <v-simple-table dark>
    <template v-slot:default>
      <thead>
        <tr>
          <th>PLAYER</th>
        <th>WINS</th>
        <th>LOSES</th>
        <th>TIES</th>
        <th>TOTAL SCORE</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(player, index) in getBoard" :key="index">
          <td>
          {{ player.player }}
        </td>
        <td>
          {{ player.win }}
        </td>
        <td>
          {{ player.lose }}
        </td>
        <td>
          {{ player.tie }}
        </td>
        <td>
          {{ player.points }}
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
import { mapActions, mapGetters } from "vuex";
export default {
   props: ["gameId"],
  computed: {
    ...mapGetters(["getLadderBoard", "getGames"]),
    getBoard() {
      let ladderBoard = [];
      this.getLadderBoard.forEach(player => {
        let playerScore = {
          player: player.player.userName,
          win: 0,
          lose: 0,
          tie: 0,
          points: 0
        };
        player.score.forEach(scores => {
          switch (scores) {
            case 0.0:
              playerScore.lose += 1;
              break;
            case 0.5:
              playerScore.tie += 1;
              playerScore.points += scores;
              break;
            case 1:
              playerScore.win += 1;
              playerScore.points += scores;
              break;

            default:
              break;
          }
        });
        ladderBoard.push(playerScore);
      });
      return ladderBoard.sort((a, b) => {
        if (a.points < b.points) {
          return 1;
        } else if (a.points > b.points) {
          return -1;
        } else if (a.points == b.points) {
          return a.win + a.lose + a.tie < b.win + b.lose + b.tie;
        }
      });
    }
  },
  methods: {
    ...mapActions(["actLadderBoard", "getAllGames","actLogOut"]),
     logOut(){
      this.actLogOut()
    },

  },
  created() {
    this.actLadderBoard();
     this.getAllGames();
  }
};
</script>

<style>

td{
  text-align: center;
}
th{
  font-weight: bold;
  font-size: 15px !important;
  text-align: center !important;
}
.game{
  background:black;
  min-height: 650px;
}
h1{
  text-align: center;
  padding: 20px;
  color: white
}

</style>
