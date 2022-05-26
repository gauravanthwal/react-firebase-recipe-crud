import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "These are wrong credentials, Please fill your credentials",
  authDomain: "These are wrong credentials, Please fill your credentials",
  projectId: "These are wrong credentials, Please fill your credentialsy",
  storageBucket: "These are wrong credentials, Please fill your credentials",
  messagingSenderId: "These are wrong credentials, Please fill your credentials",
  appId: "These are wrong credentials, Please fill your credentials"
};

// Init Firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFireStore = firebase.firestore();

export { projectFireStore };
