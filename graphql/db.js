import {db} from '../firebase';
import firebase from 'firebase';
import { stringify } from 'querystring';

export const getInitialMessage = async () => {
  const messagesCollection = db.collection('messages');
  const messages = [];

  const query = messagesCollection.get()
  .orderBy('timeStamp')
  .then(snapshot => {
    snapshot?.forEach(doc => {
      messages.push({id: doc.id, text: doc.data().text, timeStamp: doc.timeStamp()})
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

  console.log(query)
}

export const sendMessage = async (text, userId) => {
  const newMessage = {
    text,
    userId,
    timeStamp: firebase.firestore.FieldValue.serverTimestamp()
  }

  const res = await db.collection('messages').add(newMessage)

  return newMessage;
}