import { db } from '../firebase';
import firebase from 'firebase';
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();
const MESSAGE_ADDED = 'POST_ADDED';

export const messageAdded = () => pubsub.asyncIterator([MESSAGE_ADDED])

export const getMessages = async () => {
  const messages = [];

  const messagesRef = await db.collection('messages');
  const allMessages = await messagesRef
    .orderBy('timeStamp')
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

export const messageFeed = async (offsetId, limit) => {
  const messages = [];

  const messagesRef = await db.collection('messages');
  let offsetTimeStamp;

  if (offsetId === 'entry'){
    const currentTime = firebase.firestore.FieldValue.serverTimestamp()
    offsetTimeStamp =  new Date(currentTime)
    console.log(currentTime)
  }else{
    offsetTimeStamp = await messagesRef
    .doc(offsetId)
    .get()
    .then(
      snapShot => {
        return snapShot.data().timeStamp
      }
    )}

  const data = await messagesRef
    .orderBy('timeStamp', 'desc')
    .startAt(offsetTimeStamp)
    .limit(30)
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        messages.push({ id: doc.id, text: doc.data().text, userUid: doc.data().userUid, timeStamp: doc.data().timeStamp })
      });
    })
    .catch(err => {
      console.log('Error getting documents', err);
    });

  return messages;
}

export const sendMessage = async (text, userUid) => {
  const newMessage = {
    text,
    userUid,
    timeStamp: firebase.firestore.FieldValue.serverTimestamp()
  }

  const res = await db.collection('messages').add(newMessage)
  const pubResult = await pubsub.publish(MESSAGE_ADDED, { messageAdded: newMessage })

  return newMessage;
}

export const addUser = async (userUid, displayName, photoURL) => {
  const newUser = {
    displayName,
    photoURL
  }

  // users collection에서 userUid를 검색합니다.
  const users = db.collection('users');
  const query = await users.where('uid', '==', userUid).get()
    .then(snapshot => {
      if (snapshot.empty) {
        // 일치하는 document가 없다. userUid가 등록된적이 없다.
        const res = db.collection('users').doc(userUid).set(newUser);
        return { result: true, message: 'Success' };
      } else {
        // 일치하는 documemt가 있다.
        return { result: false, message: 'User exist.' };
      }
    })
    .catch(err => {
      //뭔가 에러가 생김
      return { result: false, message: err };
    });

  return query;
}

export const updateDisplayName = async (userUid, displayName) => {

  const users = db.collection('users');
  const res = await users.doc(userUid).update({
    displayName
  })
  return res ? { result: false, message: 'error' } : { result: true, message: 'success' }
}

export const updatePhotoURL = async (userUid, photoURL) => {

  const users = db.collection('users');
  const res = await users.doc(userUid).update({
    photoURL
  })

  return res ? { result: false, message: 'error' } : { result: true, message: 'success' }
}

export const userInfo = async (userUid) => {
  const user = db.collection('users').doc(userUid);
  return await user.get()
    .then(doc => {
      if (!doc.exists) {
        return { uid: 'undefined', displayName: 'undefined user', photoURL: '' };
      } else {
        return { uid: doc.id, displayName: doc.data().displayName, photoURL: doc.data().photoURL }
      }
    })
    .catch(err => {
      return { uid: 'error', displayName: 'error', photoURL: '' };
    });
}