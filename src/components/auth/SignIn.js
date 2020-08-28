import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { useFirebase } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const SignIn = () => {
  const firebase = useFirebase();

  const authError = useSelector((state) => state.auth.authError);
  const auth = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();

  const [emailAndPassword, setEmailAndPassword] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setEmailAndPassword({ ...emailAndPassword, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ firebase }, emailAndPassword));
  };

  if (auth.uid) return <Redirect to="/" />;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={handleChange} />
        </div>
        <div className="input-field">
          <button className="btn pink ligthen-1 z-depth-0">Login</button>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
