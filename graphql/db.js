import { db } from '../firebase';
import firebase from 'firebase';
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();
const MESSAGE_ADDED = 'POST_ADDED';

export const messageAdded = () => pubsub.asyncIterator([MESSAGE_ADDED])

export const getMessages = async () => {
  const messages = [];

  const messagesRef = await db.collection('messages');
  const allMessages = await messagesRef.orderBy('timeStamp')
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        messages.push({ id: doc.id, text: doc.data().text, userUid: doc.data().userUid })
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

  return messages;
}

export const sendMessage = async (text, userUid) => {
  let newMessage = {
    text,
    userUid,
    timeStamp: firebase?.firestore.FieldValue.serverTimestamp()
  }

  const res = await db.collection('messages').add(newMessage)
  
  const pubResult = await pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage })

  return newMessage;
}