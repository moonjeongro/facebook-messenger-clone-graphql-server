import {getMessages, sendMessage, messageAdded, addUser, updateDisplayName, updatePhotoURL, userInfo, messageFeed} from './db'

const resolvers = {
    Query: {
        messages: (_, {}) => getMessages(),
        userInfo: (_, {userUid}) => userInfo(userUid),
        messageFeed: (_, {offset, limit}) => messageFeed(offset, limit)
    },

    Mutation: {
        sendMessage: (_, {text, userUid}) => sendMessage(text, userUid),
        addUser: (_, {userUid, displayName, photoURL}) => addUser(userUid, displayName, photoURL),
        updateDisplayName: (_, {userUid, displayName}) => updateDisplayName(userUid, displayName),
        updatePhotoURL: (_, {userUid, photoURL}) => updatePhotoURL(userUid, photoURL),
    },

    Subscription:{
      messageAdded:{
        // Additional event labels can be passed to asyncIterator creation
        subscribe: messageAdded,
      },
    }
};

export default resolvers;