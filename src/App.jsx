import { useState } from 'react'
// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Book5 from './book_5'
import CheckoutPage from './pages/Checkout'
import SuccessPage from './pages/SuccessPage'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import ReturnPolicy from './pages/ReturnPolicy'
import ShippingPolicy from './pages/ShippingPolicy'
import RecentPurchasePopup from './pages/RecentPurchasePopup'
import CenterOfferPopup from './pages/CenterOffPopup'
import NotFound from './pages/NotFound'
function App() {

  return (
    <>
      <Routes>
        {/* Home Page Route */}
                <Route path="*" element={<NotFound />} />

        <Route
  path="/books/tgp/"
  element={
    <>
      <Book5 />
      <RecentPurchasePopup />
      <CenterOfferPopup />
      
    </>
  }
/>



    <Route path='/books/tgp/checkout' element={<CheckoutPage/>}/>
    <Route path='/success' element={<SuccessPage/>}/>
    <Route path='/books/tgp/privacy-policy' element={<PrivacyPolicy/>}/>
    <Route path='/books/tgp/terms' element={<TermsAndConditions/>}/>
    <Route path='/books/tgp/return-policy' element={<ReturnPolicy/>}/>
    <Route path='/books/tgp/shipping-policy' element={<ShippingPolicy/>}/>
    
       
      </Routes>
    </>
  )
}

export default App
