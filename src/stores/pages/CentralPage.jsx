import Navbar from "../components/Navbar";
import ScrollToTop from "../components/ScrollToTop";
import ProductsSection from "../components/Products";
import Banner from "../components/Banner";







function CentralPage(){
    return(
        <>
        <Navbar />
        <ScrollToTop />
        <Banner />
        <ProductsSection />
        </>
    )
}
export default CentralPage;