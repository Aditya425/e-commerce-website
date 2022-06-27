import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Payment from "./components/Payment"
import App from "./App"
import Signup from "./Auth/Signup"

ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/' element={<Signup />} />
            <Route path='/App' element={<App />} />
            <Route path="/Payment" element={<Payment />} />
            <Route path="/Login" element={<Payment />} />
        </Routes>
    </Router>
    , document.getElementById("root")
)