import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyDmOX2ux54a56ZqLkLh0MIQ3SNV05wPVYQ',
  authDomain: 'facebook-messenger-clone-313b5.firebaseapp.com',
  databaseURL: 'https://facebook-messenger-clone-313b5.firebaseio.com',
  projectId: 'facebook-messenger-clone-313b5',
  storageBucket: 'facebook-messenger-clone-313b5.appspot.com',
  messagingSenderId: '1078718371049',

  appId: '1:1078718371049:web:0b6ee9441a81b681658c78',
});

const db = firebaseApp.firestore();

export default db;
