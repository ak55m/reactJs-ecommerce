import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { cancelOrder, getOrderDetails, payOrder } from "../Redux/Actions/OrderActions";
import Loading from "../components/LoadingError/Loading";
import Message from "../components/LoadingError/Error";
import moment from "moment";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
import CheckoutForm from "./StripeScreen copy1";
import axios from "axios";

const publishableKey = "pk_test_51LOpH0BJ15A7rbveTyvffSGxwwjfS9Ac26tCajc9hdHFOzflD9GFf2zkHRtkW6o7meUES9b5ZI7WZy2JNlUqNoUC00RXw55QFY"

const stripePromise = loadStripe(publishableKey)

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);

  const orderId = match.params.id;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay,  success: successPay} = orderPay;


  const orderCancel = useSelector((state) => state.orderCancel);
  const { loading: loadingCancelled, success: successCancelled } = orderCancel;


  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

  }

  const frontEndamount = orderDetails;
  console.log("yessir",frontEndamount.order);
  console.log("yessir2",frontEndamount.totalPrice);




  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successCancelled]);

  const cancelHandler = () => {
    dispatch(cancelOrder(order));
  };
  
  const [clientSecret, setClientSecret] = useState("");
  const ba = orderDetails.order;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] 
      ,amount: 100,
    }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  // useEffect(() => {

  //   const  data  = axios.post("/create-payment", {
  //     amount: orderDetails.order.totalPrice,
  //     currency: "usd", paymentMethodType: "card",
  //   })

  // })


  const appearance = {
    theme: 'flat',
  };
  const options = {
    clientSecret,
    appearance,
  };

  console.log(clientSecret);

  const configCardElement = {
    iconStyle: 'solid',
    style: {
      base: {
        fontSize: '18px'
      }
    },
    // hidePostalCode: false
  };



  return (
    <>
      <Header />
      <div className="container">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-light order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                        +1({order.shippingAddress.phoneNumber})
                    </p>
                    {!order.isCancelled && (
                    <div className="mt-1">
                    {loadingCancelled && <Loading />}

                    <button 
                    onClick={cancelHandler}
                    className="btn btn-outline-dark btn-sm btn-sm-start">
                      Cancel Order
                    </button>
                  </div>
                  )}
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-light order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Order info</strong>
                    </h5>
                    <p>Shipping: {order.shippingAddress.country}</p>
                    <p>Payment method: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="col-12">
                        <p className="text-success text-center text-sm-start">
                          Paid {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="col-12">
                        <p className="text-danger text-center text-sm-start">
                          Not Paid
                        </p>
                      </div>
                    )}
                    {order.isCancelled && (
                      <div className=" col-12">
                        <p className="text-danger text-center text-sm-start "><strong>
                          Cancelled: {moment(order.cancelledAt).calendar()}</strong>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* 3 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-light order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Deliver to</strong>
                    </h5>
                    <p>
                      Address: {order.shippingAddress.address},{" "}
                      {order.shippingAddress.city}{" "}
                      {order.shippingAddress.statename},{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}

                    </p>
                    {order.isDelivered ? (
                      <div className="col-12">
                        <p className="text-success text-center text-sm-start">
                          Delivered {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="col-12">
                        <p className="text-danger text-center text-sm-start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={index}>
                        <div className="col-md-3 col-6">
                          <img src={`http://drive.google.com/uc?export=view&id=${item.image}`} alt={item.name} />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                          <h4>QUANTITY</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                          <h4>SUBTOTAL</h4>
                          <h6>${item.qty * item.price}</h6>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
              
              <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
              {/* {order.isCancelled && (
                  <div className="col-12 mb-2">
                      <h5 className="text-center text-danger"><strong>ORDER CANCELLED</strong></h5>
                  </div>
                  )} */}

                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>
                        <strong>Products</strong>
                      </td>
                      <td>${order.itemsPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Shipping</strong>
                      </td>
                      <td>${order.shippingPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Tax</strong>
                      </td>
                      <td>${order.taxPrice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Online payment fee</strong>
                      </td>
                    <td>${order.totalStripefee}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  </tbody>
                </table>
                {!order.isPaid && (
                  <div className="col-12">
                    {clientSecret && (
                      <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                      </Elements>
                    )}
                    <br></br>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
    
  );
};


export default OrderScreen;
