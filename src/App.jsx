
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './App.css'

// Lazy load the page components
const CentralPage = React.lazy(() => import('./components/product/Products/Products'));
const LandingPage = React.lazy(() => import('./features/home/LandingPage'));
const ClothesSection = React.lazy(() => import('./features/products/pages/Clothes.tsx'));
const FurnitureSection = React.lazy(() => import('./features/products/pages/Furniture.tsx'));
const ElectronicsSection = React.lazy(() => import('./features/products/pages/Electronics.tsx'));
const ShoesSection = React.lazy(() => import('./features/products/pages/Shoes.tsx'));
const MiscellaneousSection = React.lazy(() => import('./features/products/pages/Miscellaneous.tsx'));
const SingleProduct = React.lazy(() => import('./components/product/SingleProduct/SingleProduct'));
const Checkout = React.lazy(() => import('./features/cart/pages/Checkout'));

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
