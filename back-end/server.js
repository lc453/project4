const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const adventurerSchema = new mongoose.Schema({
  name: String,
  description: String,
  race: String,
  strength: Number,
  agility: Number,
  durability: Number,
  intelligence: Number,
  cost: Number
});

// create a virtual paramter that turns the default _id field into id
adventurerSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

// Ensure virtual fields are serialised when we turn this into a JSON object
adventurerSchema.set('toJSON', {
  virtuals: true
});

// create a model for adventurers
const Adventurer = mongoose.model('Adventurer', adventurerSchema);

app.get('/api/adventurers', async (req, res) => {
  try {
    let adventurers = await Adventurer.find();
    res.send(adventurers);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/adventurers', async (req, res) => {
  const adventurer = new Adventurer({
    name: req.body.name,
    description: req.body.description,
    race: req.body.race,
    strength: req.body.strength,
    agility: req.body.agility,
    durability: req.body.durability,
    intelligence: req.body.intelligence,
    cost:req.body.cost
  });
  try {
    await adventurer.save();
    res.send(adventurer);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/adventurers/:id', async (req, res ) => {
  try {
    let adventurer = await Adventurer.findOne({
      _id: req.params.id
    });
    adventurer.name=req.body.name;
    adventurer.description=req.body.description;
    adventurer.race=req.body.race;
    adventurer.strength = req.body.strength;
    adventurer.agility = req.body.agility;
    adventurer.durability = req.body.durability;
    adventurer.intelligence = req.body.intelligence;
    adventurer.cost = req.body.cost;
    if (adventurer.name==="" || adventurer.name===null) {
      console.log("Frick you, I'm not falling for that again.");
      adventurer.name="Frick you, I'm not falling for that again.";
    }
    adventurer.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/adventurers/:id', async (req, res) => {
  try {
    await Adventurer.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
