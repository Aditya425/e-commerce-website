import React from 'react'
import './Payment.css'

function Payment() {
	return (
		<div>
			<header className='payment__header'>Payment</header>
			<div className='payment__box'>
				<div className='payment__content'>
					<span className='text' placeholder='Enter Card Number'><input type="text"/></span>
					<span className='number' placeholder='Enter Card Number'><input type="number" /></span>
					<span className='date'><input type="date" /></span>
				</div>
			</div>
		</div>
	)
}

export default Payment