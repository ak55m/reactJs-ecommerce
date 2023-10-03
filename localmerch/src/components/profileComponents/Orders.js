import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const Orders = (props) => {
  const { loading, error, orders } = props;


  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              No Orders
              <Link
                className="btn btn-light mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                START SHOPPING
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ORDER ID</th>
                    <th>STATUS</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        "alert-" 
                        + ((order.isCancelled === true && order.isPaid === true) ? 'danger' : '')
                        + (order.isPaid === true && order.isCancelled === false ? 'success' : '')
                        + (order.isCancelled === true && order.isPaid === false ? 'danger' : '')
                        + (order.isCancelled === false && order.isPaid === false ? 'warning' : '')
                      }`}
                      key={order._id}
                    >
                      <td>
                        <a href={`/order/${order._id}`} className="link">
                          {order._id}
                        </a>
                      </td>
                      <td>{`${""
                          +((order.isPaid === true && order.isCancelled === false) ? "Paid" : "")
                          +((order.isCancelled === true && order.isPaid === true) ? "Cancelled" : "")
                          + (order.isCancelled === true && order.isPaid === false ? 'Cancelled' : '')
                          + (order.isCancelled === false && order.isPaid === false ? 'Not Paid' : '')

                      }`}</td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar()
                          : moment(order.createdAt).calendar()}
                      </td>
                      <td>${order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;