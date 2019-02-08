const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const productController = require("../controllers/products");

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

router.get('/', productController.get_all_products);

router.get('/:productId', productController.get_a_product);

router.post('/', checkAuth, upload.single('productImage'),productController.post_new_product);

router.patch('/:productId',checkAuth,productController.update_a_product);

router.delete('/:productId', checkAuth,productController.delete_product);

module.exports = router;