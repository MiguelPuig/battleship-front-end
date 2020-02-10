<template>
  <div>
      <div class="table">
    <table>
      <tr class="tableTitle">
        <th>Player</th>
        <th>Wins</th>
        <th>Loses</th>
        <th>Ties</th>
        <th>Total Score</th>
      </tr>
      <tr class="tableBody" v-for="(player, index) in getBoard" :key="index">
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
    </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getLadderBoard"]),
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
    ...mapActions(["actLadderBoard"])
  },
  created() {
    this.actLadderBoard();
  }
};
</script>

<style>
.tableBody{
    display: flex;
    justify-content: space-between;
}
.tableTitle{
    display: flex;
    justify-content: space-around;
}
th{
    width: 120px;
    background-color: steelblue;
    color: white;
    padding: 10px;
}
td{
    width: 120px;
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 10px;
}
tr:nth-child(even){background-color: #f2f2f2}
;
</style>
