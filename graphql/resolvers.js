import { getMessage, sendMessage, messageAdded } from './db'

const resolvers = {
    Query: {
        messages: (_, {}) => getMessage(),
    },

    Mutation: {
        sendMessage: (_, {text, userId}) => sendMessage(text, userId),
    },

    Subscription: {
      messageAdded:{
        // Additional event labels can be passed to asyncIterator creation
        subscribe: messageAdded,
      },
    }
};

export default resolvers;