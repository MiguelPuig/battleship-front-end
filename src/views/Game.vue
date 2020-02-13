<template>
  <div v-if="getOneGame.length != 0" class="game">
    <h1>Game Locations</h1>

    <div>{{ getOneGame.state.Logic }}</div>

    <div class="versus">
      <div>{{ getOneGame.games.gamePlayers[0].player.userName }}</div>
      <span>VS</span>
      <div v-if="getOneGame.games.gamePlayers.length > 1">
        <div>{{ getOneGame.games.gamePlayers[1].player.userName }}</div>
      </div>
      <div v-else>Waiting for opponent</div>
    </div>

    <div
      :id="shipName.type + 'shipName'"
      v-for="(shipName, index) in shipsToSend"
      :key="index"
    >
      {{ shipName.type }}
    </div>

    <div class="station" v-if="this.positionShips.length == 0">
      <div
        :class="
          shipOrientations['PatrolBoat']
            ? 'PatrolBoatClass'
            : 'PatrolBoatClass2'
        "
        src="../assets/PatrolBoat.png"
        id="PatrolBoat"
        class="visibility"
        data-ship-length="2"
        data-ship-type="PatrolBoat"
        :draggable="true"
        @dragstart="dragstart"
        @dragover.stop
        @click="turnShip($event, 'PatrolBoat')"
      >
        PATROL BOAT
      </div>

      <div
        :class="
          shipOrientations['Destroyer'] ? 'DestroyerClass' : 'DestroyerClass2'
        "
        src="../assets/Destroyer3.png"
        id="Destroyer"
        class="visibility"
        data-ship-length="3"
        data-ship-type="Destroyer"
        :draggable="true"
        @dragstart="dragstart"
        @dragover.stop
        @click="turnShip($event, 'Destroyer')"
      >
        DESTROYER
      </div>

      <div
        :class="
          shipOrientations['Submarine'] ? 'SubmarineClass' : 'SubmarineClass2'
        "
        src="../assets/Submarine.png"
        id="Submarine"
        class="visibility"
        data-ship-length="3"
        data-ship-type="Submarine"
        :draggable="true"
        @dragstart="dragstart"
        @dragover.stop
        @click="turnShip($event, 'Submarine')"
      >
        SUBMARINE
      </div>

      <div
        :class="
          shipOrientations['Battleship']
            ? 'BattleshipClass'
            : 'BattleshipClass2'
        "
        src="../assets/Battleship.png"
        id="Battleship"
        class="visibility"
        data-ship-length="4"
        data-ship-type="Battleship"
        :draggable="true"
        @dragstart="dragstart"
        @dragover.stop
        @click="turnShip($event, 'Battleship')"
      >
        BATTLESHIP
      </div>

      <div
        :class="shipOrientations['Carrier'] ? 'CarrierClass' : 'CarrierClass2'"
        src="../assets/Carrier.png"
        id="Carrier"
        class="visibility"
        data-ship-length="5"
        data-ship-type="Carrier"
        :draggable="true"
        @dragstart="dragstart"
        @dragover.stop
        @click="turnShip($event, 'Carrier')"
      >
        CARRIER
      </div>
    </div>
    <button @click="sendShips">Send ships</button>

    <button @click="sendSalvos">Send salvos</button>

    <div>
      <div class="flex">
        <div class="gridNum" v-for="num in rows" :key="num">{{ num }}</div>
      </div>
      <div class="flex" v-for="char in cols" :key="char">
        <div
          class="gridItem"
          v-for="(num, index) in rows"
          :key="num + char"
          :id="char + num"
          @dragover.prevent
          @drop.prevent="drop"
        >
          <span v-if="index == 0">{{ char }}</span>
        </div>
      </div>
    </div>

    <span>Salvoes</span>

    <div>
      <div class="flex">
        <div class="gridNum" v-for="num in rows" :key="num">{{ num }}</div>
      </div>
      <div class="flex" v-for="char in cols" :key="char">
        <div
          class="gridItem"
          v-for="(num, index) in rows"
          :key="num + char"
          :id="char + num + 'salvo'"
          @click="putSalvos(char + num)"
        >
          <span v-if="index == 0">{{ char }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      fetchingInterval: null,
      // state : null,
      counter: 0,
      positionShips: [],
      positionOppSalvoes: [],
      rows: ["", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      cols: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],

      shipOrientations: {
        PatrolBoat: true,
        Destroyer: true,
        Submarine: true,
        Battleship: true,
        Carrier: true
      },

      shipsToSend: [
        {
          type: "PatrolBoat",
          locations: []
        },
        {
          type: "Destroyer",
          locations: []
        },
        {
          type: "Submarine",
          locations: []
        },
        {
          type: "Battleship",
          locations: []
        },
        {
          type: "Carrier",
          locations: []
        }
      ],
      salvosToSend: []
    };
  },
  name: "game",
  components: {},
  props: ["gameId"],

  computed: {
    ...mapGetters(["getOneGame"])
  },
  methods: {
    ...mapActions(["actOneGame", "actPlaceShips", "actPlaceSalvos"]),

    sendShips() {
      return this.$store.dispatch("actPlaceShips", {
        gpId: this.gameId,
        ships: this.shipsToSend
      });
    },
    sendSalvos() {
      // window.location.reload();
      this.$store.dispatch("actPlaceSalvos", {
        gpId: this.gameId,
        salvos: this.salvosToSend
      })
      this.salvosToSend.forEach(salvo => {
        document.getElementById(salvo + "salvo").classList.remove("shots")
      });
      this.salvosToSend= [];
    },

    shipLocations(shipId, grid) {
      let ship = document.getElementById(shipId);
      console.log(ship);

      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      let newShipLocations = [];
      let previousPositions = [];

      if (this.shipOrientations[ship.dataset.shipType]) {
        for (let i = 0; i < ship.dataset.shipLength; i++) {
          newShipLocations.push(char + (num + i));
        }
      } else {
        for (let j = 0; j < ship.dataset.shipLength; j++) {
          newShipLocations.push(
            String.fromCharCode(char.charCodeAt(0) + j) + num
          );
        }

        console.log("Vertical");
      }
      console.log(newShipLocations);

      this.shipsToSend.forEach(shipToSend => {
        if (shipToSend.type == ship.dataset.shipType) {
          shipToSend.locations = newShipLocations;
        }
      });
    },

    turnShip(event, name) {
      this.counter = 1;
      let grid = event.target.offsetParent;
      let shipId = event.target.id;
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      let ship = document.getElementById(shipId);
      console.log(grid.id.length);
      console.log(char.charCodeAt(0));

      if (
        (Number(ship.dataset.shipLength) + num < 12 &&
          !this.shipOrientations[name]) ||
        (Number(ship.dataset.shipLength) + char.charCodeAt(0) < 76 &&
          this.shipOrientations[name])
      ) {
        this.shipOrientations[name] = !this.shipOrientations[name];

        if (this.checkFree(shipId, grid)) {
          this.shipConditions(shipId, grid);
        } else {
          this.shipOrientations[name] = !this.shipOrientations[name];
        }
      } else {
        console.log("can't turn the ship here");
      }
    },

    shipConditions(shipId, grid) {
      let ship = document.getElementById(shipId);
      console.log(ship);
      console.log(grid.id.length);

      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      console.log(num);
      console.log(char);

      console.log(Number(ship.dataset.shipLength));
      console.log(Number(ship.dataset.shipLength) + num < 12);

      if (
        (num != 0 &&
          Number(ship.dataset.shipLength) + num < 12 &&
          this.shipOrientations[ship.dataset.shipType]) ||
        (num != 0 &&
          Number(ship.dataset.shipLength) + char.charCodeAt(0) < 76 &&
          !this.shipOrientations[ship.dataset.shipType])
      ) {
        console.log("bien");

        ship.style.position = "absolute";
        ship.style.display = "block";
        grid.appendChild(ship);

        this.shipLocations(shipId, grid);
      } else {
        console.log("can't drop here");
      }
    },

    drop(e) {
      let shipId = e.dataTransfer.getData("ship_id");
      let grid = e.target;
      let ship = document.getElementById(shipId);
      let prevLocations = [];

      this.shipsToSend.forEach(shipToSend => {
        if (shipToSend.type == shipId) {
          prevLocations = shipToSend.locations;
          shipToSend.locations = [];
        }
      });

      document.getElementById(shipId).classList.add("visibility");

      console.log(ship);

      if (this.checkFree(shipId, grid)) {
        this.shipConditions(shipId, grid);
      } else {
        this.shipsToSend.find(
          shipToSend => shipToSend.type == shipId
        ).locations = prevLocations;
        console.log("can't drop here");
      }
    },

    checkFree(shipId, grid) {
      let ship = document.getElementById(shipId);
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      let shipLocations = [];
      let equalizer = true;

      for (let i = this.counter; i < ship.dataset.shipLength; i++) {
        if (this.shipOrientations[ship.dataset.shipType]) {
          this.shipsToSend.forEach(shipToSend => {
            if (shipToSend.locations.includes(char + (num + i))) {
              console.log("can't turn ship here");
              equalizer = false;
            }
          });
        } else {
          this.shipsToSend.forEach(shipToSend => {
            if (
              shipToSend.locations.includes(
                String.fromCharCode(char.charCodeAt(0) + i) + num
              )
            ) {
              console.log("can't turn ship here");
              equalizer = false;
            }
          });
        }
      }
      return equalizer;
    },

    dragstart(e) {
      var target = e.target;
      e.dataTransfer.setData("ship_id", target.id);
      this.counter = 0;
      document.getElementById(target.id).classList.remove("visibility");
      // setTimeout(()=>{
      //   target.style.display = "none"
      // },1);
    },

    putSalvos(cell) {
      console.log(document.getElementById(cell + "salvo").classList);
      if (document.getElementById(cell + "salvo").id.length < 7) {
        console.log("can't place shots here");
      } else {
        if (
          document
            .getElementById(cell + "salvo")
            .classList.contains("shotsDone")
        ) {
          console.log("position already shoted");
        } else {
          if (this.salvosToSend.includes(cell)) {
            this.salvosToSend.splice(this.salvosToSend.indexOf(cell), 1);
            document.getElementById(cell + "salvo").classList.remove("shots");
          } else {
            if (this.salvosToSend.length < 5) {
              document.getElementById(cell + "salvo").classList.add("shots");
              this.salvosToSend.push(cell);
              console.log(this.salvosToSend);
            } else {
              console.log("can't place more salvos");
            }
            console.log(this.salvosToSend);
          }
        }
      }
    }
  },

  created() {
    this.actOneGame(this.gameId);

    this.fetchingInterval = setInterval(() => {
      this.actOneGame(this.gameId);
    }, 3000);
  },

  watch: {
    getOneGame() {
       let stateInt = this.getOneGame.state.Logic;
      console.log(stateInt);
    
      if (stateInt == "VICTORY" || stateInt == "DEFEAT" || stateInt == "DRAW") {
         clearInterval(this.fetchingInterval);
      } else {
        clearInterval(this.fetchingInterval);

      //   if (stateInt == "Place ships") {
      //     this.fetchingInterval = setInterval(() => {
      //       this.actOneGame(this.gameId);
      //     }, 3000);
      //   } else {
      //     clearInterval(this.fetchingInterval);
        

      //   if (stateInt == "Waiting for opponent ships") {
      //     this.fetchingInterval = setInterval(() => {
      //       this.actOneGame(this.gameId);
      //     }, 3000);
      //   } else {
      //     clearInterval(this.fetchingInterval);

      //     if (stateInt == "Shots" || stateInt == "Waiting for opponent shots") {
      //       this.fetchingInterval = setInterval(() => {
      //         this.actOneGame(this.gameId);
      //       }, 3000);
      //     }  
      //      else {
      //       clearInterval(this.fetchingInterval);
      //     }
      //   }
      // }
      }

      setTimeout(() => {
        for (let i = 0; i < this.getOneGame.ships.length; i++) {
          let shipLoc = this.getOneGame.ships[i].location;
          let shipType = this.getOneGame.ships[i].type;

          console.log(shipLoc);
          console.log(shipType);

          for (let j = 0; j < shipLoc.length; j++) {
            this.positionShips.push(shipLoc[j]); //************* */

            document
              .getElementById(shipLoc[j])
              .classList.add(shipType.replace(/\s/g, ""));
          }
        }

        for (let k = 0; k < this.getOneGame.mySalvoes.length; k++) {
          let salvoLoc = this.getOneGame.mySalvoes[k].location;
          console.log(salvoLoc);

          for (let l = 0; l < salvoLoc.length; l++) {
            document
              .getElementById(salvoLoc[l] + "salvo")
              .classList.add("shotsDone");
          }

          for (let z = 0; z < this.getOneGame.hits.length; z++) {
            let salvoHit = Object.values(this.getOneGame.hits[z]);

            for (let i = 0; i < salvoHit.length; i++) {
              let hits = salvoHit[i];
              this.dataHits = hits;
              hits.forEach(hit => {
                document
                  .getElementById(hit + "salvo")
                  .classList.add("shotsHit");
              });
            }
          }
          let sunks = Object.values(this.getOneGame.sunk.SunkShips);

          for (let i = 0; i < sunks.length; i++) {
            for (
              let j = 0;
              j < Object.keys(this.shipOrientations).length;
              j++
            ) {
              if (Object.keys(this.shipOrientations)[j] == sunks[i]) {
                document
                  .getElementById(sunks[i] + "shipName")
                  .classList.add("shipSunk");
              }
              this.dataHits.forEach(hit => {
                if (sunks) {
                  document
                    .getElementById(hit + "salvo")
                    .classList.add("shipSunk");
                }
              });
            }
          }
        }

        if (this.getOneGame.opponentSalvoes != null) {
          for (let m = 0; m < this.getOneGame.opponentSalvoes.length; m++) {
            let salvoOppLoc = this.getOneGame.opponentSalvoes[m].location;

            console.log(salvoOppLoc);

            for (let n = 0; n < salvoOppLoc.length; n++) {
              this.positionOppSalvoes.push(salvoOppLoc[n]);
              document
                .getElementById(salvoOppLoc[n])
                .classList.add("shotsDone");
            }
          }
        }
        for (let o = 0; o < this.positionShips.length; o++) {
          for (let p = 0; p < this.positionOppSalvoes.length; p++) {
            if (this.positionShips[o] == this.positionOppSalvoes[p]) {
              document
                .getElementById(this.positionOppSalvoes[p])
                .classList.add("shotsHit");
            }
          }
        }
      
      }, 1);
    }
  }
};
</script>

