import React, { useState } from 'react'
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
  
  const list = [{ id: 1, text: "todo item"}, { id: 2, text: "todo-list-454d2" }, { id: 3, text:"todo"}]
  const [user] = useAuthState(auth)

  const [mockList, setMockList] = useState([])
  
  const ChargeItems = _ => {

    function doMyThing(){
      setMockList(list)
    } 

    return (
      <>
        <button onClick={doMyThing}>carga datos</button>
      </>
    )
  }


  const DisplayItems = _=>{
    return (
      <>
        {mockList.map(item => {
          const {id, text} = item
          return (
            <p key={id} >{text}</p>
          )
        })}
      </>
    )
  }


  function SignIn() {
    const signInWithGoogle = _ => {
      const provider = new firebase.auth.GoogleAuthProvider()
      auth.signInWithPopup(provider)
    }
    return (
      <button onClick={signInWithGoogle}>Login</button>
    )
  }

  function SignOut() {
    return auth.currentUser && (
      <button onClick={ _ => auth.signOut()}>Deslogiarme</button>
    )
  }

  


  return (  
    <>
    <header >
      <h1> TODO LIST</h1>
      {!user ? <SignIn /> : <SignOut />}
    </header>
    <section>
      <ChargeItems />
      {mockList.length > 0 ? <DisplayItems /> : <h1>no hay items</h1> }  
    </section>
    </>
  );
}

export default App;
