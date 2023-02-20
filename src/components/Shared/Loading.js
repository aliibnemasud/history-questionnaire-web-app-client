import React from "react";

const Loading = () => {
  return (
    <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>        
      </div>
    </div>
  );
};

export default Loading;
