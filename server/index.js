const express = require('express')
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRouter = require('./routes/authRoute')
const foodRouter = require('./routes/foodRoute')
const contactRouter = require('./routes/contactRoute')
const carouselRouter = require('./routes/carouselRoute')
const orderRouter = require('./routes/orderRoute')

// env
const port = process.env.PORT;

// middlewares
app.use(cors())
app.use(express.json())

// mongodb connection
mongoose.connect(process.env.DATABASE, {
    serverSelectionTimeoutMS: 30000 
  })
const db = mongoose.connection;
db.on('error',(error)=>{console.error(error)})
db.once('open',() => {console.log("Database connection success")})

//routes 
app.use('/api/auth', authRouter)
app.use('/food', foodRouter)
app.use('/contact', contactRouter)
app.use('/carousel', carouselRouter)
app.use('/order', orderRouter)
app.use(express.static('public'))

app.listen(port,()=>{
    console.log(`server started at port ${port}`);
})