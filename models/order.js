const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId:
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            required: true
        },
    quantity:{ type: "Number", default: 1 },
    buyer:{
              type: mongoose.Schema.Types.ObjectId, 
              ref: 'User',
        }
    
});

module.exports = mongoose.model("Order", orderSchema);