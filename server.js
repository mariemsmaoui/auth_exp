require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
const initializePasswport =require('./passport-config');
const passport = require("passport");
app.use(express.json());
app.set('view-engine','ejs');
  //take form and build 
app.use(express.urlencoded({extended:false}));

const posts = [
  {
    username: "mike",
    title: "post 1",
  },
  {
    username: "sandy",
    title: "post 2",
  },
];

const users = [
  /* {
    name: "levi",
    password: "levi123",
  },
  {
    name: "hange",
    password: "hange123",
  }, */
];
app.get("/", (req, res) => {
    res.render('index.ejs',{name:" petra"});
  });

app.get("/login", (req, res) => {
    res.render('login.ejs');
  });
app.get("/register", (req, res) => {
    res.render('register.ejs');
  });
app.post("/login", (req, res) => {
   req.body.email
});
//register
app.post("/register", async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id:Date.now().toString(),
            name:req.body.email,
            password:hashedPassword

        })
        res.redirect('/login')
      } catch {
        res.redirect('/register')
      } 
    console.log(users)});


app.get("/users", (req, res) => {
  res.json(users);
});
app.post('/users', async (req, res) => {
  
  })
  app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.name)
    if (user == null) {
      return res.status(400).send('Cannot find user')
    }
    try {
      if(await bcrypt.compare(req.body.password, user.password)) {
        res.send('Success')
      } else {
        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })
app.get("/posts", (req, res) => {
  res.json(posts);
});
app.post("/login", (req, res) => {
  //authenticate user
  const username = req.body.username;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, nex) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split("")[1];
  //Bearer TOKEN
}
app.listen(3000);
