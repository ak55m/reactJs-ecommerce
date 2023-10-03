import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;

  function reloadComponent(){
    window.location.reload(false);
  }

  return (
    <div className="card-body">
      <h4 className="card-title">New orders
        <button type="button" className="btn btn-outline-success btn-sm ms-2" onClick={reloadComponent}>
          <i class="fa fa-undo" ></i>
        </button>
      </h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr key={order._id}>
                  <td>
                    <b>{order.user.name}</b>
                  </td>
                  <td>{order.user.email}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <span className="mr-5 badge rounded-pill alert-success">
                        Paid At {moment(order.paidAt).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td>
                    {order.isCancelled && (
                      <span className="ml-5 badge rounded-pill alert-warning">
                        cancelled
                      </span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).calendar()}</td>
                  <td className="d-flex justify-content-end align-item-center">
                  <span className="badge rounded-pill alert-success">
                    <Link to={`/order/${order._id}`} className="text-success">
                      {/* <i className="fa fa-file"></i> */}
                      view details
                    </Link>
                  </span>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
