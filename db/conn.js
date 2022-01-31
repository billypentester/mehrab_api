const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.db_con

mongoose.connect(db, { 
    useUnifiedTopology: true
})
.then ( ()=> console.log("database connected") )
.catch ( (err)=> console.log("Database connection error") )

var conn = mongoose.connection;

module.exports = conn;