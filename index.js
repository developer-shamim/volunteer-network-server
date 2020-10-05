const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4000

const app = express()

app.use(cors());
app.use(bodyParser.json());

const pass = "Volunteer2020";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteer:Volunteer2020@cluster0.ym542.mongodb.net/volunteer-network?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const bookings = client.db("volunteer-network").collection("registration");


 app.post('/register', (req, res) => {
     const newRegistration = req.body;
     bookings.insertOne(newRegistration)
     .then(result => {
        res.send(result.insertedCount > 0);
     })
     console.log(newRegistration);
 })


app.get('/bookings', (req, res) => {
  bookings.find({email: req.query.email})
  .toArray((err, documents) => {
    res.send(documents);
  })
})

});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port);