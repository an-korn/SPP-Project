const intitialState = {
  projects: []
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DATA', 'SET_PROJECT_DATA_SUCCESS': {
      const {projects} = action

      return {
        projects: projects
      }
    }
    case 'CLEAR_PROJECT_DATA': {
      return intitialState;
    }
    case 'ADD_PROJECT', 'ADD_PROJECT_SUCCESS': {
      const{project} = action
      const data = [...state.projects, project]

      return {
        projects: data
      };
    }
    case 'UPDATE_PROJECT', 'UPDATE_PROJECT_SUCCESS': {
      const{project} = action
      const data = state.projects.map(existingProject => {
        if (existingProject.id === project.id) return project;
        return existingProject;
      });

      return {
        projects: data
      };
    }
    case 'DELETE_PROJECT', 'DELETE_PROJECT_SUCCESS': {
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