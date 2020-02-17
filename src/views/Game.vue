<template>
<v-app>
  <div v-if="getOneGame.length != 0" class="game">
    
    
    <header>



       <v-toolbar dark dense>
     

      <v-toolbar-title>{{getOneGame.games.gamePlayers[0].player.userName}}</v-toolbar-title>

      <v-spacer></v-spacer>

    
        
       <v-btn icon class="navbarButton" v-on:click="logOut">Log Out</v-btn>
        
    

    
         <router-link :to="'/ladderBoard'">
         
          <v-btn class="navbarButton" icon>
              Ladder Board
      </v-btn>
         
         </router-link>
        
         <router-link :to="'/home'">
         
          <v-btn class="navbarButton" icon>
             Games
      </v-btn>
         
         </router-link>

       </v-toolbar>







    <h1 class="versus">
      <div>{{ getOneGame.games.gamePlayers[0].player.userName }}</div>
      <div class="vs">  VS  </div>
      <div v-if="getOneGame.games.gamePlayers.length > 1">
        <div>{{ getOneGame.games.gamePlayers[1].player.userName }}</div>
      </div>
      <div v-else>Waiting for opponent</div>
    </h1>
    </header>


    <v-dialog
    dark
      v-model="dialogTurn"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        dark
      >
        <v-card-text>
         Can't turn the ship here
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>



      <v-dialog
    dark
      v-model="dialogDrop"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        dark
      >
        <v-card-text>
         Can't drop the ship here
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>



      <v-dialog
    dark
      v-model="dialogShots"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        dark
      >
        <v-card-text>
         Can't place shots here
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>



      <v-dialog
    dark
      v-model="dialogPositionShoted"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        dark
      >
        <v-card-text>
        Position already shoted
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>


      <v-dialog
    dark
      v-model="dialogPlaceSalvos"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        dark
      >
        <v-card-text>
         Can't place more salvos
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>



   

<div class="grids">
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


   <div class="station" v-if="this.positionShips.length == 0">
     <div class="center">
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
       
      </div>
      </div>

      <div class="center">
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
        
      </div>
      </div>

    <div  class="center">
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
       
      </div>
      </div>

      <div  class="center">
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
       
      </div>
      </div>
<div  class="center">
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
      
      </div>
      </div>

      <div class="send">
   <button class="sendShips" @click="sendShips">SEND SHIPS</button>

   
    </div>

    </div>

  
  <div v-else>

    <div>Turn: {{}}</div>
 
<div class="boats">
   <div class="boat"
      :id="shipName.type + 'shipName'"
      v-for="(shipName, index) in shipsToSend"
      :key="index"
    >
      {{ shipName.type }}
    </div>
</div>


<div class="sendLogic">
<div class="logic">{{ getOneGame.state.Logic }}</div>
<div class="sendSalvos">
<button @click="sendSalvos">Send salvos</button>
</div>
</div>
    </div>



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
  
  </div>
