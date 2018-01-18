const express = require('express');
const router = express.Router();

router.get('/', (req,res,next) => {
    res.status(200).json({
        message: 'Orders fetched'
    });
});

router.post('/', (req,res,next) => {
    res.status(201).json({
        message:'Order was created.'
    });
});

router.get('/:orderId', (req,res,next) => {
    var idy = req.params.orderId;
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
    }
});

router.patch('/:productId', (req,res,next) => {
    res.status(200).json({
        message: 'Order updated'
    });
});

router.delete('/:orderId', (req,res,next) => {
    res.status(200).json({
        message:'Order Deleted',
        orderId: req.params.orderId
    });
});

module.exports = router;