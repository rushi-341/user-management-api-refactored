const express = require("express")
const app = express()
const dotenv = require("dotenv")
const cors = require("cors"); 
const userRoutes = require('./router/userRouter')
const initializeDatabase = require('./models/initDb')
initializeDatabase();
dotenv.config();
app.use(cors());
app.use(express.json());
app.listen(3000,function(req,res){
    console.log("Listening")
})