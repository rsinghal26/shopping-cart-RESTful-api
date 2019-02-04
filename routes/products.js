const express = require("express");
const Product = require("../models/product.js");
const router = express.Router();
const mongoose = require("mongoose");

router.get('/',(req, res, next)=>{
    
    Product.find()
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json({doc});    
        }else{
            res.status(404).json({message: "Data not found"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
});

router.get('/:productId',(req, res, next)=>{
    const _id = req.params.productId;
    console.log(_id);
    Product.findById(_id)
    .exec()
    .then(doc=>{
        console.log(doc);
        if(doc){
            res.status(200).json({doc});    
        }else{
            res.status(404).json({message: "Data not found"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
});

router.post('/',(req, res, next)=>{
    
    const product = new Product({
       _id:  new mongoose.Types.ObjectId(),
       name: req.body.name,
       price: req.body.price
    }); 
    
    product.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Product saved',
            currentProduct: product
        }); 
    }).catch(err=>{
       console.log(err);
       res.status(500).json({
           error: err
       });
    });
    
});


router.patch('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    const updateData = {};
    for(const data of req.body){
        updateData[data.propName] = data.value;
    }
    Product.updateOne({_id:id}, {$set:updateData})
    .exec().
    then(result=>{
        console.log(result);
        res.status(200).json({result});
    }).catch(err=>{
       res.status(500).json({error:err}); 
    });
});

router.delete('/:productId',(req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({result});
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
     
});

module.exports = router;