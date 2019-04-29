const intitialState = {
  project: null,
  projects: [],
  isFetching: false
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case 'SET_PROJECT_DATA': {
      return {
        ...state,
        isFetching: true
      }
    }
    case 'SET_PROJECT_DATA_SUCCESS': {
      const {projects} = action

      return {
        ...state,
        projects: projects,
        isFetching: false
      }
    }
    case 'SET_PROJECT_DATA_FAILURE': {
      return {
        ...state,
        isFetching: false
      }
    }
    case 'CLEAR_PROJECT_DATA': {
      return {
        ...state,
        isFetching: true
      };
    }
    case 'CLEAR_PROJECT_DATA_SUCCESS': {
      return intitialState;
    }
    case 'CLEAR_PROJECT_DATA_FAILURE': {
      return {
        ...state,
        isFetching: false
      };
    }
    case 'SET_PROJECT': {
      return {
        ...state,
        isFetching: true
      }
    }
    case 'SET_PROJECT_SUCCESS': {
      const {project} = action

      return {
        ...state,
        project: project,
        isFetching: false
      }
    }
    case 'SET_PROJECT_FAILURE': {
      return {
        ...state,
        isFetching: false
      }
    }
    case 'ADD_PROJECT', 'ADD_PROJECT_SUCCESS': {
      const{project} = action
      const data = [...state.projects, project]

      return {
        ...state,
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
        ...state,
        projects: data
      };
    }
    case 'DELETE_PROJECT', 'DELETE_PROJECT_SUCCESS': {
      const{id} = action;
      const data = state.projects.filter(project => project.id != id);

      return {
        ...state,
        projects: data
      };
    }
    default:
      return state;
  }
};