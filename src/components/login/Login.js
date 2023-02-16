import React from "react";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    
      <div className="row vh-100">
        <div className="col-lg-4 bg-primary d-flex align-items-center justify-content-center">
          <h1 className="text-white">Login Page</h1>
        </div>
        <div className="col-lg-8 d-flex align-items-center justify-content-center">
          <div className="w-50 text-center">
            <h1 className="mb-3">Login</h1>
            <input class="form-control" type="email" placeholder="email or username" aria-label="default input example" /> <br />
            <input class="form-control" type="password" placeholder="Password" aria-label="default input example" />
            <button className="btn btn-primary my-3">Login</button>
            <div className="">
                <button className="btn btn-secondary" onClick={()=> signInWithGoogle()}>Google Login</button>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Login;
