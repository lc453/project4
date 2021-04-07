<template>
  <div class="home">
    <h1>Sort adventurers by:</h1>
    <ul class="pure-menu-list">
      <li class="pure-menu-item"><a @click="select('Strength')" href="#" class="pure-menu-link">Strength</a></li>
      <li class="pure-menu-item"><a @click="select('Agility')" href="#" class="pure-menu-link">Agility</a></li>
      <li class="pure-menu-item"><a @click="select('Durability')" href="#" class="pure-menu-link">Durability</a></li>
      <li class="pure-menu-item"><a @click="select('Intelligence')" href="#" class="pure-menu-link">Intelligence</a></li>
      <li class="pure-menu-item"><a @click="select('Cost')" href="#" class="pure-menu-link">Cost</a></li>
    </ul>
    <section class="image-gallery">
      <div class="image" v-for="adventurer in adventurers" :key="adventurer.id">
        <h2>{{adventurer.name}} <em>({{adventurer.race}})</em></h2>
        <div class="stats">
          <p>Strength: {{adventurer.strength}}</p>
          <p>Agility: {{adventurer.agility}}</p>
          <p>Durability: {{adventurer.durability}}</p>
          <p>Intelligence: {{adventurer.intelligence}}</p>
        </div>
        <p>{{adventurer.description}}</p>
        <p>Cost: {{adventurer.cost}} gold</p>
        <div v-if="$root.$data.party.includes(adventurer.id)">
          <button v-on:click="$root.$data.party.splice($root.$data.party.indexOf(adventurer.id),1)" class="auto">Remove from Party</button>
        </div>
        <div v-else>
          <button v-on:click="$root.$data.party.push(adventurer.id)" class="auto">Add to Party</button>
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
     sortby: '',
    }
  },
  created() {
    this.getAdventurers();
  },
  methods: {
    async getAdventurers() {
      try {
        let response = await axios.get("/api/adventurers");
        console.log(this.sortby);
        if (this.sortby==='') {
          this.adventurers = response.data;
        }
        if (this.sortby==='Strength') {
          this.adventurers = response.data.sort((a, b) => a.strength < b.strength);
        }
        if (this.sortby==='Agility') {
          this.adventurers = response.data.sort((a, b) => a.agility < b.agility);
        }
        if (this.sortby==='Durability') {
          this.adventurers = response.data.sort((a, b) => a.durability < b.durability);
        }
        if (this.sortby==='Intelligence') {
          this.adventurers = response.data.sort((a, b) => a.intelligence < b.intelligence);
        }
        if (this.sortby==='Cost') {
          this.adventurers = response.data.sort((a, b) => a.cost > b.cost);
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    select(sortby) {
      this.sortby = sortby;
    }
  }
}
</script>
