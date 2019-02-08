const mongoose = require("mongoose");
const Order = require("../models/order");
const Product = require("../models/product");
exports.get_your_orders = (req, res, next)=>{
    Order.find({buyer: req.userData.userId})
    .select("productId quantity _id buyer")
    .populate("productId", "_id name")
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            orders: docs.map(doc=>{
                return{
                    _id: doc._id,
                    productId: doc.productId,
                    quantity: doc.quantity,
                    buyer: doc.buyer,
                    request:{
                        type:"GET",
                        url:"https://localhost:3000/orders/"+ doc._id
                    }
                }; 
            })
        };
    
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
};

exports.get_a_order = (req, res, next)=>{
    const id = req.params.orderId;

    Order.find({_id: id, buyer:req.userData.userId})
    .select("productId quantity _id")
    .populate("productId")
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                order: doc,
                request:{
                    type:"GET",
                    url:"https://localhost:3000/orders"
                }
            }); 
        }else{
            res.status(404).json({message: "Order not found"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
};

exports.post_new_order = (req, res, next)=>{
    
    Product.findById(req.body.productId)
    .exec()
    .then(product=>{
        if(!product){
            return res.status(404).json({
                message: "Product not found"
                
            });
        }    
            
        const order = new Order({
            _id:  new mongoose.Types.ObjectId(),
            productId: req.body.productId,
            quantity: req.body.quantity,
            buyer: req.userData.userId
        });
        return order.save();
    }).then(result=>{
        res.status(201).json({
            message:"Order Stored",
            currentOrder:{
                _id: result._id,
                productId: result.productId,
                quantity: result.quantity
            },
            request:{
                type: "GET",
                url: "https://localhost:3000/orders/"+ result._id
            }
        });
    }).catch(err=>{
        res.status(500).json({error: err});
    });
};

exports.delete_order = (req, res, next)=>{
    const id = req.params.orderId;
    Product.remove({_id: id, buyer:req.userData.userId})
    .exec()
    .then(result=>{
    
        res.status(200).json({
            message:"Order deleted",
            request:{
                type:"POST",
                url:"https://localhost:3000/orders",
                data:{
                    productId:"ID",
                    quantity:"Number"
                }
            }
        });
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
     
};
