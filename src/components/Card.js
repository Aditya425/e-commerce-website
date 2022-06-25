import React, { useState, useEffect } from 'react'
import "./Card.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import db from "C:/Users/Aditya/Documents/reactjs-practise/e-commerce-website/src/firebase-config"
import { setDoc, doc, namedQuery } from 'firebase/firestore'

function Card(props) {

  return (
    <div className='main__container__card'>
      <img src={props.data.image} />
      <div style={{ marginTop: 20 }} />
      <hr />
      <h2>{props.data.name}</h2>
      <div style={{ marginTop: 10 }} />
      <hr />
      <h2>{props.data.price}</h2>
      <div style={{ marginTop: 10 }} />
      <hr />
      <div style={{ marginTop: 10 }} />
      <div className='main__container__card__btn'>
        <CurrentQuantity price={props.data.price} image={props.data.image} name={props.data.name} type={props.type}/>
      </div>
    </div>
  )
}

async function onPlusMinusClicked(plusOrMinus, currentValue, price, image, name, type) {
  if (plusOrMinus === null) {
    return;
  }
  
  if (!isNaN(price)) {
    price = price.replace(/[^0-9]/g,'');
  }
  const newValue = price * currentValue;
  var userData = {
    image: image,
    name: name,
    totalPrice: newValue
  }

  const prodRef = doc(db, "Users", "dfxTizKyFr4mQ1Y7gq6b", type, name)
  
  await setDoc(prodRef, userData)
}

function CurrentQuantity({image, price, name, type}) {
  const [quantity, setQuantity] = useState({
    value: 0,
    clicked: null
  })

  useEffect(() => {
    //console.log(price)
    onPlusMinusClicked(quantity.clicked, quantity.value, price, image, name, type)
  }, [quantity])

  return (
    <div>
      <FontAwesomeIcon icon={faPlus} className="plus" onClick={() => setQuantity({value: quantity.value + 1, clicked: "Plus"})}/>
      <p>{quantity.value}</p>
      <FontAwesomeIcon icon={faMinus} className="minus" onClick={() => quantity.value > 0 ? setQuantity({value: quantity.value - 1, clicked: "Minus"}) : null}/>
    </div>
  )
}

export default Card