import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDv7SeugzBQyt0L8NCfNV8OdLRjdiquDLY",
  authDomain: "crwn-db-32b74.firebaseapp.com",
  databaseURL: "https://crwn-db-32b74.firebaseio.com",
  projectId: "crwn-db-32b74",
  storageBucket: "crwn-db-32b74.appspot.com",
  messagingSenderId: "873501361293",
  appId: "1:873501361293:web:17aed5ba47044f1fb6cec4",
  measurementId: "G-XH52B12D2J",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
