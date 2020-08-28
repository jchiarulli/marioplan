const initState = {
  projects: [],
  areProjectsLoaded: false,
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
      console.log("created project", action.project);
      return {
        ...state,
      };

    case "CREATE_PROJECT_ERROR":
      console.log("create project error", action.err);
      return {
        ...state,
      };

    case "LOAD_PROJECTS":
      console.log("loaded projects in reducer", action.projects);
      return {
        ...state,
        projects: action.projects,
        areProjectsLoaded: true,
      };

    case "LOAD_PROJECTS_ERROR":
      console.log("loaded projects error", action.err);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default projectReducer;
