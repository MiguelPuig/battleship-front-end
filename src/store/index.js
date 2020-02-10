import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Games: null,
    OneGame: [],
    LadderBoard: []
  },
  mutations: {
    set_games: (state, payload) => (state.Games = payload),
    set_oneGame: (state, payload) => (state.OneGame = payload),
    set_ladderBoard: (state, payload) => (state.LadderBoard = payload)
  },
  actions: {
    getAllGames(context) {
      fetch("/api/games", {
        credentials: "include",
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(games => {
          console.log(games);
          context.commit("set_games", games);
        })
        .catch(error => {
          console.log(error);
        });
    },

    actOneGame(context, gameId) {
      fetch("/api/game_view/" + gameId, {
        credentials: "include",
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(game => {
          console.log(game);
          context.commit("set_oneGame", game);
        })
        .catch(error => {
          console.log(error);
        });
    },
    actLadderBoard(context) {
      fetch("/api/ladderBoard", {
        credentials: "include",
        method: "GET"
      })
        .then(resp => {
          if (resp.ok) {
            return resp.json();
          }
          throw new Error("bad request");
        })
        .then(score => {
          console.log(score);
          context.commit("set_ladderBoard", score);
        })
        .catch(error => {
          console.log(error);
        });
    },

    actLogIn({ commit }, payload) {
      fetch("/api/login", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: getBody({ name: payload.userName, pwd: payload.password })
      })
        .then(function(data) {
          console.log("Request success: ", data);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
      function getBody(json) {
        var body = [];
        for (var key in json) {
          var encKey = encodeURIComponent(key);
          var encVal = encodeURIComponent(json[key]);
          body.push(encKey + "=" + encVal);
        }
        console.log(body.join("&"));
        return body.join("&");
      }
    },

    actLogOut() {
      fetch("/api/logout", {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
      })
        .then(function(data) {
          console.log("Request success: ", data);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },

    actRegister({ commit, dispatch }, payload) {
      fetch("/api/register", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then(function(data) {
          if (data.error) {
            console.log("Request failure: ", data);
          } else console.log("Request success: ", data);
          dispatch("actLogIn", payload);
        })
        .catch(function(error) {
          console.log("Request failure: ", error);
        });
    },
    actCreateGame() {
      fetch("/api/games", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(function(data) {
          if (data.error) {
            console.log("Error: ", data);
          } else console.log("New Game Created: ", data);
        })
        .catch(function(error) {
          console.log("Error: ", error);
        });
    },
    actJoinGame({ commit }, gameId) {
      fetch("/api/game/" + gameId + "/players", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      })
        .then(data => {
          console.log(JSON.stringify(data));
          return data.json();
        })
        .then(function(data) {
          if (data.error) {
            console.log("Error: ", data);
          } else console.log("New Game Joined: ", data);
          router.push(`/game/${data.gpId}`);
        })
        .catch(function(error) {
          console.log("Error: ", error);
        });
    },
    actPlaceShips({ commit, dispatch }, {gpId, ships}) {
      console.log(ships, gpId);
      
      fetch("/api/games/players/"+ gpId +"/ships", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body:JSON.stringify(ships)
      })
        .then(data => {
          console.log("data send", JSON.stringify(data));
          return data.json();
        })
        .then(data => {
          if (data.error) {
            console.log("Error", data);
          } else console.log("Success", data);
          dispatch("actOneGame", gpId);
        })
        .catch(error => {
          console.log("Error:", error);
        });
    },
    actPlaceSalvos({ commit, dispatch }, {gpId, salvos}) {
      console.log(salvos, gpId);
      
      fetch("/api/games/players/"+ gpId +"/salvos", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body:JSON.stringify(salvos)
      })
        .then(data => {
          console.log("data send", JSON.stringify(data));
          return data.json();
        })
        .then(data => {
          if (data.error) {
            console.log("Error", data);
          } else console.log("Success", data);
          dispatch("actOneGame", gpId);
        })
        .catch(error => {
          console.log("Error:", error);
        });
    }
  },
  getters: {
    getGames: state => state.Games,
    getOneGame: state => state.OneGame,
    getLadderBoard: state => state.LadderBoard
  },
  modules: {}
});
