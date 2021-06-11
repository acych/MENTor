const express = require('express');
const bodyParser = require('body-parser');

// Mongoose  part
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MENTorDB', { useUnifiedTopology: true });

const activitySchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
  time: String,
  img: String,
  details: String
})

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  birthday: String,
  activities: [Activity]
})

var activitiesTitle = [];
var activitiesLocation = [];
var activitiesDate = [];

const Activity = new mongoose.model("Activity", activitySchema);
const User = new mongoose.model("User", userSchema);

var items = [];

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

var userName="not-logged";

app.get("/",(req,res)=>{
  Activity.find(function(error,foundActivities){
    res.render('index',{Title:"MENTor",userName:userName,activityItems:foundActivities});
  });
})

app.post("/",(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  for (var aUser in allUsers){
    if (email==allUsers[aUser]["email"] && password==allUsers[aUser]["password"]){
      userName=allUsers[aUser]["name"];
    }
  }
  res.redirect("/");
})

app.get("/logout",(req,res)=>{
  userName="not-logged";
  res.redirect("/");
})

app.get("/signup",(req,res)=>{
  res.render('signup',{Title:"Sign Up",userName:userName});
})

app.post("/newMember",(req,res)=>{
  const newMember = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    birthday: req.body.birthday,
    activities: []
  })
  newMember.save();
  userName=req.body.name;
  res.redirect("/");
})

app.listen(3000,()=>{
  console.log("Listening to port 3000");
})
