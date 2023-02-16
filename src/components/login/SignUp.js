import React from 'react';

const SignUp = () => {
    return (
        <div className="row vh-100">
        <div className="col-lg-4 bg-primary d-flex align-items-center justify-content-center">
          <h1 className="text-white">Sign Up</h1>
        </div>
        <div className="col-lg-8 d-flex align-items-center justify-content-center">
          <div className="w-50 text-center">
            <h1 className="mb-3">Sign Up</h1>
            <input class="form-control" type="email" placeholder="email or username" aria-label="default input example" /> <br />
            <input class="form-control" type="password" placeholder="Password" aria-label="default input example" />
            <button className="btn btn-primary my-3">Login</button>            
          </div>
        </div>
      </div>
    );
};

export default SignUp;