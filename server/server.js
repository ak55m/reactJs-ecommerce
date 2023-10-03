import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import sellerRouter from "./Routes/SellerRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import Stripe from "stripe";


dotenv.config();




connectDatabase();
const app = express();

const stripe  = new Stripe(process.env.STRIPE_KEY);

const endpointSecret = "whsec_4d14568beb9ec0dc71a0fcb45bea5cdf736daf1bd0915940bd4de5e60130d161";


app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  let event = request.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'charge.succeeded':
      const charge = event.data.object;
      console.log(`The payment was charged!`)
      // Then define and call a function to handle the event charge.succeeded
      break;
      // ... handle other event types
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});



app.use(express.json());
app.use(express.urlencoded({ extended: true }));




// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/sellers", sellerRouter);
app.use("/api/orders", orderRouter);

app.post('/searchers', function(req, res) {
  const sss = req.body;
  console.log(sss)
  res.send("ok");

  console.log(sss);
});

app.get('/logout', function (req, res) {
  req.logout();
  req.session = null; 
  // res.redirect('/back/to/login');
});

app.post("/create-payment", async(req, res)=> {
  const { amount } = req.body;
  const actual = amount * 100;
  console.log(actual);  
  const { customer } = req.body;
  const customerName = customer;
  console.log(customerName);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: actual,
      currency: "usd",
      description: `order paid for by ${customerName}`,
      automatic_payment_methods: {
        enabled: true,
      },

      // customer_details: {
      //   email: customerName,
      // } 
    });

    console.log("the server:",paymentIntent.client_secret);
    // res.json({clientSecret: paymentIntent.client_secret});
    res.status(200).send(paymentIntent.client_secret);
    
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ statusCode: 500, message: e.message});
    }
});


// const calculateOrderAmount = (items) => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { items } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: calculateOrderAmount(items),
//     currency: "usd",
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// const endpointSecret = "whsec_4d14568beb9ec0dc71a0fcb45bea5cdf736daf1bd0915940bd4de5e60130d161";

// app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   const sig = request.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
//   } catch (err) {
//     response.status(400).send(`Webhook Error: ${err.message}`);
//     return;
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });



// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));