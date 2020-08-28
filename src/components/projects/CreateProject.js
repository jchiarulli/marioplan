import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { useFirestore } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

const CreateProject = (props) => {
  const firestore = useFirestore();

  const auth = useSelector((state) => state.firebase.auth);
  const dispatch = useDispatch();

  const [project, setProject] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ firestore }, project));
    props.history.push("/"); // have access to route information on props since we're using router
  };

  if (!auth.uid) return <Redirect to="/signin" />;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3">Create new project</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={handleChange} />
        </div>
        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea
            id="content"
            className="materialize-textarea"
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="input-field">
          <button className="btn pink ligthen-1 z-depth-0">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
