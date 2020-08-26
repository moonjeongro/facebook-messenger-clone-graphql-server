import {gql} from 'apollo-server-express';

const typeDefs = gql`
  type Message {
    id: String
    text: String!
    timeStamp: String! 
    userId: String
  }

  type User {
    id: String!
    userName: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation{
    sendMessage(text: String, userId: String): Message!
  }

  type Subscription{
    messageAdded: Message
  }
`;

export default typeDefs;