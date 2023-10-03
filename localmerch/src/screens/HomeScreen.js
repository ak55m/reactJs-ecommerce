import React, {useEffect, useState} from "react";
import Header from "./../components/Header";
import ShopSection from "./../components/homeComponents/ShopSection";
import ContactInfo from "./../components/homeComponents/ContactInfo";
import CalltoActionSection from "./../components/homeComponents/CalltoActionSection";
import Footer from "./../components/Footer";

const HomeScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const keywords = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  const lat = match.params.latitude;
  const long = match.params.longitude;

  
  return (
    <div>
      <Header />
      {/* <ShopSection keyword={keyword} pagenumber={pagenumber} /> */}
      <ShopSection keyword={keywords} latitude={lat} longitude={long} pagenumber={pagenumber} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </div>
  );
};

export default HomeScreen;
