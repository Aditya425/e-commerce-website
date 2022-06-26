import React, { useState, useLayoutEffect, useEffect } from 'react'
import "./Cart.css"
import { collection, getDocs, query, where } from "firebase/firestore"
import db from "C:/Users/Aditya/Documents/reactjs-practise/e-commerce-website/src/firebase-config"
import ClipLoader from "react-spinners/ClipLoader"
import { css } from "@emotion/react";
import { BrowserRouter as Route, Routes, Link } from "react-router-dom"
import Payment from './Payment'

var totalSum = 0;

async function getProducts() {
  var categories = ["Electronics", "Groceries", "Appliances", "Sports", "Video Games"]
  var products = []
  var tempSum = 0
  for (var i = 0; i < categories.length; i++) {
    const colRef = collection(db, "Users", "dfxTizKyFr4mQ1Y7gq6b", categories[i])
    const q = query(colRef, where("totalPrice", ">", 0))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempSum += doc.data().totalPrice
      products.push(<Divs image={doc.data().image} name={doc.data().name} price={doc.data().totalPrice} />)
    });
  }
  totalSum = tempSum
  return products
}

function Divs({ image, name, price }) {
  totalSum += price
  return (
    <div style={{ color: "white", display: "flex" }}>
      <div className='item'>
        <img src={image} style={{ width: 100, height: 100 }} />
      </div>
      <div className='item'>{name}</div>
      <div className='item' style={{ position: "absolute", right: 0 }}>{price}</div>
    </div>
  )
}

function Cart() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  useEffect(() => {
    setLoading(true)
    getProducts().then(
      (prod) => {
        setProducts(prod)
        setLoading(false)
      }
    )
  }, []
  )
  return (
    <Routes>
      <div className='main__container'>
        {/* <div className='main__heading'>
        <div className='item'>Image</div>
        <div className='item'>Name</div>
        <div className='item'>Price</div>
        <div className='item'>Quantity</div>
      </div> */}
        {
          loading ? <ClipLoader color={'#FFFFFF'} css={css`position: relative; left: 40%`} loading={loading} size={150} /> :
            <>
              <div className='main__content'>
                {products}
              </div>
              <div className='button'><Link to="/Payment"> Pay ₹{totalSum} Now </Link></div>
            </>
        }
      </div>
	
		<Route path='/Payment'>
			<Payment />
		</Route>
	  
    </Routes>
  )
}

export default Cart