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
    


    async function handlePay(e) {

        e.preventDefault();
        if (!stripe || !elements || !order) {
            return;
        }
        setPaying(true);

        const  data  = await axios.post("/create-payment", {
            amount: orderDetails.order.totalPrice,
            currency: "usd", 
            paymentMethodType: "card",
            customer: order.user.name,

        })
        console.log("the frontend", data.data);
        // alert("Payment Success");




        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(data.data, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });
        setPaying(false);

        if (paymentIntent.status === 'succeeded') {
            successPaymentHandler();
            // alert("Good job");
        }
        if (paymentIntent.status === 'failed') {
            window.location.reload();
        }
    }

    return (
            <form onSubmit={handlePay} >
            <h5 className="mb-3">
                <i className="fas fa-lock" ></i>
                <strong> Powered by Stripe:</strong>
            </h5>
            <div className="stripe-payment">
                <CardElement options={configCardElement}/>
                {loadingPay && <Loading />}
                <button className="stripe-payment mt-3" type="submit" disabled={order.isPaid || paying || successPay || !stripe || order.isCancelled}>
                    {paying ? "Processing..." : "Pay"}
                </button>
            </div>
            </form>

    );
}

export default CheckoutForm;