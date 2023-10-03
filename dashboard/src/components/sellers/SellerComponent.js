import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSeller } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const SellerComponent = () => {
  const dispatch = useDispatch();

  const sellerList = useSelector((state) => state.sellerList);
  const { loading, error, sellers } = sellerList;

  useEffect(() => {
    dispatch(listSeller());
  }, [dispatch]);

  // const filtered = sellerList.filter(obj => {
  //   return obj.sellerList === 'Austria';
  // });

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sellers</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search..."
                  className="form-control"
                />

                <button className="btn btn-light bg" type="button">
                  <i className="far fa-search"></i>
                </button>
              </div>

            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status: all</option>
                <option>Active only</option>
                <option>Disabled</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">

              {/* RENDER FOUND OBJECTS */}
              {/* {found && (
                <div>
                  <h2>id: {found.id}</h2>
                  <h2>country: {found.country}</h2>
                </div>
              )} */}

              {/* {filtered.map((obj) => (
                <div className="col" key={obj._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/favicon.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{obj.name}</h5>
                      <div className="card-text text-muted">
                        {obj.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">Seller</p>
                        )}

                        <p>
                          <a href={`mailto:${obj.email}`}>{obj.email}</a>
                          <p className="text-dark">{obj.storename}</p>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))} */}

              


              {/* RENDER ALL THE OBJECTS */}
              {sellers.map((user) => (
                <div className="col" key={user._id}>
                  <div className="card card-user shadow-sm">
                    <div className="card-header">
                      <img
                        className="img-md img-avatar"
                        src="images/favicon.png"
                        alt="User pic"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title mt-5">{user.name}</h5>
                      <div className="card-text text-muted">
                        {user.isAdmin === true ? (
                          <p className="m-0">Admin</p>
                        ) : (
                          <p className="m-0">Seller</p>
                        )}

                        <p>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </p>

                          <p className="text-dark">{user.storename}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default SellerComponent;