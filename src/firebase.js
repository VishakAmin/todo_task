import firebase from 'firebase/app';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQJTaquZLHNe9NoQl-588YFVbYPpM-QQE",
    authDomain: "todo-3796d.firebaseapp.com",
    projectId: "todo-3796d",
    storageBucket: "todo-3796d.appspot.com",
    messagingSenderId: "906043148708",
    appId: "1:906043148708:web:5d8d0cc9d0dbda90e01931",
    measurementId: "G-J87QEG2RWR"
  };

firebase.initializeApp(firebaseConfig)

export default firebase;
