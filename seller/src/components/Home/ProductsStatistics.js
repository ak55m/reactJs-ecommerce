import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Products statistics</h5>
          <iframe style={{
            background: "#FFFFFF", 
            border: "none", 
            borderRadius: "2px", 
            boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);", 
            width:"100%", 
            height:"350PX",}}
          src="https://charts.mongodb.com/charts-project-0-netqr/embed/charts?id=62817ee9-d7f4-46df-866b-0cf59c4ce665&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
