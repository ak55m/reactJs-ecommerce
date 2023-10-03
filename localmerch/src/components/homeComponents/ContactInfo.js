import React from "react";


const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">

        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
              <i className="fas fa-phone-alt"></i>
            <h5>Call Us 8am-5pm</h5>
            <p>+1(346) 812 3664</p>
            <p>
            <a href={`mailto:akeemoshione99@gmail.com`}>akeemoshione99@gmail.com</a></p>
          </div>
        </div>
        
        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
              <i className="fas fa-map-marker-alt"></i>
            <h5>Currently in</h5>
            <p>Lubbock Texas, USA</p>
          </div>
        </div>

        <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
              <i className="fas fa-shipping-fast"></i>
            <h5>Deliver only:</h5>
            <p>Lubbock, TX</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactInfo;
