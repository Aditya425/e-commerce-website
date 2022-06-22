import React from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Card from './components/Card'
import { collection, getDocs } from "firebase/firestore"
import db from "C:/Users/Aditya/Documents/reactjs-practise/e-commerce-website/src/firebase-config"

async function onTypeSelected(type = "Electronics") {
  var querySnapshot = await getDocs(collection(db, type))
  console.log(querySnapshot)
  var a = querySnapshot.map(
    (doc) => {
      return <Card data={doc.data()} />
    }
  )

  console.log(a)
}

function App() {
  onTypeSelected()
  // var products = onTypeSelected()
  //   .then((prods) => {
  //     return prods
  //   })
  return (
    <div className='main-root'>
        <Navbar onTypeSelected={onTypeSelected}/>
        <div className='main__products'>
          {/* {
            products == null ? null : products
          } */}
        </div>
    </div>
  )
}

export default App