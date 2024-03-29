const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/authRoute')

// env
const port = process.env.PORT;

// middlewares
app.use(cors())
app.use(express.json())

// mongodb connection
mongoose.connect(process.env.DATABASE)
const db = mongoose.connection;
db.on('error',(error)=>{console.error(error)})
db.once('open',() => {console.log("Database connection success")})

//routes 
app.use('/api/auth', authRouter)

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})