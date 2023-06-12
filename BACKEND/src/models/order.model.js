const mongo = require('mongoose') 
const OrderStatus = require('../constants/order_status');
// export interface LatLng{
//     lat: string;
//     lng: string;
// }

const LatLngSchema = new mongo.Schema(
    {
        lat: {type: String, required: true},
        lng: {type: String, required: true},
    }
);

// export interface OrderItem{
//     food: Food;
//     price: number;
//     quantity: number;
// }

const FoodSchema =    [ {
    name: {type: String, required:true},
    price: {type: Number, required:true},
    tags: {type: [String]},
    favorite: {type: Boolean, default:false},
    stars: {type: Number, required:true},
    imageUrl: {type: String, required:true},
    origins: {type: [String], required:true},
    cookTime: {type: String, required:true}
},{
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    timestamps:true
}]
const OrderItemSchema = new mongo.Schema(
    {
        food:{type: FoodSchema, required: true},
        price:{ type: Number, required:true},
        quantity: {type: Number, required: true}
    }
);

// export interface Order{
//     id:string;
//     items: OrderItem[];
//     totalPrice:number;
//     name: string;
//     address: string;
//     addressLatLng:LatLng
//     paymentId: string;
//     status: OrderStatus;
//     user: Types.ObjectId;
//     createdAt: Date;
//     updatedAt: Date
//   }

  const orderSchema = new mongo.Schema({
      name: {type: String, required: true},
      address: {type: String, required: true},
      addressLatLng: {type: LatLngSchema, required: true},
      paymentId: {type: String},
      totalPrice: {type: Number, required: true},
      items: {type: [OrderItemSchema], required: true},
      status: {type: String, default: OrderStatus.NEW},
      user: {type: mongo.Schema.Types.ObjectId, required: true}
  },{
      timestamps: true,
      toJSON:{
          virtuals: true
      },
      toObject:{
          virtuals: true
      }
  });
  
const OrderModel = mongo.model('order', orderSchema);

module.exports = OrderModel;