const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const userRoutes = require("./routes/users");

mongoose.connect(
   "mongodb://localhost/shoppingCart",
   { useNewUrlParser: true }
);

app.use("/uploads",express.static('uploads'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers","Origin, X-Requested-with, Accept, Authorization");
   
   if(req.method == 'OPTIONS'){
       res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
       return res.status(200).json({});
   }
   
   next();
});

// Handle all routes-------------
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);

app.use((req, res, next)=>{
   const error  = new Error();
   error.status = 404;
   next(error);
});

app.use((error, req, res, next)=>{
   res.status(error.status || 500);
   res.json({
       error:{
            message: error.message    
       }
   });
});

module.exports = app;