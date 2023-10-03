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
  
  // LOGIN
  export const sellerLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case SELLER_LOGIN_REQUEST:
        return { loading: true };
      case SELLER_LOGIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case SELLER_LOGIN_FAIL:
        return { loading: false, error: action.payload };
      case SELLER_LOGOUT:
        return {};
      default:
        return state;
    }
  };
  
  // ALL SELLER
  // export const sellerListReducer = (state = { sellers: [] }, action) => {
  //   switch (action.type) {
  //     case SELLER_LIST_REQUEST:
  //       return { loading: true };
  //     case SELLER_LIST_SUCCESS:
  //       return { loading: false, users: action.payload };
  //     case SELLER_LIST_FAIL:
  //       return { loading: false, error: action.payload };
  //     case SELLER_LIST_RESET:
  //       return { users: [] };
  //     default:
  //       return state;
  //   }
  // };