const Products = require("../models/Products");
const mongoose = require("mongoose");
const Users = require("../models/Users");
const SSLCommerzPayment = require('sslcommerz-lts');
const Address = require("../models/Address");
const Orders = require("../models/Orders");

const store_id = 'test668521c1c1916';
const store_passwd = 'test668521c1c1916@ssl';
const is_live = false; // true for live, false for sandbox



exports.decreaseStock = async (req, res) => {
    const { tranId } = req.body;  // Extract transaction ID from the request body

    try {
        console.log("Request body:", req.body);
        // Find the order using tranId
        const order = await Orders.findOne({ tranjectionId: tranId });

        if (!order) {
            return res.status(404).send(`Order with transaction ID ${tranId} not found`);
        }

        // Loop through each item in the order and decrease stock
        for (const item of order.items) {
            const productId = item.product.id;  // Assuming item has a 'product' field with 'id'
            const quantityToDecrease = item.quantity;

            // Find the product by its ID
            const product = await Products.findById(productId);

            if (!product) {
                return res.status(404).send(`Product with ID ${productId} not found`);
            }

            // Check if there's enough stock before decreasing
            if (product.stock < quantityToDecrease) {
                return res.status(400).send(`Not enough stock for product: ${product.title}`);
            }

            // Decrease the stock by the ordered quantity
            product.stock -= quantityToDecrease;

            // Save the updated product stock
            await product.save();

            console.log(`Stock decreased for product ${product.title}, new stock: ${product.stock}`);
        }

        res.status(200).send('Stock decreased successfully for all items.');

    } catch (err) {
        console.error('Error decreasing stock:', err);
        res.status(500).send('Internal server error');
    }
};


exports.createOrder = async (req, res) => {
    try {
        const { items,totalAmount,total_Item, status, user, selectedAddress } = req.body;
        const orderData = req.body;

        const person = await Users.findById(user);
        console.log(person);
        if (!person) {
            return res.status(404).send('User not found');
        }
        const address1 = await Address.findById(person?.addresses[0]);
        console.log(selectedAddress);
        const tran_id = new mongoose.Types.ObjectId().toString();



        const data = {
            total_amount: totalAmount,
            currency: 'BDT',
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: `https://ecommerce-project-gamma-seven.vercel.app/orders/payment/success/${tran_id}`,
            fail_url: `https://ecommerce-project-gamma-seven.vercel.app/orders/payment/failed/${tran_id}`,
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Mixed',
            product_category: 'Mixed',
            product_profile: 'general',
            cus_name: person.name,
            cus_email: person.email,
            cus_add1: address1.street+" "+address1.city+" "+address1.state+" "+address1.postalCode+" "+address1.country+" "+address1.phone,
            cus_postcode: address1.postalCode,
            cus_country: 'Bangladesh',
            cus_phone: address1.phone,
            cus_fax: '--',
            ship_name: person.name,
            ship_add1: selectedAddress.street+" "+selectedAddress.city+" "+selectedAddress.state+" "+selectedAddress.postalCode+" "+selectedAddress.country+" "+selectedAddress.phone,
            ship_city: selectedAddress.city,
            ship_state: selectedAddress.state,
            ship_postcode: selectedAddress.postalCode,
            ship_country: 'Bangladesh',
        };
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({url:GatewayPageURL});

            const finalOrder = {
                items,totalAmount,total_Item, status, user, selectedAddress,
                paidStatus:false,
                tranjectionId:tran_id
            }
            const order =  new Orders(finalOrder);
            order.save();
            console.log("new order = ",order);

            console.log('Redirecting to: ', GatewayPageURL)
        });

    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).send('Internal server error');
    }
};

exports.fetchOrderByUser = async (req, res) => {
    const {id} = req.params;
    console.log(id);
    try {
        const orders = await Orders.find({ user: id });
        console.log(orders);
        res.status(201).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
};


//payment..
exports.finalizeOrder = async(req,res)=>{
   const {tranId} = req.params;
   const result = await Orders.updateOne({tranjectionId: tranId},{$set:{paidStatus:true}});
   console.log(result.modifiedCount);
   if(result.modifiedCount>0){
      
      res.redirect(`http://localhost:3000/payment/success/${tranId}`);
   }
   console.log(tranId);
};

exports.handleFailure = async(req, res)=>{
    const {tranId} = req.params;
    const result= await Orders.deleteOne({tranjectionId:tranId});
    if(result.deletedCount>0){
        res.redirect(`http://localhost:3000/payment/failed/${tranId}`)
    }
}

exports.setStatusReceived = async (req, res) => {
    const { id } = req.params;
    console.log('.......', id);

    try {
        const result = await Orders.updateOne({ _id: id }, { $set: { status: 'received' } });
        console.log('...', result);

        if (result.modifiedCount === 1) {
            res.status(200).json({ message: 'Order status updated to received.' });
        } else {
            res.status(404).json({ message: 'Order not found or already updated.' });
        }
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'An error occurred while updating the order status.' });
    }
};
