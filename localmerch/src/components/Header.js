import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";
import axios from "axios";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [zipcodeNo, setzipcodeNo] = useState("");

  const dispatch = useDispatch();
  let history = useHistory();

  const [Data, setData] = useState([]);

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");


  // useEffect(() => {
  //   const getzipcodeInfo = JSON.parse(localStorage.getItem("zipcode"));
  //   console.log("the get request", getzipcodeInfo.zipcode);
  //   setzipcodeNo(getzipcodeInfo.zipcode);
  //   const ffound = getzipcodeInfo.zipcode;
  //   setzipcodeNo(getzipcodeInfo.zipcode);
  //   setLatitude(getzipcodeInfo.latitude);
  //   setLongitude(getzipcodeInfo.longitude);

  //   console.log(ffound)
  // }, []);

  // console.log(latitude);


  // useEffect(() => {
  //   axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcodeNo}&appid=${apiKey}`)
  //   .then((response) => {
  //     //   this.setData({Data: data});
  //     //   console.log(this.state.Data);
  //     setData(response.data);
  //     setLatitude(response.data.lat);
  //     setLongitude(response.data.lon);
  //     setLatitude(response.data.lat);
  //     setLongitude(response.data.lon);
  //     console.log("real",response.data);
  //     console.log("the lat", latitude);
  //     console.log("the long", longitude);
  //     const latt = response.data.lat;
  //     setLatitude(latt);
  //     const lonn = response.data.lon;
  //     console.log("use variable",latt);
  //   })
  // }, []);

  // history.push(`/localsearch/${latitude}`);


  // const getzipcodeInfo = JSON.parse(localStorage.getItem("zipcode"));
  // console.log("the get request", getzipcodeInfo);

  // if (getzipcodeInfo) {
  // }



  const apiKey = "60176ca9f0f068d03fa45ebc5d6d5266";

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("found", zipcodeNo)


  const logoutHandler = () => {
    dispatch(logout());
  };

  const carryOut = () => {
    
  }


  const locatorHandler = (e) => {
    e.preventDefault();
    // if (keyword.trim()) {
    //   history.push(`/search/${keyword}${keyword}`);
    // } else {
    //   history.push("/");
    // }
    console.log(zipcodeNo);

    axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcodeNo}&appid=${apiKey}`)
    .then((response) => {
      //   this.setData({Data: data});
      //   console.log(this.state.Data);
      setData(response.data);
      setLatitude(response.data.lat);
      setLongitude(response.data.lon);
      console.log("real",response.data);
      console.log("the lat", latitude);
      console.log("the long", longitude);
      const latt = response.data.lat;
      setLatitude(latt);
      const lonn = response.data.lon;
      console.log("use variable",latt);
    })


    axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcodeNo}&appid=${apiKey}`)
    .then((response) => {
      //   this.setData({Data: data});
      //   console.log(this.state.Data);
      setData(response.data);
      setLatitude(response.data.lat);
      setLongitude(response.data.lon);
      setLatitude(response.data.lat);
      setLongitude(response.data.lon);
      console.log("real",response.data);
      console.log("the lat", latitude);
      console.log("the long", longitude);
      const latt = response.data.lat;
      setLatitude(latt);
      const lonn = response.data.lon;
      console.log("use variable",latt);
    })

    // const getData = async () => {
    //   const { data } = await axios.get(`http://api.openweathermap.org/geo/1.0/zip?zip=${keyword}&appid=${apiKey}`);
    //   this.setData({Data: data});
    //   console.log(this.state.Data);
      // console.log(data.lat);
      // const latt = data.lat;
      // console.log(latitude)
    // };
    // useEffect(() => {
      // getData();
    // }, []);


  
    const zipcodeInfo = {
      zipcode: zipcodeNo,
      latitude: Data.lat,
      longitude: Data.lon
    };


    localStorage.setItem("zipcode", JSON.stringify(zipcodeInfo));


    // history.push(`/localsearch/${latitude}`);



    if (zipcodeNo.trim()) {
      // history.push(`/search/${latitude}`);
      history.push(`/localsearch/${latitude}/${longitude}`);

    } else {
      history.push("/");
    }



};


const submitHandler = (e) => {
  e.preventDefault();

  if (keyword.trim()) {
    history.push(`/search/${keyword}`);
  } else {
    history.push("/");
  }

}





  return (
    
    <div>
      {/* Top Header */}
      <div className="Announcement">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p >This is a local e-commerce store</p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <p>Contact us: 346-812-3664</p>
              
            </div>
            {/* <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <Link to="">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="">
                <i className="fab fa-linkedin-in"></i>
              </Link>
              <Link to="">
                <i className="fab fa-youtube"></i>
              </Link>
              <Link to="">
                <i className="fab fa-pinterest-p"></i>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {userInfo ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu" id="userdrop">
                        <Link className="dropdown-item" to="/profile">
                          Orders
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">{cartItems.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <div className="btn-group" >
                    <form onSubmit={submitHandler} className="input-group" >
                      <input
                        type="search"
                        className="form-control rounded search"
                        placeholder="Search..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                      />
                      <button type="submit" className="search-button">
                        <i class="fas fa-search"></i>
                      </button>
                    </form>
                  </div>
                  <div className="btn-group">
                    <button
                          type="button"
                          className="name-button dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{display: "inline"}}
                        >
                          <i class="fas fa-map-marker-alt"></i>
                    </button>

                    <div className="dropdown-menu" id="mobiledrop">
                      <form onSubmit={locatorHandler} >
                        <input
                          type="search"
                          className="form-control rounded search"
                          placeholder="Zipcode"
                          value={zipcodeNo}
                          onChange={(e) => setzipcodeNo(e.target.value)}
                        />
                        {/* <button type="submit" className="search-button">
                          Locate
                        </button> */}
                      </form>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              
              <div id="container" className="col-md-6 col-12 align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search Products"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    <i class="fas fa-search"></i>
                  </button>

                </form>

                <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      <i class="fas fa-map-marker-alt"></i>
                    </button>
                    <div className="dropdown-menu w-100">
                      <form onSubmit={locatorHandler} >
                        <input
                          type="search"
                          className="form-control rounded search"
                          placeholder="Enter Zipcode"
                          value={zipcodeNo}
                          onChange={(e) => setzipcodeNo(e.target.value)}
                        />
                        {/* <button type="submit" className="search-button">
                          Locate
                        </button> */}
                      </form>
                    </div>
                  </div>

                  {/* <form onSubmit={locatorHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Enter Zipcode to find local items"
                      value={zipcodeNo}
                      onChange={(e) => setzipcodeNo(e.target.value)}
                    />
                    <button type="submit" className="search-button">
                      Locate
                    </button>
                  </form> */}


              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {userInfo.name}
                    </button>
                    <div className="dropdown-menu" id="userdrop">
                      <Link className="dropdown-item" to="/profile">
                        Orders
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Sign Up</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
            {/* <br></br>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>This is a local e-commerce website!</strong> This is a local e-commerce website that 
              is solely aimed at pairing local customers with local consumer retailers.
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;