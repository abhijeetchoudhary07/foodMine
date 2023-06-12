const route = require('express');
const asyncHandler  = require('express-async-handler');
// import auth from '../middleWare/auth.mid';
const OrderModel = require('../models/order.model')
const OrderStatus = require('../constants/order_status')
const auth = require('../middleWare/auth.mid')
const jwt = require('jsonwebtoken');

const router = route();
router.use(auth);
// router.post('/create', asyncHandler(
//     async (req, res) => {
//             const requestOrder = req.body;

//     if(requestOrder.items.length <= 0){
//         console.log('400',requestOrder);
//         res.status(400).send("Cart is Empty!!");
//         return;
//     }
//     console.log(requestOrder);
//     await OrderModel.deleteOne({
//         user: req.user.id,
//         status: OrderStatus.NEW
//     });

//     const newOrder = new OrderModel({...requestOrder,user: req.user.id});
//     await newOrder.save();
//     res.status(200).send(newOrder);
   
// }
// ))

router.post('/create',
asyncHandler(async (req, res) => {
    const requestOrder = req.body;
    const token = req.headers.access_token;

    if(requestOrder.items.length <= 0){
        res.status(400).send('Cart Is Empty!');
        return;
    }
    // try {
    //     const decodedUser = jwt.verify(token, 'process.env.JWT_SECRET');
    //     req.user = decodedUser;

    // } catch (error) {
    //     res.status(401).send();
    // }
    // const decodedUser = jwt.verify(token, 'process.env.JWT_SECRET');
    // req.user = decodedUser;
console.log(req.user,req.body,'test data');
    await OrderModel.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW
    });

    const newOrder = new OrderModel({...requestOrder,user: req.user.id});
    await newOrder.save();
    res.send(newOrder);
})
)

router.get('/newOrderForCurrentUser', asyncHandler( async (req,res ) => {
    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(401).send();
}))

router.post('/pay', asyncHandler( async (req, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(401).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))


router.get('/track/:id', asyncHandler( async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

async function getNewOrderForCurrentUser(req) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}
module.exports = router