</v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {

      dialogTurn: false,
      dialogDrop: false,
      dialogShots: false,
      dialogPositionShoted: false,
      dialogPlaceSalvos:false,
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
    ...mapActions(["actOneGame", "actPlaceShips", "actPlaceSalvos","actLogOut"]),

     logOut(){
      this.actLogOut()
    },

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
      });
      this.salvosToSend.forEach(salvo => {
        document.getElementById(salvo + "salvo").classList.remove("shots");
      });
      this.salvosToSend = [];
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
         this.dialogTurn = true;
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
        this.dialogDrop = true
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
         this.dialogDrop = true
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
               this.dialogTurn = true;
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
               this.dialogTurn = true;
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
        this.dialogShots = true
        console.log("can't place shots here");
      } else {
        if (
          document
            .getElementById(cell + "salvo")
            .classList.contains("shotsDone")
        ) {
          this.dialogPositionShoted = true
          console.log("position already shoted");
        } else {
          if (this.salvosToSend.includes(cell)) {
            this.salvosToSend.splice(this.salvosToSend.indexOf(cell), 1);
            document.getElementById(cell + "salvo").classList.remove("shots");
          } else {
            let stateInt = this.getOneGame.state.Logic;
            if (stateInt == "VICTORY" || stateInt == "DEFEAT" || stateInt == "DRAW"){
              console.log("Game Over"); 
            }else{
            if (this.salvosToSend.length < 5) {
              document.getElementById(cell + "salvo").classList.add("shots");
              this.salvosToSend.push(cell);
              console.log(this.salvosToSend);
            } else {
              console.log("can't place more salvos");
              this.dialogPlaceSalvos = true
            }
            console.log(this.salvosToSend);
          }
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
    dialogTurn(value){
      if (!value) return; 
      setTimeout(() => {
        this.dialogTurn = false
      },2000 );
    },

     dialogDrop(value){
      if (!value) return; 
      setTimeout(() => {
        this.dialogDrop = false
      },2000 );
    },

     dialogShots(value){
      if (!value) return; 
      setTimeout(() => {
        this.dialogShots = false
      },2000 );
    },

     dialogPositionShoted(value){
      if (!value) return; 
      setTimeout(() => {
        this.dialogPositionShoted = false
      },2000 );
    },

     dialogPlaceSalvos(value){
      if (!value) return; 
      setTimeout(() => {
        this.dialogPlaceSalvos = false
      },2000 );
    },

    getOneGame() {
      let stateInt = this.getOneGame.state.Logic;
      console.log(stateInt);

      if (stateInt == "VICTORY" || stateInt == "DEFEAT" || stateInt == "DRAW") {
        clearInterval(this.fetchingInterval);
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
  border: 1px solid white;
  padding: 5px;
  font-size: 10px;
  text-align: center;
  height: 43px;
  width: 43px;
  color: white;
  font-weight: bold;
  
}

.gridItem {
  position: relative;
  display: inline-grid;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  padding: 5px;
  font-size: 10px;
color: white;
  height: 43px;
  width: 43px;
  font-weight:bold;
  
}
.flex {
  display: flex;
}

.DestroyerClass {
 
    background-image: url("../assets/Destroyer3.png");
    background-size: cover;
   
        width: 135.5px;
    height: 70.5px;
   
    top: -8px;
    left: -5px;
}
.DestroyerClass2 {
  width:  70.5px;
  background-image: url("../assets/Destroyer4.png");
  background-size: cover;
  height:135.5px;
     top: -5px;
    left: -7px;
}


.PatrolBoatClass {
  
   
    width: 85px;
    height: 53px;
    background-image: url(/img/PatrolBoat.9e9b68f7.png);
    background-size: cover;
    top: -6px;
   
}
.PatrolBoatClass2 {
  width: 53px;
  background-image: url("../assets/PatrolBoat2.png");
  background-size: cover;
  height: 85px;
      top: -1px;
    left: -7px;
}

.CarrierClass {
 
   background-image: url("../assets/Carrier.png");
   


        width: 208px;
    z-index: 1;
    height: 79.5px;
    
    background-size: cover;
    top: -27px;
    left: 5px;
}


.CarrierClass2 {
  width: 79.5px;
  background-image: url("../assets/Carrier2.png");
  z-index: 1;
  height: 209px;
  top: 4px;
   background-size: cover;
   left: -11px;
}

.SubmarineClass2 {
 
  background-image: url("../assets/Submarine.png");
  width:  97.5px;
    top: 5px;
    height:115.5px;
   
    background-size: cover;
    left: -29px;
}
.SubmarineClass {
 
  background-image: url("../assets/Submarine2.png");
 

   width: 115.5px;
    top: -29px;
    height: 97.5px;
    
    background-size: cover;
    left: 7px;
}
/* .Battleship {
  background: slateblue;
} */
.BattleshipClass {
 
  background-image: url("../assets/Battleship.png");
  
   left: -4px;
    width: 176.5px;
    z-index: 1;
    height: 64.5px;
   
    background-size: cover;
}
.BattleshipClass2 {
  width: 64.5px;
  background-image: url("../assets/Battleship2.png");
  z-index: 1;
  height: 176.5px;
  top: -4px;
   background-size: cover;
   left: -16px;
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
   text-decoration: line-through;
 
}
.visibility {
  z-index: 1;
}
.station{
  display: flex;
 
}
.grids{
  display: flex;
  justify-content: space-around;
  padding-bottom: 80px;
}
.boats{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  height: 300px;
  
}
.send{
  display: flex;
  justify-content: space-around;
}

.versus{
  display: flex;
  justify-content: center;
 padding-bottom: 40px;
 padding-top: 40px;
 color: white;
}
.station{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
  color: white;
}
.center{
  display: flex;
  justify-content: center
}
.sendLogic{
  display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 170px;
    color: white;
    text-align: center;
}
.boat{
  display: flex;
  justify-content: center;
  color: white;
}
.sendSalvos{
  display: flex;
  justify-content: center;
  color: white
}
.vs{
  width: 100px;
  display: flex;
  justify-content: center;

}
.game{
  background-image:  url("../assets/background1.jpg");
  background-size: cover;
}
.sendShips{
  margin-top: 30px
}
/* .PatrolBoat, .Destroyer, .Submarine, .Battleship, .Carrier{
  background: grey;
} */
</style>
