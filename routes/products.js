const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const uploadStorage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+file.originalname);
    }
});

const fileFielter = function(req, file, cb){
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jppeg')
        return cb(null, true);
    else
        return cb(null,false);
};

const upload = multer({
    storage:uploadStorage,
    fileFielter: fileFielter,
    limit:{
        filesize: 1024*1024*5
    }
});

router.get('/',(req, res, next)=>{
    
    Product.find()
    .select("name price _id productImage productSeller")
    .exec()
    .then(docs=>{
        const response = {
            count: docs.length,
            products: docs.map(doc=>{
                return{
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    sellerEmail: doc.productSeller.email,
                    request:{
                        type: "GET",
                        url:"https://api-project-rsinghal26.c9users.io/products/"+ doc._id
                    }
                };
            })
        };
        
        res.status(200).json(response);
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
    .select("name price _id productImage productSeller.email")
    .exec()
    .then(doc=>{
        if(doc){
            res.status(200).json({
                product:doc,
                request:{
                    type:"GET",
                    url:"https://api-project-rsinghal26.c9users.io/products"
                }
            }); 
        }else{
            res.status(404).json({message: "Data not found"});
        }
        
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({error:err});
    });
    
});

router.post('/', checkAuth, upload.single('productImage'),(req, res, next)=>{
    
    const productSeller = {
        id: req.userData.userId,
        email: req.userData.email
    };
    
    const product = new Product({
       _id:  new mongoose.Types.ObjectId(),
       name: req.body.name,
       price: req.body.price,
       productImage: req.file.path,
       productSeller: productSeller
    }); 
    
    product.save().then(result=>{
        res.status(201).json({
            message: 'Product saved',
            currentProduct: {
                name:result.name,
                price:result.price,
                _id: result._id
            },
            request:{
                type:"GET",
                url:"https://api-project-rsinghal26.c9users.io/products/"+ result._id
            }
        }); 
    }).catch(err=>{
       console.log(err);
       res.status(500).json({
           error: err
       });
    });
    
});


router.patch('/:productId',checkAuth,(req, res, next)=>{
    const id = req.params.productId;
    const updateData = {};
    for(const data of req.body){
        updateData[data.propName] = data.value;
    }
    Product.updateOne({_id:id}, {$set:updateData})
    .exec().
    then(result=>{
        res.status(200).json({
            message:"Changes has been done",
            request:{
                type:"GET",
                ulr:"https://api-project-rsinghal26.c9users.io/products/"+id
            }
        });
    }).catch(err=>{
       res.status(500).json({error:err}); 
    });
});

router.delete('/:productId', checkAuth,(req, res, next)=>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).json({
            message:"Product deleted",
            request:{
                type:"POST",
                url:"https://api-project-rsinghal26.c9users.io/products",
                data:{
                    name: "String",
                    price: "Number",
                    productImage: "String"
                }
            }
        });
    })
    .catch(err=>{
        res.status(500).json({error:err});
    });
     
});

module.exports = router;