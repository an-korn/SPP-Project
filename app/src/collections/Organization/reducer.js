const initialState = {
  organizations: [],
  organization: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
  case "ADD_ORGANIZATION":
    const { organization } = action;

    return {
      ...state,
      organizations: [
        ...state.organizations,
        organization
      ]
    }
  case "UPDATE_ORGANIZATION":
    const updatedOrganization = action.organization;
    const id = updatedOrganization.id;

    const organizationData = state.organizations.map(existingOrganization => {
      if (existingOrganization.id === id) return updatedOrganization;
      return existingOrganization;
    });

    return {
      organizations: organizationData,
      organization: {}
    }
  case "DELETE_ORGANIZATION":
    const deleted_id = action.id;

    const organizations = state.organizations.filter(_organization => _organization.id !== deleted_id);

    return {
      ...state,
      organizations: organizations
    }
  case "LOAD":
    const loaded_id = action.id;
    const loaded_organization = state.organizations.find(organization => organization.id === loaded_id)

    return {
      ...state,
      organization: loaded_organization
    }
  case "ADD_USER":
    const { user } = action;
    const organization_id = user.organization.id
    const organization_to_add = state.organizations.find(organization => organization.id === organization_id)
    const users = [user, ...organization_to_add.users]
    const org = {
      id: organization_to_add.id,
      name: organization_to_add.name,
      domain: organization_to_add.domain,
      owner: organization_to_add.owner,
      users: users
    }

    const orgs = state.organizations.filter(_organization => _organization.id !== organization_id);

    return {
      ...state,
      organizations: [
        ...orgs,
        org
      ]
    }
  case "DELETE_USER":
    const deleted_user_id = action.id;
    const organis = state.organizations.map(organization => {
      return { 
        id: organization.id,
        name: organization.name,
        domain: organization.domain,
        users: organization.users.filter(user => user.id !== deleted_user_id)
      }
    });

    return {
      ...state,
      organizations: organis
    }
  default:
    return state
  }
}
