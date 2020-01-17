import Vue from "vue";
Vue.use(require('vue-cookies'))
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import CharacterSelection from "./views/CharacterSelection.vue";
import HighScores from "./views/Highscores.vue";
import CreateCharacter from "./views/CreateCharacter.vue";
import Game from "./views/Game.vue";
import connectedPlayers from "./views/ConnectedPlayers.vue";
import { authGuard } from "./auth";

// es2015 module
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// set default config
Vue.$cookies.config('7d')

// set global cookie
Vue.$cookies.set('theme','default');
Vue.$cookies.set('hover-time','1s');

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: "/characterselection",
      name: "characterselection",
      component: CharacterSelection,
      beforeEnter: authGuard
    },
    {
      path: "/highscores",
      name: "highscores",
      component: HighScores
    },
    {
      path: "/createcharacter",
      name: "createcharacter",
      component: CreateCharacter,
      beforeEnter: authGuard
    },
    {
      path: "/game",
      name: "game",
      component: Game,
      beforeEnter: authGuard
    },
    {
      path: "/connectedplayers",
      name: "connectedplayers",
      component: connectedPlayers,
      beforeEnter: authGuard
    },
  ]
});

export default router;
