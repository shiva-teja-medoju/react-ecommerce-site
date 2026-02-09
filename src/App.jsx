
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './stores/components/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

// Lazy load the page components
const CentralPage = React.lazy(() => import('./stores/pages/CentralPage'));
const LandingPage = React.lazy(() => import('./stores/pages/Landing/LandingPage'));
const ClothesSection = React.lazy(() => import('./stores/pages/Clothes'));
const FurnitureSection = React.lazy(() => import('./stores/pages/Furniture'));
const ElectronicsSection = React.lazy(() => import('./stores/pages/Electronics'));
const ShoesSection = React.lazy(() => import('./stores/pages/Shoes.tsx'));
const MiscellaneousSection = React.lazy(() => import('./stores/pages/Miscellaneous.tsx'));
const SingleProduct = React.lazy(() => import('./SingleProduct/SingleProduct'));
const Checkout = React.lazy(() => import('./stores/components/Checkout'));

function App() {
  return (
    <>
    <ToastContainer theme="colored" />
      {/* This component ensures that navigation to a new page scrolls the window to the top. */}
      <ScrollToTop />
      {/* The Routes component is where you define all the possible routes for your application. */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Each Route component maps a URL path to a specific React component. */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/products' element={<CentralPage />} />
          <Route path='/clothes' element={<ClothesSection />} />
          <Route path='/furniture' element={<FurnitureSection />} />
          <Route path='/electronics' element={<ElectronicsSection />} />
          <Route path='/shoes' element={<ShoesSection />} />
          <Route path='/miscellaneous' element={<MiscellaneousSection />} />
          <Route path='/checkout' element={<Checkout />} />
          
          {/* This is a dynamic route. The ":id" part is a URL parameter that will match any product ID. */}
          {/* It renders the SingleProduct component for a specific product. */}
          <Route path='/product/:id' element={<SingleProduct />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
