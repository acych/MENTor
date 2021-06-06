const { allUsers } = require('./public/assets/src/users.js')

const express = require('express');
const bodyParser = require('body-parser');

var items = [];

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

var user="not-logged";

app.get("/",(req,res)=>{
  res.render('index',{Title:"MENTor",userName:user});
})

app.post("/",(req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  for (var aUser in allUsers){
    if (email==allUsers[aUser]["email"] && password==allUsers[aUser]["password"]){
      user=allUsers[aUser]["name"];
    }
  }
  res.redirect("/");
})

app.get("/logout",(req,res)=>{
  user="not-logged";
  res.redirect("/");
})

app.get("/signup",(req,res)=>{
  console.log("OAOAOAOA");
  res.render('signup',{Title:"Sign Up",userName:user});
})

app.listen(3000,()=>{
  console.log("Listening to port 3000");
})
