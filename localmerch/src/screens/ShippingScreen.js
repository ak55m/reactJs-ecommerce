import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import { saveShippingAddress } from "../Redux/Actions/cartActions";

const ShippingScreen = ({ history }) => {
  // window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [phoneNumber, setPhonenumber] = useState(shippingAddress.phoneNumber);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [statename, setState] = useState(shippingAddress.statename);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ phoneNumber, address, city, statename, postalCode, country }));
    history.push("/placeorder");
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>DELIVERY ADDRESS</h6>
          <input
            type="number"
            placeholder="Enter phone number "
            value={phoneNumber}
            required
            pattern = "[1-9]{1}[0-9]{9}"
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />
          {/* <input
            type="text"
            placeholder="Enter state (state must be fully spelled)"
            value={statename}
            required
            pattern = "[A-Za-z]{3,}"
            onChange={(e) => setState(e.target.value)}
          /> */}
          <div className="shipping-state">
          <select required onChange={(e) => setState(e.target.value)}>
          <option>Select State</option>
          <option
            value="Texas"
            onChange={(e) => setState(e.target.value)}
          >New York</option>
          <option
            value="California"
            onChange={(e) => setState(e.target.value)}
          >California</option>
          </select> 
          </div>
          <input
            type="text"
            placeholder="Enter zip code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>
      </div>
    </>
  );
};

export default ShippingScreen;
