import { db } from '../firebase';
import firebase from 'firebase';
import { PubSub } from 'apollo-server-express';

const messages = [];
const pubsub = new PubSub();

const MESSAGE_ADDED = 'POST_ADDED';

export const messageAdded = () => pubsub.asyncIterator([MESSAGE_ADDED])

export const getMessage = async () => {

  const observer = await db.collection('messages')
    .orderBy('timeStamp')
    .onSnapshot(querySnapshot => {
      querySnapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          messages.push({ id: change.doc.id, text: change.doc.data().text, timeStamp: change.doc.data().timeStamp })
        }
        if (change.type === 'modified') {

        }
        if (change.type === 'removed') {

        }
      });
    });

  return messages;
}

export const sendMessage = async (text, userId) => {
  const newMessage = {
    text,
    userId,
    timeStamp: firebase.firestore?.FieldValue?.serverTimestamp()
  }

  const res = await db.collection('messages').add(newMessage)
  const pubResult = await pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage })

  return newMessage;
}