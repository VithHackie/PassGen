const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {Pool} = require('pg');
const { verifyPassword } = require('./password');

require("@dotenvx/dotenvx").config()

const pool = new Pool({
    user : process.env.DBUSER,
    host : process.env.DBHOST,
    password : process.env.DBPASSWORD,
    port : process.env.DBPORT,
    database : process.env.DBNAME
})

const customField = {
    usernameField : "email",
    passwordField : "password"

}

const verfyCallback = async (email, password, done) =>{
    try{

        const {rows} = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        
        const user = rows[0];
        if(!user){
            // console.log("email didnt match")
            return done(null, false, {message : "Not Registered"})
        }
        const match = verifyPassword(password, user.password)
        if(!match){
            // console.log("password didnt match")
            return done(null, false, {message : "Incorrect Password"})
        }
        return done(null, user)
    }catch(err){
        // console.log("Some Error")
        done(err)
    }
}
const strategy = new LocalStrategy(customField, verfyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    // console.log("Got The Id " + id)
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
        const user = rows[0];
        if (!user) {
            // console.log("User not found in DB during deserialization");
            return done(null, false, {message : "User Not in Database"});
        }
        // console.log("User Found " + user.name)
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});



