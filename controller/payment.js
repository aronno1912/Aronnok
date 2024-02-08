// const axios = require('axios');
const User = require("../models/user");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const SSLCommerzPayment = require('sslcommerz-lts');
const product = require('../models/product');
const store_id = 'aronn65c4e1445f6f7'
const store_passwd = 'aronn65c4e1445f6f7@ssl'
const is_live = false //true for live, false for sandbox
// // Function to generate Bkash token
// exports.getBkashToken = async (req, res) => {
//   try {
//     // Implement your logic to generate Bkash access token
//     // This involves making a POST request to Bkash token endpoint with your credentials
//     // Return the access token received from Bkash
//     const accessToken = await generateAccessToken();

//     res.status(200).json({ accessToken });
//   } catch (error) {
//     console.error('Error generating Bkash token:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Function to process Bkash payment
// exports.processBkashPayment = async (req, res) => {
//   try {
//     // Extract payment details from the request body
//     const { paymentMethodNonce, amount } = req.body;

//     // Implement your logic to handle Bkash payment
//     // This involves making a request to the Bkash API to create a payment link
//     const paymentUrl = await generateBkashPaymentLink(amount); // Replace with actual Bkash API call

//     // Redirect the user to the Bkash payment URL
//     if (paymentUrl) {
//       res.redirect(paymentUrl);
//     } else {
//       res.status(500).json({ error: 'Failed to generate Bkash payment link' });
//     }
//   } catch (error) {
//     console.error('Error processing Bkash payment:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Function to generate Bkash payment link
// const generateBkashPaymentLink = async (amount) => {
//   try {
//     const currency = 'BDT'; // Bangladeshi Taka
//     const intent = 'sale';

//     const paymentRequest = {
//       amount,
//       currency,
//       intent,
//       merchantInvoiceNumber: 'invoice123', // Replace with your invoice number
//       paymentReference: 'ref123', // Replace with your payment reference
//       productCategory: 'general', // Replace with your product category
//     };

//     const { data } = await axios.post('https://checkout.sandbox.bka.sh/v1.0/payment/create', paymentRequest, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + await generateAccessToken(),
//       },
//     });

//     return data && data.payment && data.payment.paymentURL;
//   } catch (error) {
//     console.error('Error generating Bkash payment link:', error);
//     throw error;
//   }
// };

// // Function to handle Bkash callback
// exports.handleBkashCallback = (req, res) => {
//   // Handle callback from Bkash after payment completion
//   const paymentID = req.query.paymentID;
//   const payerID = req.query.payerID;

//   // Perform necessary actions (e.g., update order status) based on payment completion

//   res.send('Payment completed successfully');
// };

// // Function to generate Bkash access token
// const generateAccessToken = async () => {
//   // Implement your logic to generate Bkash access token
//   // This involves making a POST request to Bkash token endpoint with your credentials
//   // Return the access token received from Bkash

//   try {
//     const response = await axios.post('BkashTokenEndpoint', {
//       // Include your Bkash credentials
//       merchantId: 'your_merchant_id',
//       username: 'your_username',
//       password: 'your_password',
//       appKey: 'your_app_key',
//     });

//     return response.data.access_token;
//   } catch (error) {
//     console.error('Error generating Bkash access token:', error);
//     throw error;
//   }
// };
const tran_id=new ObjectId().toString();
exports.payment = async (req, res) => {
  const order=req.order;
  const user=await User.findById(order.user);
  const data = {
    total_amount: order.amount,
    currency: 'BDT',
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:8000/api/payment/success/${tran_id}`,
    fail_url: `http://localhost:8000/api/payment/fail/${tran_id}`,
    cancel_url: 'http://localhost:8000/cancel',
    ipn_url: 'http://localhost:8000/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: user.username,
    cus_email: user.email,
    cus_add1: order.address,
    cus_add2: user.present_addr,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01627694085',
    cus_fax: '01711111111',
    ship_name: user.username,
    ship_add1: order.address,
    ship_add2: user.present_addr,
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
  };
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL
    // console.log(GatewayPageURL)
    // res.redirect(GatewayPageURL)
    res.status(200).json({"url": GatewayPageURL})
    // console.log('Redirecting to: ', GatewayPageURL)
  });
};

exports.success = async (req, res) => {

  // res.status(200).json({"message": `${req.params.transId} is successful`});
  // console.log(`${req.params.transId} is successful`);
  res.redirect(`http://localhost:3000/payment/success/${req.params.transId}`);
};

exports.fail = async (req, res) => {
  // res.status(400).json({"message": `${req.params.transId} has failed`});
  // console.log(`${req.params.transId} has failed`)
  res.redirect(`http://localhost:3000/payment/fail/${req.params.transId}`);
};