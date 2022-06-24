import React, { useEffect, useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Card from './components/Card'
import { collection, getDocs } from "firebase/firestore"
import db from "C:/Users/Aditya/Documents/reactjs-practise/e-commerce-website/src/firebase-config"
import Cart from "./components/Cart" 

function App() {
  const [prod, setProd] = useState([])
  async function onTypeSelected(type = "Electronics") {
    if (type !== 'Cart') {
      var querySnapshot = await getDocs(collection(db, type))
      var a = []
      querySnapshot.forEach(
        (doc) => {
          a.push(<Card data={doc.data()} type={type}/>)
        }
      )

      setProd(a)
    } else {
      setProd(["Cart"])
    }

    return a
  }
  //console.log('called')
  useEffect(
    () => {
      onTypeSelected().then((doc) => {
        setProd(doc)
      })
    }, [])

  return (
    <div className='main-root'>
      <Navbar onTypeSelected={onTypeSelected} />
      <div className='main__products'>
        {
          prod[0] === "Cart" ? <Cart /> : prod
        }
      </div>
    </div>
  )
}

export default App