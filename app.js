const express = require('express')
const app = express();
const port = Process.env.PORT || 8000;
const bodyParser = require("body-Parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mywebsite', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected");
});

const ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
  });

  const client = mongoose.model('client', ClientSchema);




const fs = require('fs')
const home = fs.readFileSync('index.html')
const about = fs.readFileSync('about.html')
const contact = fs.readFileSync('contact.html')
app.use('/static', express.static('static'))

app.get("/", (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.send(home);
});

app.get("/about", (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.send(about);
});

app.get("/contact", (req, res)=>{
    res.setHeader('Content-Type', 'text/html')
    res.send(contact);
});

app.post("/contact", (req, res)=>{
    var myData = new client(req.body);
    myData.save().then(()=>{
        // res.setHeader('Content-Type', 'text/html')
        res.send("Thanks for contacting")
    }).catch(()=>{
        res.status(400).send("sorry some error occured")
    })
    // res.send(home);
});



app.listen(port, (req, res)=>{
    console.log(`Your app has started on ${port}`)
});