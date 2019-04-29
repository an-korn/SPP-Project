const {buildSchema} = require("graphql");

const schema = buildSchema(`
  type Mutation {
    createProject( userId: ID, name: String!): User
    updateProject(id: ID, name: String!): Project
    deleteProject(id: ID): Project
    createStory(description: String!, stage: String, projectId: ID): Project
    updateStory(id: ID, description: String!, stage: String): Project
    deleteStory(id: ID): Project
  }

  type Query {
    message: String
  	getUser(token: String!): User
  	getProject(id: ID!): Project
  	getStory: Story
  }

  type User {
  	id: ID!,
  	email: String!,
    projects: [Project]
  }

  type Project {
  	id: ID!,
  	name: String!,
  	stories: [Story]
  }

  type Story {
  	id: ID!,
  	description: String!,
  	stage: String!
  }
`);

module.exports = schema
