import { getInitialMessage, sendMessage } from './db'

const resolvers = {
    Query: {
        messages: (_, {}) => getInitialMessage(),
    },

    Mutation: {
        sendMessage: (_, {text, userId}) => sendMessage(text, userId),
    },
};

export default resolvers;