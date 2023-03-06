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
      const { data } = await axios.post('https://questionary-website.onrender.com/login', { email })
      localStorage.setItem('accessToken', data?.accessToken)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    /* if(token){
      return navigate("/dashboard");
     } */

  }, [token, gUser, authUser])

  if (gLoading || loading || authLoading) {
    return <Loading />
  }

  if (authUser?.uid) {
    navigate("/dashboard");
  }

  // console.log({authUser}, {user})

  return (
    <div className="container-fluid">
      <div className="login__wrap">
        <div className="login-left">
          <h2 className="text-light">Login Page</h2>
        </div>

        <div className="login-box">
        <h2 className="mb-4">Login</h2>
      
          <form onSubmit={handleLogin}>
            <input autoComplete="false" ref={emailRef} className="login-input" type="email" required placeholder="Email or username" aria-label="default input example" /> <br />
            <input autoComplete="false" ref={passwordRef} className="login-input" type="password" required placeholder="Password" aria-label="default input example" />
            <h6 className="mt-2">Don't have account? <Link to="/signup">Sign Up</Link></h6>
            {googleError && <p className="text-danger">{googleError}</p>}
            {passSignError && <p className="text-danger">{passSignError}</p>}
            {
              error && <p className="text-danger">Error: {error?.message}</p>
            }
            <div className="d-grid">
            <button type="submit" className="btn btn-dark my-3">
              Login
            </button>
            </div>

          </form>
          <div className="text-center">
            <SocialLogin />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
