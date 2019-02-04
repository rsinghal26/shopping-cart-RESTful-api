const express = require("express");

const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
       message: 'GET order route' 
    }); 
});


router.get('/:orderId',(req, res, next)=>{
    const id = req.params.orderId;
    if(id == 'milk'){
        res.status(200).json({
            message: 'GET order route',
            id: id
        });    
    }
     
});


router.post('/',(req, res, next)=>{
    res.status(201).json({
       message: 'POST order route' 
    }); 
});

router.patch('/',(req, res, next)=>{
    res.status(201).json({
       message: 'UPDATE order route' 
    }); 
});

router.delete('/',(req, res, next)=>{
    res.status(200).json({
       message: 'DELETE order route' 
    }); 
});

module.exports = router;