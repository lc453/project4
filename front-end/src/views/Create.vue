<template>
<div>
  <h1>Create an Adventurer:</h1>
  <div class="form">
    <form v-if="creating" @submit.prevent="addAdventurer">
      <label>Name:</label><br>
      <input v-model="name" placeholder="Name">
      <p></p>
      <label>Race:</label><br>
      <select v-model="race" name="race" id="race">
        <option value="Elf">Elf</option>
        <option value="Dwarf">Dwarf</option>
        <option value="Orc">Orc</option>
        <option value="Human">Human</option>
        <option value="Monster">Monster</option>
        <option value="Unknown">Unknown</option>
      </select>
      <p></p>
      <div class="stats">
        <div class="box">
          <label>Strength:</label>
          <select v-model="strength" name="strength" id="strength">
            <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
            <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
          </select>
        </div>
        <div class="box">
          <label>Agility:</label>
          <select v-model="agility" name="agility" id="agility">
            <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
            <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
          </select>
        </div>
        <div class="box">
          <label>Durability:</label>
          <select v-model="durability" name="durability" id="durability">
            <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
            <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
          </select>
        </div>
        <div class="box">
          <label>Intelligence:</label>
          <select v-model="intelligence" name="intelligence" id="intelligence">
            <option value=1>1</option><option value=2>2</option><option value=3>3</option><option value=4>4</option><option value=5>5</option><option value=6>6</option>
            <option value=7>7</option><option value=8>8</option><option value=9>9</option><option value=10>10</option><option value=11>11</option><option value=12>12</option>
          </select>
        </div>
      </div>
      <p></p>
      <label>Description:</label><br>
      <textarea v-model="description" placeholder="Description/Backstory"></textarea>
      <p></p>
      <label>Cost of services: </label>
      <input v-model="cost" type="number">
      <label> gold</label>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div v-else>
      <p>Adventurer created.</p>
      <p><a @click="toggleForm" href="#">Click here to create a new one.</a></p>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'create',
  data() {
    return {
      creating: true,
      name: '',
      description: '',
      race: '',
      strength: 0,
      agility: 0,
      durability: 0,
      intelligence: 0,
      cost: 0
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async addAdventurer() {
      try {
        await axios.post("/api/adventurers", {
          name: this.name,
          description: this.description,
          race: this.race,
          strength: this.strength,
          agility: this.agility,
          durability: this.durability,
          intelligence: this.intelligence,
          cost: this.cost
        });
        this.name = "";
        this.description = "";
        this.race = "";
        this.strength = 0;
        this.agility = 0;
        this.durability = 0;
        this.intelligence = 0;
        this.cost = 0;
        this.creating = false;
        return true;
      } catch (error) {
        console.log(error);
      }

    },
  }
}
</script>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
