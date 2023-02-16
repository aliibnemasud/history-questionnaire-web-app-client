import React from "react";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [signOut, loading, error] = useSignOut(auth);
    const [authuser, authLoading, autherror] = useAuthState(auth);
    const navigate = useNavigate();

    if(!authuser?.uid){
        navigate('/')
      }
    
  return (
    <div className="row vh-100">
      <div className="col-lg-2 bg-success p-3">
        <h3 className="mb-5 text-uppercase fw-bold text-white">Dashboard</h3>
        <div>
          <button className="btn btn-light w-100 mb-2 py-3">User Profile</button>          
          <button className="btn btn-light w-100 mb-2 py-3">Submitted Answer</button>                   
        </div>
      </div>
      <div className="col-lg-10 p-5">
        <div className="bg-warning py-5 mb-3">
          <button onClick={()=> signOut()} className="btn btn-dark">Sign Out</button>
        </div>

        <div className="h-100">
          <h1>Welcome to Dashboard!</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
