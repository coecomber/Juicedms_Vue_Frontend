<template>
  <div class="container">
    <h5>Hi there, {{ $auth.user.name }}. Please select a character or 
      <a href="../createcharacter">
        <button type="button" class="btn btn-success">Create one</button>
      </a>
    </h5>
    </br>
  
        <div class="card-deck">
          <div class="card" v-for="(item, index) in JSON.parse(characters)" v-on:click="chooseCharMethod($event, item)" :key="item">
            <img src="http://217.101.44.31:8100/images/characterCard.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">Power: {{item.power}}
                </br>Gold: {{item.gold}}
                </br>Floor: {{item.floor}}
              </p>
            </div>
          </div> 
        </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import discoveryService from "../discovery-service/Eureka-service.js";

export default {
  name: "characterselection",
  data(){
    return {
      characters:null
    }
  },mounted(){
    this.getCharacters()
  }, methods:{
    chooseCharMethod: function(ev, i){
      $cookies.set('username',i.name);
      console.log($cookies.get('username'))
      this.$router.push('game') 
    },

    async getCharacters(){
      discoveryService.getInstance("character-service").then(response => {
        axios
          .get(response.data + 'api/public/characters/get/' + this.$auth.user.email )
          .then(response => (this.characters = JSON.stringify(response.data)))
          .catch()
        
        return response.data
      });
    }
  }
  
};
</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  max-width: 300px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 2px 16px;
}

</style>
