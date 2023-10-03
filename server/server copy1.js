import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
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
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
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
app.use("/api/orders", orderRouter);



const calculateOrderAmount = (amountz) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  // const i = 1000;
  const amounty  = 5000;
  console.log("cac", amounty)
  return amounty;
};

app.post("/create-payment-intent", async (req, res) => {
  // const { items } = req.body;
  const { amount } = req.body;
  const actual = amount * 100;
  console.log("amount from frontend:",amount); 
  console.log(calculateOrderAmount()); 

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    
    // amount: calculateOrderAmount(),
    amount: amount*100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    description: 'Any description about the payment',

  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});







// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));