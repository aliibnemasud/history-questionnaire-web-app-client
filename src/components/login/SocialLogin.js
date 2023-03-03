import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { FcGoogle } from "react-icons/fc"

const SocialLogin = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  return (
    <div>
      <button className="btn btn-lite" onClick={() => signInWithGoogle()}>
        <FcGoogle size={40}/>
      </button>
    </div>
  );
};

export default SocialLogin;
