import axios from "axios";
import React, { useRef, useState } from "react";
import { useAuthState, useCreateUserWithEmailAndPassword, useUpdateProfile } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";

const SignUp = () => {
  const [authUser, authLoading, authError] = useAuthState(auth);
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const [signUpError, setSignUError] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [updateProfile, updating, upDateError] = useUpdateProfile(auth);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");

  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const cPassword = confirmPasswordRef.current.value;
    if (password !== cPassword) {
      setSignUError("Password doesn't match")
    } else {
      await createUserWithEmailAndPassword(email, password);
      await updateProfile({ displayName })
    }

    await axios.post('https://questionary-website.onrender.com/user', { name: displayName, email: email })
    const { data } = await axios.post('https://questionary-website.onrender.com/login', { email })
    localStorage.setItem('accessToken', data?.accessToken)
  };

  if (loading || authLoading || updating) {
    return <Loading />
  }

  if (authUser?.uid) {
    navigate('/dashboard')
  }

  if (upDateError) {
    return <h1>Update Error</h1>
  }

  return (
    <div className="container-fluid">
      <div className="login__wrap">
        <div className="login-left">
          <h2 className="text-light">Sign Up Page</h2>
        </div>

        <div className="login-box">
          <h2 className="mb-4">Sign Up</h2>
          <form onSubmit={handleCreateAccount}>
            <input className="login-input" onChange={(e) => setDisplayName(e.target.value)} required type="text" placeholder="Type your name" aria-label="default input example" /> <br />
            <input className="login-input" ref={emailRef} required type="email" placeholder="Email or username" aria-label="default input example" /> <br />
            <input className="login-input" ref={passwordRef} required type="password" placeholder="Password" aria-label="default input example" /> <br />
            <input className="login-input" ref={confirmPasswordRef} required type="password" placeholder="Confirm Password" aria-label="default input example" />
            <p className="mt-2">Don't have account? <Link to="/">Login</Link></p>
            {
              signUpError && <p className="text-danger mt-3">{signUpError}</p>
            }
            <button type="submit" className="btn btn-primary my-3">Sign Up</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
