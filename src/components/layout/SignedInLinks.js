import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  const dispatch = useDispatch();
  const firebase = useFirebase();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(signOut({ firebase }));
  };

  return (
    <ul className="right">
      <li>
        <NavLink to="/create">New Project</NavLink>
      </li>
      <li>
        <button type="button" className="link-button" onClick={handleClick}>
          Log Out
        </button>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          {props.profile.initials}
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks;