<style scoped>
.gridNum {
  display: inline-grid;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
  font-size: 10px;
  text-align: center;
  height: 30px;
  width: 30px;
}

.gridItem {
  position: relative;
  display: inline-grid;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 5px;
  font-size: 10px;

  height: 30px;
  width: 30px;
}
.flex {
  display: flex;
}

.DestroyerClass {
  width: 124.5px;
  height: 40.5px;
  background-image: url("../assets/Destroyer3.png");
  background-size: cover;
  top: 0px;
}
.DestroyerClass2 {
  width: 40.5px;
  background-image: url("../assets/Destroyer4.png");
  background-size: cover;
  height: 124.5px;
  top: 0px;
}

.PatrolBoatClass {
  width: 83px;
  height: 40.5px;
  background-image: url("../assets/PatrolBoat.png");
  background-size: cover;
  top: 0px;
}
.PatrolBoatClass2 {
  width: 40.5px;
  background-image: url("../assets/PatrolBoat2.png");
  background-size: cover;
  height: 83px;
  top: 0px;
}
.Carrier {
  background: brown;
}
.CarrierClass {
  width: 209px;
  z-index: 1;
  height: 40.5px;
  background-color: brown;
}
.CarrierClass2 {
  width: 40.5px;
  background-color: brown;
  z-index: 1;
  height: 209px;
  top: 0px;
}

.SubmarineClass2 {
  width: 124.5px;
  height: 40.5px;
  background-image: url("../assets/Submarine.png");
  background-size: cover;
  top: 0px;
}
.SubmarineClass {
  width: 124.5px;
  top: 0px;
  height: 40.5px;
  background-image: url("../assets/Submarine2.png");
  background-size: cover;
}
.Battleship {
  background: slateblue;
}
.BattleshipClass {
  width: 166.5px;
  z-index: 1;
  height: 40.5px;
  background-color: slateblue;
}
.BattleshipClass2 {
  width: 40.5px;
  background-color: slateblue;
  z-index: 1;
  height: 166.5px;
  top: 0px;
}
.versus {
  display: flex;
}
.shots {
  background: red;
}
.shotsDone {
  background: pink;
}
.shotsHit {
  background: fuchsia;
}
.shipSunk {
  background: greenyellow;
}
.visibility {
  z-index: 1;
}
</style>
