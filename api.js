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
const PORT = process.env.PORT || 3000;
app.listen(PORT,function(req,res){
    console.log("Listening")
})
