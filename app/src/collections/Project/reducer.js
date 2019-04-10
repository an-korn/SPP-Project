const intitialState = {
  projects: []
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DATA': {
      const {projects} = action

      return {
        projects: projects
      }
    }
    case 'CLEAR_PROJECT_DATA': {
      return intitialState;
    }
    case 'ADD_PROJECT': {
      const{project} = action
      const data = [...state.projects, project]

      return {
        projects: data
      };
    }
    case 'UPDATE_PROJECT': {
      const{project} = action
      const data = state.projects.map(existingProject => {
        if (existingProject.id === project.id) return project;
        return existingProject;
      });

      return {
        projects: data
      };
    }
    case 'DELETE_PROJECT': {
      const{id} = action;
      const data = state.projects.filter(project => project.id != id);

      return {
        projects: data
      };
    }
    default:
      return state;
  }
};