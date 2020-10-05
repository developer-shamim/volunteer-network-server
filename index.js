const express = require('express')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000

const app = express()

app.use(cors());
app.use(bodyParser.json());

const pass = "Volunteer2020";



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ym542.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookingsCollection = client.db("volunteer-network").collection("registration");


 app.post('/register', (req, res) => {
     const newRegistration = req.body;
     bookingsCollection.insertOne(newRegistration)
     .then(result => {
        res.send(result.insertedCount);
     })
     console.log(newRegistration);
 })


app.get('/events', (req, res) => {
  bookingsCollection.find({email: req.query.email})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT|| port);