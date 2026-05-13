import './ProductsNotFound.css'
import { Link } from 'react-router-dom'
export const ProductsNotFound = () => {

    return(
        <>
         <div>
              <div className="no-products-found-container">
    
         <div className="message-box">
            <h2>Oops! No products found</h2>
            <p>Maybe try a different search or explore other options?</p>
          </div>
          <div className="action-buttons">
            <Link to = {'/products'}>
            <button className="browse-button" >Browse All Products</button>
            </Link>
            <Link to={'/'}>
             <button className="home-button">Go Home</button>
            </Link>           
           </div>
         </div>
          </div>
        </>
    )
}