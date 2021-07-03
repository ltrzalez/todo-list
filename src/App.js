import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'


const firebaseConfig = {
    apiKey: "AIzaSyC1hdtq8L9NxIGKWF_zL5JbpvBEkGwp4NM",
    authDomain: "todo-list-454d2.firebaseapp.com",
    projectId: "todo-list-454d2",
    storageBucket: "todo-list-454d2.appspot.com",
    messagingSenderId: "351192633254",
    appId: "1:351192633254:web:0d72de9ede6441eafb0967",
    measurementId: "G-SJB0LNBMH4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig)


const auth = firebase.auth()
const firestore = firebase.firestore()



function App() {

  const [user] = useAuthState(auth)

  function SignIn() {
    const signInWithGoogle = _ => {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
    }
    return (
      <button onClick={signInWithGoogle}>click me</button>
    )
  }


  return (
    <div >
      <header >
        <h1> TODO LIST</h1>
        {!user ? <SignIn /> : 'ya esta logiado'}
      </header>
    </div>
  );
}

export default App;
