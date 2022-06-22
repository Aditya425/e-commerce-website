import React, { useState } from 'react'
import "./Card.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

function Card(props) {
  return (
    <div className='main__container__card'>
      <img src={props.image} />
      <div style={{ marginTop: 20 }} />
      <hr />
      <div style={{ marginTop: 10 }} />
      <h2>{props.price}</h2>
      <div style={{ marginTop: 10 }} />
      <hr />
      <div style={{ marginTop: 10 }} />
      <div className='main__container__card__btn'>
        <CurrentQuantity />
      </div>
    </div>
  )
}

function CurrentQuantity() {
  const [quantity, setQuantity] = useState(0)
  return (
    <div>
      <FontAwesomeIcon icon={faPlus} className="plus" onClick={() => setQuantity(quantity + 1)}/>
      <p>{quantity}</p>
      <FontAwesomeIcon icon={faMinus} className="minus" onClick={() => quantity > 0 ? setQuantity(quantity - 1) : null}/>
    </div>
  )
}

export default Card