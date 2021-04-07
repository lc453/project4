<template>
  <div class="home">
    <h1>Available Adventurers:</h1>
    <section class="image-gallery">
      <div class="image" v-for="adventurer in adventurers" :key="adventurer.id">
        <h2>{{adventurer.name}} <em>({{adventurer.race}})</em></h2>
        <div class="stats item">
          <p>Strength: {{adventurer.strength}}</p>
          <p>Agility: {{adventurer.agility}}</p>
          <p>Durability: {{adventurer.durability}}</p>
          <p>Intelligence: {{adventurer.intelligence}}</p>
        </div>
        <p></p>
        <p>{{adventurer.description}}</p>
        <br>
        <p>Cost: {{adventurer.cost}} gold</p>
        <div v-if="$root.$data.party.includes(adventurer.id)">
          <button v-on:click="$root.$data.party.splice($root.$data.party.indexOf(adventurer),1); $root.$data.totalcost -= adventurer.cost" class="auto">Remove from Party</button>
        </div>
        <div v-else>
          <button v-on:click="$root.$data.party.push(adventurer); $root.$data.totalcost += adventurer.cost" class="auto">Add to Party</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
     adventurers: [],
     searchText: '',
     list: []
    }
  },
  created() {
    this.getAdventurers();
  },
  methods: {
    async getAdventurers() {
      try {
        let response = await axios.get("/api/adventurers");
        console.log(this.searchText);
        this.adventurers = response.data;
        console.log(this.adventurers);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    getList() {
      this.list = this.adventurers;
    }
  }
}
</script>
