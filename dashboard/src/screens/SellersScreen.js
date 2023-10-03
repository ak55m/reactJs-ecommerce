import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import SellerComponent from "../components/sellers/SellerComponent";

const SellersScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <SellerComponent />
      </main>
    </>
  );
};

export default SellersScreen;