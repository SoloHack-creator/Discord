import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: 'AIzaSyA3y4URkPad18b78saihJBgWd-cK9jfM88',
  authDomain: 'discord-43fae.firebaseapp.com',
  databaseURL: 'https://discord-43fae.firebaseio.com',
  projectId: 'discord-43fae',
  storageBucket: 'discord-43fae.appspot.com',
  messagingSenderId: '632140618534',
  appId: '1:632140618534:web:ac654214d44d867536bfe7',
  measurementId: 'G-Z0WXF2NL44',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
