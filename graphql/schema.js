import {gql} from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    id: String
    text: String!
    userUid: String!
    timeStamp: String
  }

  type User {
    uid: String!
    displayName: String!
    photoURL: String!
  }

  type SignUpInfo {
    emailAddress: String!
    password: String!
    displayName: String!
  }

  type Result {
    result: Boolean!,
    message: String!
  }

  type Query {
    messages: [Message],
    messageFeed(offset: String!, limit: Int!): [Message],
    userInfo(userUid: String!): User!
  }

  type Mutation{
    sendMessage(text: String!, userUid: String!): Message!,
    addUser(userUid: String!, displayName: String!, photoURL: String!): Result!,
    updateDisplayName(userUid: String!, displayName: String!): Result!,
    updatePhotoURL(userUid: String!, photoURL: String!): Result!
  }

  type Subscription{
    messageAdded: Message!
  }
`;

export default typeDefs;