const express = require('express');
const { createOrder, fetchOrderByUser, finalizeOrder, handleFailure, setStatusReceived, decreaseStock } = require('../controllers/Orders');
const { pendingOrders, receivedOrders } = require('../controllers/Products');
const router = express.Router();

router.post('/',createOrder)
      .get('/pending',pendingOrders)
      .get('/received',receivedOrders)
      .get('/:id',fetchOrderByUser)
      .post('/decrease_stock',decreaseStock)
      .post('/payment/success/:tranId',finalizeOrder)
      .post('/payment/failed/:tranId',handleFailure)
      .patch('/setToReceived/:id',setStatusReceived)


exports.router = router;