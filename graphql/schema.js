import {gql} from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    id: String
    text: String!
    userUid: String!
  }

  type User {
    uid: String!
    displayName: String!
    emailAddress: String
    emailVerified: Boolean
    isAnonymous: Boolean
  }

  type Query {
    messages: [Message]
  }

  type Mutation{
    sendMessage(text: String!, userUid: String!): Message!
  }

  type Subscription{
    messageAdded: Message!
  }
`;

export default typeDefs;