import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

  var firebaseConfig = {
    apiKey: "AIzaSyAXxIE-_Lq28yucfeLMvOKY2csQm5bHB84",
    authDomain: "fbclone-39274.firebaseapp.com",
    projectId: "fbclone-39274",
    storageBucket: "fbclone-39274.appspot.com",
    messagingSenderId: "953180942738",
    appId: "1:953180942738:web:1681df5b7393c08c01114b",
    measurementId: "G-SRYT0KCT1R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase