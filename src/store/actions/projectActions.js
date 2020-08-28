export const createProject = ({ firestore }, project) => {
  return (dispatch, getState) => {
    // make async call to database
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection("projects")
      .add({
        ...project, // use the spread operator same as using project.title & project.content
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: "CREATE_PROJECT", project });
      })
      .catch((err) => {
        dispatch({ type: "CREATE_PROJECT_ERROR", err });
      });
  };
};

export const loadProjects = ({ firestore }) => {
  return (dispatch) => {
    let projects = [];

    firestore
      .collection("projects")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents");
        }
        snapshot.docs.forEach((doc) => {
          projects.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        console.log("projects in action", projects);

        dispatch({ type: "LOAD_PROJECTS", projects });
      })
      .catch((err) => {
        dispatch({ type: "LOAD_PROJECTS_ERROR", err });
      });
  };
};
