const express = require('express');
const bodyParser = require('body-parser');


// Mongoose  part, connection with the db
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin-aigli:admin12345@mentor.qls1x.mongodb.net/MENTorDB', { useUnifiedTopology: true });

//databases schemas
const activitySchema = new mongoose.Schema({
  title: String,
  location: String,
  date: String,
  time: String,
  img: String,
  details: String
})

const Activity = new mongoose.model("Activity", activitySchema);


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  surname: String,
  birthday: String,
  activities: [activitySchema]
})

const disorderSchema = new mongoose.Schema({
  title: String,
  info: String,
  details: String,
  img: String
})

const Disorder = new mongoose.model("Disorder", disorderSchema);



var activitiesTitle = [];
var activitiesLocation = [];
var activitiesDate = [];

const User = new mongoose.model("User", userSchema);

var items = [];
//setting express and ejs
const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

//initialising the userName in order to show that user isn't logged in
var userName="not-logged";

//sending the db activities' data to homepage
app.get("/",(req,res)=>{
  Activity.find(function(error,foundActivities){
    res.render('index',{Title:"MENTor",userName:userName,activityItems:foundActivities});
  });
})


//login
app.post("/logIn",(req,res)=>{
  User.findOne({email: req.body.email, password:req.body.password},function(err,person){
    userName = person.name;
    res.redirect("/");
  })
})

//logging out with redirecting to homepage and chnging userName to "not-logged"
app.get("/logout",(req,res)=>{
  userName="not-logged";
  res.redirect("/");
})

//render to signup page
app.get("/signup",(req,res)=>{
  res.render('signup',{Title:"Sign Up",userName:userName});
})

//render to mental-health page with sending db mental health data
app.get("/mentalHealth",(req,res)=>{
  Disorder.find(function(error,foundDisorders){
    res.render('mental-health',{Title:"Mental Health",userName:userName,disorderItems:foundDisorders});
  });
})

//showing the details of the selected activity in the activity details-page
app.get("/activity",(req,res)=>{
  Activity.findOne({ _id:req.query.id},function(error,foundActivity){
    res.render('activity-details',{Title:foundActivity.title,userName:userName,Activity:foundActivity});
  });
})

//when user presses join, this activity is added to the data of the array of his
//activities and renders to the page of all the activities that he will attend
app.get("/join",(req,res)=>{
  if (userName!="not-logged"){
        Activity.findOne({ _id:req.query.id},function(error,foundActivity){
            User.findOne({name:userName},function(error,foundUser){
              var flag=0;
              for(var x in foundUser.activities){
                if(foundUser.activities[x]._id.equals(foundActivity._id)){
                  flag=1;
                  res.render('my-activities',{Title:"My activities",Activities:foundUser.activities,userName:userName});
                }
              }
              if(flag==0){
                var activitiesArray = foundUser.activities;
                  activitiesArray.push(foundActivity);
                  User.updateOne({username:userName},{activities:activitiesArray},function(error){
                     foundUser.save();
                     res.render('my-activities',{Title:"My activities",Activities:foundUser.activities,userName:userName});
                   });
              }
            });
        });
  }else{
    res.render('login-page',{Title:"Login",userName:userName});
  }

})

//rendering the page where the user's activities will be shown
app.get("/mySeminars",(req,res)=>{
  User.findOne({name:userName},function(error,foundUser){
    res.render('my-activities',{Title:"My activities",Activities:foundUser.activities,userName:userName});
  })
})

//adding new member to the users' list
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

//making app Listening requests
app.listen(3000,()=>{
  console.log("Listening to port 3000");
})
