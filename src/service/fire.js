import firebase from 'firebase';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAAiW8T9uKlffhuNAbSgyVT03i8qpc5v6Q",
  authDomain: "fluffy35.firebaseapp.com",
  databaseURL: "https://fluffy35-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fluffy35",
  storageBucket: "fluffy35.appspot.com",
  messagingSenderId: "573966071294",
  appId: "1:573966071294:web:9915850bad8f864752bcaf",
  measurementId: "G-E74N1LEFG2"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();





const facebookAuth = (provider) => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider();  
  return fire.auth().signInWithPopup(facebookProvider).then((res) => { return res.user; }).catch((e) => {return e;});
}

export default fire;
export {facebookAuth};