<template>
  <div>
    <h5>
      Current top 10 players:
    </h5>
    <br>

    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Power</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in JSON.parse(highscoresData)" :key="item">
        <tr>
        <td>{{ index + 1 }}</td>
        <td>{{ item.name  }}</td>
        <td>{{ item.power  }}</td>
        </tr>       
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
import discoveryService from "../discovery-service/Eureka-service.js";


export default {
  name: "highscores",
  data(){
        return{
          highscoresData: null,
          highScoresService: null
        }
    },
      mounted(){
       this.getHighscores()
    },
  components: {
  },
  methods:{
    async getHighscores(){
      discoveryService.getInstance("highscores-service").then(response => {
        axios
          .get(response.data + 'api/public/highscores/get/10')
          .then(response => (this.highscoresData = JSON.stringify(response.data)))
          .catch()
        
        return response.data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    background: #fff;
    border-spacing: 0;
    border: solid 0 #ddd;
    margin-bottom: 1.25rem;
    table-layout: auto;
}

tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
}

</style>
