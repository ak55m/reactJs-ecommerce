import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import Loading from "../components/LoadingError/Loading";
import { useSelector, useDispatch } from "react-redux";
import { getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import Message from "../components/LoadingError/Error";
import axios from "axios";

function CheckoutForm() {

    const stripe = useStripe();
    const elements = useElements();

    const [paying, setPaying] = useState(false);

    const dispatch = useDispatch();

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay,  success: successPay} = orderPay;

    const orderId = orderDetails.order._id;

    useEffect(() => {
    if (!order || successPay) {
    dispatch({ type: ORDER_PAY_RESET });
    dispatch(getOrderDetails(orderId));
    } 
    }, [dispatch, orderId, successPay, order]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };


    const configCardElement = {
        iconStyle: 'solid',
        style: {
          base: {
            fontSize: '18px'
          }
        },
        hidePostalCode: true
      };

    
      const [message, setMessage] = useState(null);
      const [isLoading, setIsLoading] = useState(false);
    
      useEffect(() => {
        if (!stripe) {
          return;
        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          "payment_intent_client_secret"
        );
    
        if (!clientSecret) {
          return;
        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
          switch (paymentIntent.status) {
            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;
          }
        });
      }, [stripe]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        setIsLoading(true);
    
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: `http://localhost:3000/order/${orderId}`,
          },
        });
    
        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred.");
        }
    
        setIsLoading(false);
      };
    
      return (
        <form id="payment-form" onSubmit={handleSubmit}>
            {message && <div id="payment-message">{message}</div>}

          <PaymentElement id="payment-element" /><br></br>
          <button disabled={isLoading || !stripe || !elements || order.isPaid || successPay || paying } id="submit">
            <span id="button-text">
              {isLoading ? "Processing" : "Pay"}
            </span>
          </button>
          {/* Show any error or success messages */}
        </form>
      );


   
}

export default CheckoutForm;