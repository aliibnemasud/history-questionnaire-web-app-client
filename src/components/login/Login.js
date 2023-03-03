import React, { useEffect, useRef, useState } from "react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Shared/Loading";
import SocialLogin from "./SocialLogin";
import axios from "axios";

const Login = () => {
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [authUser, authLoading, authError] = useAuthState(auth);
  const email = authUser?.email;

  const [googleError, setGoogleError] = useState("");
  const [passSignError, setPassSignError] = useState("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken')

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      await signInWithEmailAndPassword(email, password);      
      const {data} = await axios.post('https://questionary-website.onrender.com/login', {email})      
      localStorage.setItem('accessToken', data?.accessToken)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=> {

    /* if(token){
      return navigate("/dashboard");
     } */
    
  },[token, gUser, authUser])

  if (gLoading || loading || authLoading) {
    return <Loading/>
  }

  if (authUser?.uid) {      
    navigate("/dashboard");
  }  

  // console.log({authUser}, {user})

  return (
    <div className="row vh-100">
      <div className="col-lg-4 bg-primary d-flex align-items-center justify-content-center">
        <h1 className="text-white">Login Page</h1>
      </div>
      <div className="col-lg-8 d-flex align-items-center justify-content-center">
        <div className="w-50 text-center">
          <h1 className="mb-3">Login</h1>
          <form onSubmit={handleLogin}>
            <input autoComplete="false" ref={emailRef} className="form-control" type="email" required placeholder="email or username" aria-label="default input example" /> <br />
            <input autoComplete="false" ref={passwordRef} className="form-control" type="password" required placeholder="Password" aria-label="default input example" />
            <p className="mt-2">Don't have account? <Link to="/signup">Sign Up</Link></p>
            {googleError && <p className="text-danger">{googleError}</p>}
            {passSignError && <p className="text-danger">{passSignError}</p>}            
            {
              error && <p className="text-danger">Error: {error?.message}</p>
            }                        
            <button type="submit" className="btn btn-primary my-3">
              Login
            </button>
            
          </form>
          <SocialLogin/>
        </div>

        
      </div>
    </div>
  );
};

export default Login;
