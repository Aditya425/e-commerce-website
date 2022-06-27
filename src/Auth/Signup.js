import React from 'react'
import "./Signup.css"

function Signup() {
  return (
    <div className='main__containe'>
        <div className='login__box'>
            <input type="email" placeholder='Enter your email'/>
            <input type='password' placeholder='Enter your password'/>
            <input type='textarea' placeholder='Enter your address'/>
            <button>Signup</button>
        </div>
    </div>
  )
}

export default Signup