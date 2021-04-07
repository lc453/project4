<template>
<div class="admin">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Add an Adventurer</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <textarea v-model="description" placeholder="Adventurer Description" rows="1" cols="80"></textarea>
      <p></p>

      <input type="file" name="photo" @change="fileChanged">
      <button @click="upload">Upload</button>
    </div>
    <div class="upload" v-if="addAdventurer">
      <h2>{{addAdventurer.title}}</h2>
      <img :src="addAdventurer.path" />
    </div>
  </div>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete an Adventurer</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectAdventurer(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findAdventurer">
      <input v-model="findAdventurer.title">
      <p></p>
      <img :src="findAdventurer.path" />
    </div>
    <div class="actions" v-if="findAdventurer">
      <button @click="deleteAdventurer(findAdventurer)">Delete</button>
      <button @click="editAdventurer(findAdventurer)">Edit</button>
      <textarea v-model="findAdventurer.description" placeholder="Add Adventurer Description" rows="8" cols="80"></textarea>
    </div>
  </div>
</div>
</template>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

textarea {
  margin-left: 10px;
}

button {
  margin-bottom: 10px;
}
.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>

<script>
  import axios from 'axios';
  export default {
    name: 'Admin',
    data() {
      return {
        title: "",
        description: "",
        file: null,
        addAdventurer: null,
        adventurers: [],
        findTitle: "",
        findAdventurer: null,
      }
    },
    computed: {
      suggestions() {
        let adventurers = this.adventurers.filter(adventurer => adventurer.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
        return adventurers.sort((a, b) => a.title > b.title);
      }
    },
    created() {
      this.getAdventurers();
    },
    methods: {
      fileChanged(event) {
        this.file = event.target.files[0]
      },
      async upload() {
        try {
          const formData = new FormData();
          formData.append('photo', this.file, this.file.name)
          let r1 = await axios.post('/api/photos', formData);
          let r2 = await axios.post('/api/adventurers', {
            title: this.title,
            description: this.description,
            path: r1.data.path
          });
          this.addAdventurer = r2.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getAdventurers() {
        try {
          let response = await axios.get("/api/adventurers");
          this.adventurers = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      selectAdventurer(adventurer) {
        this.findTitle = "";
        this.findAdventurer = adventurer;
      },
      async deleteAdventurer(adventurer) {
        try {
          await axios.delete("/api/adventurers/" + adventurer._id);
          this.findAdventurer = null;
          this.getAdventurers();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editAdventurer(adventurer) {
        try {
          await axios.put("/api/adventurers/" + adventurer._id, {
            title: this.findAdventurer.title,
            description: this.findAdventurer.description,
          });
          this.findAdventurer = null;
          this.getAdventurers();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
    }
  }
</script>
