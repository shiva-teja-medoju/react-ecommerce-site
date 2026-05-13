import bannerImage from '../../assets/banners/Banner.png';
import watchImage from '../../assets/products/watch.png';
import { Link } from 'react-router-dom';


const Banner = () =>{
    return(
        <>
        <div className='banner-container'>
            <div className='Banner'>
                <div>
                    <img src={bannerImage} className='Banner-img' alt="Promotional banner showing a variety of products" />
                </div>
                <div className='banner-text'>
                    <h1>Discover Your Inner Radiance</h1>
                    <p>Experience The Comfort & Style</p>
                    <Link to={'/electronics'}>
                    <button className='shop-now-btn' type='button'>Shop Now</button>
                    </Link>
                </div>
                <div className='banner-image'>
                    <img src={watchImage} alt="Promotional banner showing a variety of products" />
                </div>
            </div>
        </div>
        </>
    )
}
export default Banner;
