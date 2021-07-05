import React, { useState, useRef } from 'react'
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
// eslint-disable-next-line
const firestore = firebase.firestore()


function App() {
  
  const [user] = useAuthState(auth)
  
  const list = [{ id: 1, text: "todo item"}, { id: 2, text: "todo-list-454d2" }, { id: 3, text:"todo"}]
  const [mockList, setMockList] = useState([])
  const inputUser = useRef("222")
  const [newItem, setNewItem] = useState({id: null, text: ""})
  
  
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

  const AddItem = _ => {
    // nos quedamos aca estoy obtenienodo el id y el texto nuevo pero no los agrega a la lista, sigo por este lado o directamente conecto a firebase??

    
    function addNewItem () {
      const text = inputUser.current.value
      console.log(text)
      const newId = mockList.length ? mockList.length +1  : 1
      console.log(newId)
      setNewItem({ id: newId, text: text})
      console.log(newItem)
      let newMockList  = [newItem, ...mockList]
      setMockList(newMockList)
      setNewItem({ id: null, text: ""})
    }
    
    return (
      <>
        <input  type="text" ref={inputUser} ></input>
        <button onClick={addNewItem} >Agregar!</button>
      </>

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
        <AddItem />
        {mockList.length > 0 ? <DisplayItems /> : <h1>no hay items</h1> }  
      </section>
    </>
  );
}

export default App;
