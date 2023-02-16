import React, { useRef, useState } from "react";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [authuser, authLoading, autherror] = useAuthState(auth);

  const [googleError, setGoogleError] = useState('');
  const [passSignError, setPassSignError] = useState('');
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    signInWithEmailAndPassword(email, password);
  }

  if(gloading || loading){
    return <h1>Loading....</h1>
  }

  if(authuser?.uid){
    navigate('/dashboard')
  }

  if(error || gerror){
    setGoogleError(error)
    setPassSignError(gerror)
  }

  return (
    <div className="row vh-100">
      <div className="col-lg-4 bg-primary d-flex align-items-center justify-content-center">
        <h1 className="text-white">Login Page</h1>
      </div>
      <div className="col-lg-8 d-flex align-items-center justify-content-center">
        <div className="w-50 text-center">
          <h1 className="mb-3">Login</h1>
          <form onSubmit={handleLogin}>
            <input ref={emailRef} class="form-control" type="email" placeholder="email or username" aria-label="default input example" /> <br />
            <input ref={passwordRef} class="form-control" type="password" placeholder="Password" aria-label="default input example" />
            {
              googleError && <p className="text-danger">{googleError}</p>
            }
            {
              passSignError && <p className="text-danger">{passSignError}</p>
            }
            <button type="submit" className="btn btn-primary my-3">
              Login
            </button>
          </form>
          <div className="">
            <button className="btn btn-secondary" onClick={() => signInWithGoogle()}>
              Google Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
