import React, { useRef } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

import './Payment.css'
import constants from '../constants'


function Payment() {
	const textRef = useRef()
	const numberRef = useRef()
	const dateRef = useRef()
	const location = useLocation()
	const navigate = useNavigate()


	//pay button in my website calls this method
	function getData1() {
		let cardNum = textRef.current.value
		let cvv = numberRef.current.value
		let expiryMonth = dateRef.current.value.split("/")[0]
		let expiryYear = dateRef.current.value.split("/")[1]
		

		if (cardNum == '' || cvv == '' || expiryMonth == '' || expiryYear == '') {
			return
		}

		let url = "https://cors-anywhere.herokuapp.com/https://api.na.bambora.com/scripts/tokenization/tokens"
		let data = {
			number: cardNum,
			expiry_month: expiryMonth,
			expiry_year: expiryYear,
			cvd: cvv,
		}
		//https://cors-anywhere.herokuapp.com/
		let params = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(data)
		}

		fetch(url, params).then(response => response.json()).then(data => {
			getData2(data.token)
		})
	}

	function getData2(token) {
		let tokenObject = {
			name: "Aditya Dixit",
			code: token
		}
		let params = {
			method: "POST",
			headers: {
				"Authorization": constants.PAYMENT_PASSCODE,
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(tokenObject)
		}
		let uri = "https://cors-anywhere.herokuapp.com/https://api.na.bambora.com/v1/profiles"
		fetch(uri, params).then(response => response.json()).then(data => getData3(data.customer_code))
	}

	function getData3(custId) {
		let body = {
			amount: parseInt(location.state.totalSum),
			payment_method: "card",
			card: {
				name: "Aditya Dixit",
				number: textRef.current.value,
				expiry_month: "07",
				expiry_year: "23",
				cvd: numberRef.current.value
			}
		}
		let params = {
			method: "POST",
			headers: {
				"Authorization": constants.PAYMENT_PASSCODE,
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*"
			},
			body: JSON.stringify(body)
		}
		let uri = "https://cors-anywhere.herokuapp.com/https://api.na.bambora.com/v1/payments"

		fetch(uri, params).then(response => response.json()).then(
			data => {
				navigate("/PaymentSuccessful")
			}
		)
	}

	return (
		<div>
			<header className='payment__header'>Payment</header>
			<div className='payment__box'>
				<div className='payment__content'>
					<span className='text' ><input ref={textRef} type="text" placeholder='Enter Card Number' /></span>
					<span className='number' ><input ref={numberRef} type="number" placeholder='Enter CVV' /></span>
					<span className='date'><input ref={dateRef} type="text" placeholder='Enter Expiry Date' /></span>
				</div>
			</div>
			<button className='btn' onClick={() => getData1()}>Pay</button>
		</div>
	)
}

export default Payment