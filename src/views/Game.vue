<template>
  <div v-if="getOneGame.length != 0" class="game">
    <h1>Game Locations</h1>
    <div class="versus">
      <div>{{ getOneGame.games.gamePlayers[0].player.userName }}</div>
      <span>VS</span>
      <div v-if="getOneGame.games.gamePlayers.length > 1">
        <div>{{ getOneGame.games.gamePlayers[1].player.userName }}</div>
      </div>
      <div v-else>Waiting for opponent</div>
    </div>

    <!-- <div
    v-for=("shipName, index) in shipsToSend.type" :key="index" -->
    <div
      :id="shipName.type + 'shipName'"
      v-for="(shipName, index) in shipsToSend"
      :key="index"
    >
      {{ shipName.type }}
    </div>

    <div
      :class="
        shipOrientations['PatrolBoat'] ? 'PatrolBoatClass' : 'PatrolBoatClass2'
      "
      src="../assets/PatrolBoat.png"
      id="PatrolBoat"
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
      v-if="shipOrientations['Destroyer']"
      :class="
        shipOrientations['Destroyer'] ? 'DestroyerClass' : 'DestroyerClass2'
      "
      src="../assets/Destroyer3.png"
      id="Destroyer"
      class="DestroyerClass"
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
      v-else
      src="../assets/Destroyer4.png"
      id="Destroyer2"
      class="DestroyerClass2"
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
      v-if="shipOrientations['Submarine']"
      :class="
        shipOrientations['Submarine'] ? 'SubmarineClass' : 'SubmarineClass2'
      "
      src="../assets/Submarine.png"
      id="Submarine"
      class="SubmarineClass"
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
      v-else
      src="../assets/Submarine2.png"
      id="Submarine2"
      class="SubmarineClass2"
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
      v-if="shipOrientations['Battleship']"
      :class="
        shipOrientations['Battleship'] ? 'BattleshipClass' : 'BattleshipClass2'
      "
      src="../assets/Battleship.png"
      id="Battleship"
      class="BattleshipClass"
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
      v-else
      src="../assets/Battleship2.png"
      id="Battleship2"
      class="BattleshipClass2"
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
      v-if="shipOrientations['Carrier']"
      :class="
        shipOrientations['Carrier'] ? 'CarrierClass' : 'CarrierClass2'
      "
      src="../assets/Carrier.png"
      id="Carrier"
      class="CarrierClass"
      data-ship-length="5"
      data-ship-type="Carrier"
      :draggable="true"
      @dragstart="dragstart"
      @dragover.stop
      @click="turnShip($event, 'Carrier')"
    >
     CARRIER
    </div>

     <div
      v-else
      src="../assets/Carrier2.png"
      id="Carrier2"
      class="CarrierClass2"
      data-ship-length="5"
      data-ship-type="Carrier"
      :draggable="true"
      @dragstart="dragstart"
      @dragover.stop
      @click="turnShip($event, 'Carrier')"
    >
    CARRIER
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
      counter : 0,
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
      return this.$store.dispatch("actPlaceSalvos", {
        gpId: this.gameId,
        salvos: this.salvosToSend
      });
    },

    shipLocations(shipId, grid) {
      let ship = document.getElementById(shipId);
      console.log(ship);

      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      let newShipLocations = [];

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

      //   if (this.shipOrientations[ship.dataset.shipType]) {
      //     if (Number(ship.dataset.shipLength) + this.dataNum < 12) {
      //       for (let i = 0; i < ship.dataset.shipLength; i++) {
      //         newShipLocations.push(this.dataChar + (this.dataNum + i));
      //         document
      //           .getElementById(this.dataChar + (this.dataNum + i))
      //           .classList.add(ship.dataset.shipType);
      //       }
      //     } else {
      //       console.log("error horizontal orientation");
      //     }
      //   } else {
      //     if (
      //       Number(ship.dataset.shipLength) + this.dataChar.charCodeAt(0) <
      //       76
      //     ) {
      //       for (let i = 0; i < ship.dataset.shipLength; i++) {
      //         newShipLocations.push(this.dataChar.charCodeAt(0) + i);
      //         document
      //           .getElementById(
      //             String.fromCharCode(this.dataChar.charCodeAt(0) + i) +
      //               this.dataNum
      //           )
      //           .classList.add(ship.dataset.shipType);
      //       }
      //     } else {
      //       console.log("error vertical orientation");
      //     }
      //   }

      //   this.shipsToSend.forEach(shipToSend => {
      //     if (shipToSend.type == ship.dataset.shipType) {
      //       shipToSend.locations = newShipLocations;
      //       console.log(shipToSend.locations);
      //     }
      //   });
    },

    turnShip(event, name) {
      this.counter = 1
      let grid = event.target.offsetParent;
      let shipId = event.target.id;
      let char = grid.id.substring(0, 1);
      let num = Number(grid.id.substring(1));
      let ship = document.getElementById(shipId)     
      console.log(grid.id.length);
      console.log(char.charCodeAt(0));
      

      if (
        (
          Number(ship.dataset.shipLength) + num < 12 &&
          !this.shipOrientations[name]) ||
        (
          Number(ship.dataset.shipLength) + char.charCodeAt(0) < 76 &&
          this.shipOrientations[name])
      ) {
        
        this.shipOrientations[name] = !this.shipOrientations[name];

       
        if( this.checkFree(shipId, grid)){

          this.shipConditions(shipId, grid);
        } else{

           this.shipOrientations[name] = !this.shipOrientations[name];
        }
      }
      else{
        console.log("can't turn the ship here");
        
      }

      //   if (
      //     (this.dataTarget.id.length != 1 &&
      //       Number(this.dataShip.dataset.shipLength) + this.dataNum < 12 &&
      //       !this.shipOrientations[this.dataShip.dataset.shipType]) ||
      //     (this.dataTarget.id.length != 1 &&
      //       Number(this.dataShip.dataset.shipLength) +
      //         this.dataChar.charCodeAt(0) <
      //         76 &&
      //       this.shipOrientations[this.dataShip.dataset.shipType])
      //   ) {
      //     this.dataNum = Number(event.target.offsetParent.id.split("")[1]);
      //     this.dataChar = event.target.offsetParent.id.split("")[0];
      //     console.log(event.target);
      //     this.dataSpliceNum = event.target.offsetParent.id.split("");
      //     this.dataShip = document.getElementById(event.target.id);

      //     this.orientationShip(ship);
      //   } else {
      //     console.log("cant turn the ship");
      //   }
    },

    // removeShips() {
    //   let ship = this.dataShip;
    //   let shipColorCells = Array.from(
    //     document.getElementsByClassName(ship.dataset.shipType)
    //   );

    //   for (let i = 0; i < shipColorCells.length; i++) {
    //     shipColorCells[i].classList.remove(ship.dataset.shipType);
    //   }
    // },

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

        //   if (
        //     (this.dataTarget.id.length != 1 &&
        //       Number(this.dataShip.dataset.shipLength) + this.dataNum < 12 &&
        //       this.shipOrientations[this.dataShip.dataset.shipType]) ||
        //     (this.dataTarget.id.length != 1 &&
        //       Number(this.dataShip.dataset.shipLength) +
        //         this.dataChar.charCodeAt(0) <
        //         76 &&
        //       !this.shipOrientations[this.dataShip.dataset.shipType])
        //   ) {
        //     this.dataShip.style.position = "absolute";
        //     this.dataShip.style.display = "block";
        //     this.dataTarget.appendChild(this.dataShip);

        //     this.orientationShip();
        //   } else {
        //     console.log("error");
        //   }
        //   console.log(this.dataNewShipLocations);
        //   console.log(this.dataShip.dataset.shipLength);
      }
    },

    drop(e) {
      let shipId = e.dataTransfer.getData("ship_id");
      let grid = e.target;
      let ship = document.getElementById(shipId);

      console.log(shipId);
      console.log(ship);

      if(this.checkFree(shipId,grid)){
           this.shipConditions(shipId, grid);
      }else{
        console.log("can't drop here");
        
      }

    
     
      

     
    },

    checkFree(shipId, grid) {
    let ship = document.getElementById(shipId);
    let char = grid.id.substring(0, 1);
    let num = Number(grid.id.substring(1));
    let shipLocations = [];
    let equalizer = true
   
    
    for (let i = this.counter ; i < ship.dataset.shipLength; i++) {
      if (this.shipOrientations[ship.dataset.shipType]) {
        this.shipsToSend.forEach(shipToSend=>{
          if(shipToSend.locations.includes(char + (num +i))){
              console.log("can't turn ship here");
              equalizer = false
          }
        })
      }
      else{
        this.shipsToSend.forEach(shipToSend=>{
          if(shipToSend.locations.includes(String.fromCharCode(char.charCodeAt(0) + i) + num)){
            console.log("can't turn ship here");
            equalizer = false
            
          }
        })
        
          
      }

    }
     return equalizer;
    },

    dragstart(e) {
      var target = e.target;
      e.dataTransfer.setData("ship_id", target.id);
      this.counter = 0;
      
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
  },
  watch: {
    getOneGame() {
      setTimeout(() => {
        for (let i = 0; i < this.getOneGame.ships.length; i++) {
          let shipLoc = this.getOneGame.ships[i].location;
          let shipType = this.getOneGame.ships[i].type;
        

          console.log(shipLoc);
          console.log(shipType);

          for (let j = 0; j < shipLoc.length; j++) {
            this.positionShips.push(shipLoc[j]); //************* */
            this.positionShips.push(shipType[j]);
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

        for (let m = 0; m < this.getOneGame.opponentSalvoes.length; m++) {
          let salvoOppLoc = this.getOneGame.opponentSalvoes[m].location;

          console.log(salvoOppLoc);

          for (let n = 0; n < salvoOppLoc.length; n++) {
            this.positionOppSalvoes.push(salvoOppLoc[n]);
            document.getElementById(salvoOppLoc[n]).classList.add("shotsDone");
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

.Destroyer {
  background: grey;
}
.DestroyerClass {
   width: 124.5px;
  z-index: 1;
  height: 40.5px;
  background-color: grey;
}
.DestroyerClass2 {
 width: 40.5px;
  background-color: grey;
  z-index: 1;
  height: 124.5px;
  top: 0px;
}

.PatrolBoat {
  background: darkgreen;
}
.PatrolBoatClass {
  width: 83px;
  z-index: 1;
  height: 40.5px;
  background-color: darkgreen;
}
.PatrolBoatClass2 {
  width: 40.5px;
  background-color: darkgreen;
  z-index: 1;
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
.Submarine {
  background: yellow;
}
.SubmarineClass2 {
  width: 40.5px;
  background-color: yellow;
  z-index: 1;
  height: 83px;
  top: 0px;
}
.SubmarineClass {
   width: 124.5px;
  z-index: 1;
  height: 40.5px;
  background-color: yellow;

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
  background-color:slateblue;
  z-index: 1;
  height:166.5px;
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
</style>
