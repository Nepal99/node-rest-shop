
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');

router.get('/', (req,res,next) => {
   Order
   .find()
   .select('product quantity _id')
   .populate('product', ['name', 'price'])
   .exec()
   .then(docs => {
       console.log(docs);
       res.status(200).json({
           count : docs.length,
           orders : docs.map( doc => {
               return{
               _id : doc._id,
               product: doc.product,
               quantity : doc.quantity,
               request : {
                type : 'GET',
                url : 'http://localhost:3000/orders/'+doc._id
            }
            }

           })
           
       });
   })
   .catch(err => {
       res.status(500).json({
           error : err
       })
   })
});

router.post('/', (req,res,next) => {
    Product.findById(req.body.productId)
    .then( product => {
        if(!product){
            return res.status(404).json({
                message : 'Product Not Found in IF block'
            });
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product : req.body.productId
        });

        return order
        .save()
        
    })
    .then(result => {
        res.status(201).json({
            message : 'Order Created',
            CreatedOrder : {
                _id : result._id,
                quantity : result.quantity,
                product : result.product
            },
            request : {
                type : 'GET',
                url : 'http://localhost:3000/orders/'+result._id
            }
        });
    })
    .catch( err => {
        res.status(500).json({
            message : 'Product Not Found',
            error : err
        });
    }); 

   /*  const order = new Order({
        _id : mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product : req.body.productId
    });
    order
    .save()
    .then(result => {
        res.status(201).json({
            message : 'Order Created',
            CreatedOrder : {
                _id : result._id,
                quantity : result.quantity,
                product : result.product
            },
            request : {
                type : 'GET',
                url : 'http://localhost:3000/orders/'+result._id
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    }); */
});

router.get('/:orderId', (req,res,next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if(!order){
            return res.status(404).json({
                message : 'Order Not Found'
            })
        }
        res.status(200).json({
            order : order,
            request : {
                type : 'GET',
                url : 'http://localhost:3000/orders'
            }
        });
    })
    .catch( err => {
        res.status(500).json({
            message : 'Incorrect Order',
            error : err
        })
    })
  
    /* var idy = req.params.orderId;
     if(idy==='special'){
        res.status(200).json({
            message:'This is the Special order',
            id: idy
        });
    }else{
        res.status(200).json({
            message:'Order Details',
            id: idy
        });
    } */
});

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: 'Order updated'
    });
});

router.delete('/:orderId', (req,res,next) => {
   Order.remove({ _id: req.params.orderId})
   .exec()
   .then( result => {
       res.status(200).json({
        message : 'deleted',
        request : {
            type : 'POST',
            url : 'http://localhost:3000/orders',
            body : {
                prodcutId : 'ID',
                quantity: 'Number'
            }
        }
       })
   })
   .catch( err => {
    res.status(500).json({
        message : 'Incorrect Order',
        error : err
    })
})
});

module.exports = router;