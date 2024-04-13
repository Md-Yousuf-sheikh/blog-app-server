export const typeDefs = `#graphql

  type Query {
    user: User
    post: Post
    users: [User]
  }

  type Mutation {
    signup(
      name: String!,
      email: String!,
      password: String!
    ): AuthPayload
    signIn(
      email: String!,
      password: String!
    ): AuthPayload
  }

  type AuthPayload {
    token: String
  }


  type Post {
   id: ID!
   title: String!
   content: String!
   author: User!
   createdAt: String!
   updatedAt: String!
   published: Boolean
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    posts: [Post]
  }

  type Profile {
    id: ID!
    bio: String!
    createdAt: String!
    updatedAt: String!
    user: User!
  }

`;
