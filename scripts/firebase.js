const firebase = require('firebase/dist/index.cjs');
const firestore = require('firebase/firestore'); // Might become useful

const config = {
  apiKey: 'AIzaSyCc2Tj67XzK56m88_FEBSIIZ1Ps36ZEe5U',
  authDomain: 'cards-78983.firebaseapp.com',
  databaseURL: 'https://cards-78983.firebaseio.com',
  projectId: 'cards-78983',
  storageBucket: 'cards-78983.appspot.com',
  messagingSenderId: '410230590418',
};

firebase.initializeApp(config);

// Firebase
const DB = firebase.firestore();
module.exports = {
  firebase,
  firestore,
  GoogleProvider: new firebase.auth.GoogleAuthProvider(),
  Auth: firebase.auth(),
  DB,
  Cards: DB.collection('cards'),
  Storage: firebase.storage(),
};
