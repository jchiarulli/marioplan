import React, { useEffect } from "react";
import Notifications from "./Notifications";
import ProjectList from "../projects/ProjectList";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { useFirestore } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import { loadProjects } from "../../store/actions/projectActions";

const Dashboard = () => {
  useFirestoreConnect([
    {
      collection: "notifications",
      limit: 3,
      orderBy: ["time", "desc"],
    },
  ]);

  const firestore = useFirestore();

  const dispatch = useDispatch();

  const fetchProjects = () => {
    dispatch(loadProjects({ firestore }));
  };

  useEffect(fetchProjects, []);

  const projects = useSelector((state) => state.project.projects);
  const areProjectsLoaded = useSelector(
    (state) => state.project.areProjectsLoaded
  );

  const notifications = useSelector(
    (state) => state.firestore.ordered.notifications
  );

  const auth = useSelector((state) => state.firebase.auth);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  } else if (areProjectsLoaded) {
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects} />
          </div>
          <div className="col 12 m5 offset-m1">
            <Notifications notifications={notifications} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading projects...</p>
      </div>
    );
  }
};

export default Dashboard;
