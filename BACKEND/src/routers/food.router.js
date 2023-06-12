const route = require('express')
const foods_Data = require('../data');
const asyncHandler  = require('express-async-handler');
const FoodModel = require('../models/food.model');
const router = route();

router.get('/seed', asyncHandler(
   async (req,res)=>{
    const foodCount = await FoodModel.countDocuments();
    if(foodCount > 0){
        res.send("Seed is already done!");
        return;
    }
  await FoodModel.create(foods_Data.sample_foods);
    res.send('Seed Is Done!')
}))


router.get('/',asyncHandler(
 async   (req,res)=>{
        const foods = await FoodModel.find();
    res.send(foods);
}))

router.get('/search/:searchTerm',asyncHandler(
   async (req,res)=>{
 const searchRegex = new RegExp(req.params.searchTerm,'i')
const foods = await FoodModel.find({name : {$regex:searchRegex}});
        res.send(foods)
}))

router.get("/tag", asyncHandler(
    async (req, res) => {
      const tags = await FoodModel.aggregate([
        {
          $unwind:'$tags'
        },
        {
          $group:{
            _id: '$tags',
            count: {$sum: 1}
          }
        },
        {
          $project:{
            _id: 0,
            name:'$_id',
            count: '$count'
          }
        }
      ]).sort({count: -1});
  
      const all = {
        name : 'All',
        count: await FoodModel.countDocuments()
      }
  
      tags.unshift(all);
      res.send(tags);
    }
  ))
  

router.get('/tag/:tagName',asyncHandler(
   async  (req,res)=>{
       const tagName = req.params.tagName;
    const foods = await FoodModel.find({tags : tagName})
   res.send(foods)
}))

router.get('/:foodId',asyncHandler(
   async (req,res)=>{
    const foodId = req.params.foodId;
    const food = await  FoodModel.findById(foodId)

    // const foods = foods_Data.sample_foods.filter(food => food.id == foodId);

    res.send(food)
}));


module.exports = router