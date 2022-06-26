import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Payment from "./components/Payment"

import App from "./App"

ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/' element={<App />} />
            <Route path="/Payment" element={<Payment />} />
        </Routes>
    </Router>
    , document.getElementById("root")
)