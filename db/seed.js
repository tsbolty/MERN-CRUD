let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/MERN", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let seedData = [
  {
    title: 'Test Title1',
    body: 'Test Body1'
  },
  {
    title: 'Test Title2',
    body: 'Test Body2'
  },
  {
    title: 'Test Title3',
    body: 'Test Body3'
  },
  {
    title: 'Test Title4',
    body: 'Test Body4'
  },
  {
    title: 'Test Title5',
    body: 'Test Body5'
  },
  {
    title: 'Test Title6',
    body: 'Test Body6'
  },
  {
    title: 'Test Title7',
    body: 'Test Body7'
  },
  {
    title: 'Test Title8',
    body: 'Test Body8'
  },
  {
    title: 'Test Title9',
    body: 'Test Body9'
  },
  {
    title: 'Test Title10',
    body: 'Test Body10'
  }
]

db.Test.deleteMany({})
  .then(() => db.Test.collection.insertMany(seedData))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });