import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
require('dotenv').config()

const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_ID
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;