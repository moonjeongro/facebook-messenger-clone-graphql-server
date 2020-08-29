import { getMessages, sendMessage, messageAdded } from './db'

const resolvers = {
    Query: {
        messages: (_, {}) => getMessages(),
    },

    Mutation: {
        sendMessage: (_, {text, userUid}) => sendMessage(text, userUid),
    },

    Subscription:{
      messageAdded:{
        // Additional event labels can be passed to asyncIterator creation
        subscribe: messageAdded,
      },
    }
};

export default resolvers;