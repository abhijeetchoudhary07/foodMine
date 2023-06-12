// import express from 'express';
const express = require('express')
const dotenv = require('dotenv')
dotenv.config();

const dbConnect = require('./configs/database.config');
dbConnect();
// import cros from 'cros';
// const cros = require('cros')
const foods_Data = require('./data');
const jwt = require('jsonwebtoken');
const app = express();
var cors = require("cors");
const foodRouter = require('./routers/food.router');
const userRouter = require('./routers/user.router');
const orderRouter = require('./routers/order.router');
app.use(cors());
app.use(express.json())

app.use("/api/food",foodRouter);
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter);
// app.use(cros({
//      Credential:true,
//      origin:['http://localhost:4200']
// }))


// app.get('/api/food',(req,res)=>{
//     res.send(foods_Data.sample_foods)
// })

// app.get('/api/food/search/:searchTerm',(req,res)=>{
//     const searchTerm = req.params.searchTerm;
//     console.log(foods_Data,'sample_foods');
    
//     const foods = foods_Data.sample_foods.filter(food =>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
//     res.send(foods)
// })

// app.get('/api/food/tag',(req,res)=>{
//     res.send(foods_Data.sample_tags)
// })

// app.get('/api/food/tag/:tagName',(req,res)=>{
//    const tagName = req.params.tagName;
//    const foods = foods_Data.sample_foods.filter(food => food.tags?.includes(tagName));
//    res.send(foods)
// })

// app.get('/api/food/:foodId',(req,res)=>{
//     const foodId = req.params.foodId;
//     const foods = foods_Data.sample_foods.filter(food => food.id == foodId);
//     res.send(foods)
// })

// app.post('/api/users/login',(req,res)=>{
//     console.log(req,req.body);
//    const {email , password } = req.body
//    const user = foods_Data.sample_users.find(user => email === email && user.password === password)
//     if(user){
//         res.send(generateTokenResponse(user))
//     }else{
//         res.status(400).send("User name or password is not valid.....!")
//     }
// })

// const generateTokenResponse = (user)=>{
//     const token = jwt.sign({
//         email:user.email,isAdmin:user.isAdmin 
//     },"security test",{
//         expiresIn:"2d"
//     });

//     user.token = token;
//     return user
// }

const port = 4000;

app.listen(port,()=>{
    console.log('Listing port no'+port);
})

console.log('ts file');
