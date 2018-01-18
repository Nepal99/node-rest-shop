const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message:'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /products'
    });
});

router.get('/:productId', (req,res,next) => {
    const idx = req.params.productId;
    if(idx === 'special'){
        res.status(200).json({
            message: 'You discovered the special ID',
            id: idx
        });
    }else{
        res.status(200).json({
            message : 'You passed an ID'

        });
    }
});

router.patch('/:productId',(req,res,next) => {
    res.status(200).json({
        message: 'Product Updated'
    })
})

router.delete('/:productId', (req,res,next) => {
    res.status(200).json({
        message : 'Product Deleted!'
    })
})



module.exports = router;