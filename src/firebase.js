import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBZPCDngthA8bnpjzsl3TtzJni6mOsxV_c",
    authDomain: "assessment-c5f58.firebaseapp.com",
    databaseURL: "https://assessment-c5f58-default-rtdb.firebaseio.com",
    projectId: "assessment-c5f58",
    storageBucket: "assessment-c5f58.appspot.com",
    messagingSenderId: "182306846663",
    appId: "1:182306846663:web:36b36ff6f894c67f148be2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth()
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()