import React, { useState, useEffect } from 'react'
import "./Card.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

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
        <CurrentQuantity price={props.data.price}/>
      </div>
    </div>
  )
}

function onPlusMinusClicked(plusOrMinus, currentValue, price) {
  if (plusOrMinus === null) {
    return;
  }

  const newValue = price * currentValue;
  
}

function CurrentQuantity({price}) {
  const [quantity, setQuantity] = useState({
    value: 0,
    clicked: null
  })

  useEffect(() => {
    //console.log(price)
    onPlusMinusClicked(quantity.clicked, quantity.value, price)
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