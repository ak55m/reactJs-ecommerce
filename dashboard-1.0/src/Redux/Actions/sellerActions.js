import {
    SELLER_LIST_FAIL,
    SELLER_LIST_REQUEST,
    SELLER_LIST_RESET,
    SELLER_LIST_SUCCESS,
    SELLER_LOGIN_FAIL,
    SELLER_LOGIN_REQUEST,
    SELLER_LOGIN_SUCCESS,
    SELLER_LOGOUT,
  } from "../Constants/SellerConstants";
  import axios from "axios";
  import { toast } from "react-toastify";
  
//   // LOGIN
//   export const login = (email, password) => async (dispatch) => {
//     const ToastObjects = {
//       pauseOnFocusLoss: false,
//       draggable: false,
//       pauseOnHover: false,
//       autoClose: 2000,
//     };
//     try {
//       dispatch({ type: SELLER_LOGIN_REQUEST });
  
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
  
//       const { data } = await axios.post(
//         `/api/users/login`,
//         { email, password },
//         config
//       );
  
//       if (!data.isAdmin === true) {
//         toast.error("You are not an Admin!", ToastObjects);
//         dispatch({
//           type: SELLER_LOGIN_FAIL,
//         });
//       } else {
//         dispatch({ type: SELLER_LOGIN_SUCCESS, payload: data });
//       }
  
//       localStorage.setItem("userInfo", JSON.stringify(data));
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       if (message === "Not authorized, token failed") {
//         dispatch(logout());
//       }
//       dispatch({
//         type: USER_LOGIN_FAIL,
//         payload: message,
//       });
//     }
//   };
  
  // LOGOUT
  export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: SELLER_LOGOUT });
    dispatch({ type: SELLER_LIST_RESET });
  };
  
  // ALL USER
//   export const listUser = () => async (dispatch, getState) => {
//     try {
//       dispatch({ type: SELLER_LIST_REQUEST });
  
//       const {
//         userLogin: { userInfo },
//       } = getState();
  
//       const config = {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       };
  
//       const { data } = await axios.get(`/api/sellers`, config);
  
//       dispatch({ type: SELLER_LIST_SUCCESS, payload: data });
//     } catch (error) {
//       const message =
//         error.response && error.response.data.message
//           ? error.response.data.message
//           : error.message;
//       if (message === "Not authorized, token failed") {
//         dispatch(logout());
//       }
//       dispatch({
//         type: SELLER_LIST_FAIL,
//         payload: message,
//       });
//     }
//   };
  
  // ALL SELLER
  export const listSeller = () => async (dispatch, getState) => {
    try {
      dispatch({ type: SELLER_LIST_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(`/api/users/sellers`, config);
  
      dispatch({ type: SELLER_LIST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: SELLER_LIST_FAIL,
        payload: message,
      });
    }
  };