import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import moment from "moment";

const ProjectDetails = (props) => {
  useFirestoreConnect([
    {
      collection: "projects",
    },
  ]);

  const projects = useSelector((state) => state.firestore.data.projects);
  const id = props.match.params.id;
  const project = projects ? projects[id] : null;

  const auth = useSelector((state) => state.firebase.auth);

  if (!auth.uid) return <Redirect to="/signin" />;

  if (project) {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p>{project.content}</p>
          </div>

          <div className="card-action gret ligthen-4 grey-text">
            <div>
              Posted by {project.authorFirstName} {project.authorLastName}
            </div>
            <div> {moment(project.createdAt.toDate()).calendar()}</div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <p>Loading project...</p>
      </div>
    );
  }
};

export default ProjectDetails;
