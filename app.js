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

// const disorder = new Disorder({
//   title: "Bipolar affective disorder",
//   info: "Bipolar affective disorder is a type of mood disorder, previously referred to as ‘manic depression’. A person with bipolar disorder experiences episodes of mania (elation) and depression. The person may or may not experience psychotic symptoms. The exact cause is unknown, but a genetic predisposition has been clearly established. Environmental stressors can also trigger episodes of this mental illness.",
//   details: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/bipolar-disorder",
//   img: "bipolar.jpg"
// });

// disorder.save();

// const disorder = new Disorder({
//   title: "Obsessive compulsive disorder",
//   info: "Obsessive compulsive disorder (OCD) is an anxiety disorder. Obsessions are recurrent thoughts, images or impulses that are intrusive and unwanted. Compulsions are time-consuming and distressing repetitive rituals. Ttreatments include cognitive behaviour therapy (CBT), and medications.",
//   details: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/obsessive-compulsive-disorder",
//   img: "ocd.jpg"
// });

// const disorder = new Disorder({
//   title: "Behavioural and emotional disorders in children",
//   info: "Common behaviour disorders in children include oppositional defiant disorder (ODD), conduct disorder (CD) and attention deficit hyperactivity disorder (ADHD). Treatment for these mental health disorders can include therapy, education and medication.",
//   details: "https://www.betterhealth.vic.gov.au/health/healthyliving/behavioural-disorders-in-children",
//   img: "behavioural.jpg"
// });

// const disorder = new Disorder({
//   title: "Eating disorders",
//   info: "Eating disorders include anorexia, bulimia nervosa and other binge eating disorders. Eating disorders affect females and males and can have serious psychological and physical consequences.",
//   details: "https://www.betterhealth.vic.gov.au/health/healthyliving/eating-disorders",
//   img: "eating.jpg"
// });

// const disorder = new Disorder({
//   title: "Eating disorders",
//   info: "Eating disorders include anorexia, bulimia nervosa and other binge eating disorders. Eating disorders affect females and males and can have serious psychological and physical consequences.",
//   details: "https://www.betterhealth.vic.gov.au/health/healthyliving/eating-disorders",
//   img: "eating.jpg"
// });


// const disorder = new Disorder({
//   title: "Schizophrenia",
//   info: "Schizophrenia is a complex psychotic disorder characterised by disruptions to thinking and emotions, and a distorted perception of reality. Symptoms of schizophrenia vary widely but may include hallucinations, delusions, thought disorder, social withdrawal, lack of motivation and impaired thinking and memory. People with schizophrenia have a high risk of suicide. Schizophrenia is not a split personality.",
//   details: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/schizophrenia",
//   img: "schizophrenia.jpg"
// });

// const disorder = new Disorder({
//   title: "Schizophrenia",
//   info: "Schizophrenia is a complex psychotic disorder characterised by disruptions to thinking and emotions, and a distorted perception of reality. Symptoms of schizophrenia vary widely but may include hallucinations, delusions, thought disorder, social withdrawal, lack of motivation and impaired thinking and memory. People with schizophrenia have a high risk of suicide. Schizophrenia is not a split personality.",
//   details: "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/schizophrenia",
//   img: "schizophrenia.jpg"
// });






var activitiesTitle = [];
var activitiesLocation = [];
var activitiesDate = [];

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
  User.findOne({ email: req.body.email,  password: req.body.password},function (err, person) {
  if (err) return handleError(err);
  userName=person.name;
})
  res.redirect("/");
})

app.get("/logout",(req,res)=>{
  userName="not-logged";
  res.redirect("/");
})

app.get("/signup",(req,res)=>{
  res.render('signup',{Title:"Sign Up",userName:userName});
})

app.get("/mentalHealth",(req,res)=>{
  Disorder.find(function(error,foundDisorders){
    res.render('mental-health',{Title:"Mental Health",userName:userName,disorderItems:foundDisorders});
  });
})


app.get("/activity",(req,res)=>{
  Activity.findOne({ _id:req.query.id},function(error,foundActivity){
    res.render('activity-details',{Title:foundActivity.title,userName:userName,Activity:foundActivity});
  });
})

app.get("/join",(req,res)=>{
  if (userName!="not-logged"){

      // User.findOne({username:userName},function(error,foundUser){
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
