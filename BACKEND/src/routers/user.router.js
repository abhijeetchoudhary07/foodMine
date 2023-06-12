const route = require('express')
const foods_Data = require('../data');
const jwt = require('jsonwebtoken');
const asyncHandler  = require('express-async-handler');
const UserModel = require('../models/user.model');
const expressAsyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs')
const router = route();

router.get('/seed', asyncHandler(
    async (req,res)=>{
     const userCount = await UserModel.countDocuments();
     if(userCount > 0){
         res.send("Seed is already done!");
         return;
     }
   await UserModel.create(foods_Data.sample_users);
     res.send('Seed Is Done!')
 }))

router.post('/login',asyncHandler(
   async (req,res)=>{
    const {email , password } = req.body
    // const user = foods_Data.sample_users.find(user => user.email === email && user.password === password)
    // console.log(user,email,password);
  const user = await UserModel.findOne({email,password})
  console.log(user,'user data',email,password,UserModel.find()); 
  if(user){
        console.log(generateTokenReponse(user));
        res.send(generateTokenReponse(user))
    }else{
        res.status(400).send("User name or password is not valid.....!")
    }
}))

router.post('/register',asyncHandler(
    async (req,res) => {
        const {name , email, password, address} = req.body
        const user = await UserModel.findOne({email});

        if(user){
            res.status(400).send('User is already exist,Try with new Email');
            return;
        }

        const encryptedPassword = await bcrypt.hash(password,10);
        const newUser = {
            id: '',
            name,
            email: email.toLowerCase(),
            password:encryptedPassword,
            address,
            isAdmin: false
}
const dbUser = await UserModel.create(newUser);
res.send(generateTokenReponse(dbUser))
    }
))

const generateTokenReponse = (user) => {
    const token = jwt.sign({
      id: user.id, email:user.email, isAdmin: user.isAdmin
    },'process.env.JWT_SECRET',{
      expiresIn:"30d"
    });
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };
  }
module.exports = router