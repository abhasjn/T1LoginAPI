// Importing 
const mongoose= require("mongoose")
const express= require("express")
const bodyParser= require('body-parser')
const cookieParser = require("cookie-parser")
const cors= require("cors")

require("dotenv").config();


// Instantiating express and assigning app variable to it.
const app= express()

// DataBase Connection
mongoose.connect(process.env.DATABASE, {
    // Passing the settings required.
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DataBase Connected");
}).catch(()=>{
    console.log("UNABLE to connect to the Database");
})
// then and catch function to check whether the database is connected or not.

// Use Parsing Middleware
app.use(bodyParser.json()) 
app.use(cookieParser())
app.use(cors())

// Import the Routes
const userRoutes= require("./routes/user")

// Using Routes
app.use('/api',userRoutes) //=localhost:5000/api/signin


// Getting the port from .env or using 8000 if not available in .env .
const port = process.env.PORT || 8000

// Starting a Server
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})

