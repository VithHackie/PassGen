const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const passport = require("passport");
const session = require("express-session");
const { genPassword } = require("./config/password");
const aes = require('aes256');
require("@dotenvx/dotenvx").config()
const PostgresStore = require("connect-pg-simple")(session);

const app = express();

const dbUser = process.env.DBUSER;
const dbPassword = process.env.DBPASSWORD;
const dbHost = process.env.DBHOST;
const dbPort = process.env.DBPORT;
const dbName = process.env.DBNAME;

const encodedUser = encodeURIComponent(dbUser);
const encodedPassword = encodeURIComponent(dbPassword);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const pool = new Pool({
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  user: process.env.DBUSER,
  database: process.env.DBNAME,
  password: process.env.DBPASSWORD,
});

const sessionStore = new PostgresStore({
  conString: `postgres://${encodedUser}:${encodedPassword}@${dbHost}:${dbPort}/${dbName}`,
  tableName: "sessions",
  schemaName: "public",
  createTableIfMissing: true,
});

app.use(
  session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.get("/api/user", (req, res) => {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.json({ user: req.user });
  } else {
    res.json({ user : "NotLoggedIn" });
  }
})

app.post("/downloadFile", async (req, res)=>{
  const {DATA, userId} = req.body
  const findUser = await pool.query("SELECT privatekey, email FROM users WHERE (id=$1)", [userId])
  let key = await findUser.rows[0].privatekey
  
  key = aes.decrypt(await findUser.rows[0].email, key)

  console.log("Key - " + key)
  const eData = aes.encrypt(key, JSON.stringify(DATA))
  const dData = aes.decrypt(key, eData)
  
  console.log("eData - " + eData)
  console.log("dData - " + dData)
  res.send(eData + "\n")
})

app.post("/uk", async (req, res, next)=>{
  const {userId, passwords} = req.body
  if(userId == undefined){
    res.json("NotFound")
    next()
  }
  try{
    const findUser = await pool.query("SELECT email, privatekey FROM users WHERE id=$1", [userId])
    let key = await findUser.rows[0].privatekey
    let dPasses = []
    key = aes.decrypt(await findUser.rows[0].email, key)
    passwords.forEach(element => {
      element = aes.decrypt(key, element)
      JSON.parse(element)
      dPasses.push(element)
      console.log(element)
    }); 
    console.log(dPasses)
    res.json(dPasses)
  }catch(e){
    console.log(e)
  }
})

app.post("/logout", (req, res, next)=>{
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
})

app.post("/newuser", async (req, res) => {
  // console.log(req.session);
  const { userData } = req.body;
  console.log(userData);
  const findUser = await pool.query("SELECT * FROM  users WHERE (email=$1)", [
    userData.email,
  ]);
  if (findUser.rowCount == 0) {
    const pass = await genPassword(userData.password)
    const key = aes.encrypt(userData.email, userData.privateKey)
    await pool.query(
      "INSERT INTO users (username, email, gender, country, password, privatekey) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        userData.name,
        userData.email,
        userData.gender,
        userData.country,
        pass,
        key,
      ]
    );
  } else {
    res.json({ msg: "User Exist" });
    return;
  }
  res.json({ msg: "Done" });
});

app.post("/enterin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) console.log("error - " + err);
    if (!user) {
      return res.json({ msg: info.message });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.save((err) => {
        if (err) return next(err);
        return res.json({
          msg: { id: user.id, username: user.username },
        });
      });
    });
  })(req, res, next);
});

app.listen(5000, (e) => {
  if (e) console.error(e);
  else console.log("SERVER IS RUNNING !!!", process.env.DBUSER);
});
