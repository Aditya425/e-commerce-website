import React, { useState, useLayoutEffect, useEffect } from 'react'
import "./Cart.css"
import { collection, getDocs, query, where } from "firebase/firestore"
import db from "C:/Users/Aditya/Documents/reactjs-practise/e-commerce-website/src/firebase-config"

var totalSum = 0;

async function getProducts() {
  var categories = ["Electronics", "Groceries", "Appliances", "Sports", "Video Games"]
  var products = []
  for (var i = 0; i < categories.length; i++) {
    const colRef = collection(db, "Users", "dfxTizKyFr4mQ1Y7gq6b", categories[i])
    const q = query(colRef, where("totalPrice", ">", 0))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      products.push(<Divs image={doc.data().image} name={doc.data().name} price={doc.data().totalPrice} />)
    });
  }
  return products
}

function Divs({ image, name, price }) {
  totalSum += price
  return (
    <div style={{color: "white", display: "flex"}}>
      <div className='item'>
        <img src={image} style={{ width: 100, height: 100 }} />
      </div>
      <div className='item'>{name}</div>
      <div className='item' style={{position: "absolute", right: 0}}>{price}</div>
    </div>
  )
}

function Cart() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    getProducts().then(
      (prod) => {
        setProducts(prod)
      }
    )
  }, []
  )
  return (
    <div className='main__container'>
      {/* <div className='main__heading'>
        <div className='item'>Image</div>
        <div className='item'>Name</div>
        <div className='item'>Price</div>
        <div className='item'>Quantity</div>
      </div> */}
      <div className='main__content'>
        {products}
      </div>
      <div className='button'>Pay </div>
    </div>
  )
}

export default Cart