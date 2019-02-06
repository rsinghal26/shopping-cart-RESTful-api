const express = require("express");
const Order = require("../models/order");
const Product = require("../models/product");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

router.get('/', checkAuth,(req, res, next)=>{
    Order.find()
    .select("productId quantity _id")
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
                    request:{
                        type:"GET",
                        url:"https://api-project-rsinghal26.c9users.io/orders/"+ doc._id
                    }
                }; 
            })
        };
    
        res.status(200).json({response});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
    
});

router.get('/:orderId', checkAuth,(req, res, next)=>{
    const _id = req.params.orderId;

    Order.findById(_id)
    .select("productId quantity _id")
    .populate("productId")
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                order: doc,
                request:{
                    type:"GET",
                    url:"https://api-project-rsinghal26.c9users.io/orders"
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
    
});

router.post('/', checkAuth,(req, res, next)=>{
    
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
            quantity: req.body.quantity
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
                url: "https://api-project-rsinghal26.c9users.io/orders/"+ result._id
            }
        });
    }).catch(err=>{
        res.status(500).json({error: err});
    });
});

router.delete('/:orderId', checkAuth, (req, res, next)=>{
    const id = req.params.orderId;
    Product.remove({_id: id})
    .exec()
    .then(result=>{
    
        res.status(200).json({
            message:"Order deleted",
            request:{
                type:"POST",
                url:"https://api-project-rsinghal26.c9users.io/orders",
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
     
});

module.exports = router;