import React, { useState } from 'react';
import PanelHome from './panelhome';
import '../../assets/css/home.css';
import BrandsCarousel from './brands';
import NewProduct from './producthot';
import { ButtonGroup, Button } from "@material-tailwind/react";
import NewProductWm from './producthotwm';
import NewProductCp from './producthotcp';
import Gallery from './gallery';
import { useEffect } from 'react';

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('Men');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://embed.tawk.to/66154688a0c6737bd129f4f8/1hr1hn2bd';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div className="body-container" >
                <PanelHome />
                <div>
                    <div className="container" style={{ maxWidth: '1300px' }}>
                        <div className="support-icon">
                            <i class="fa-solid fa-truck-fast"></i>
                        </div>
                        <div className="support-content">
                            <h5>Free Shipping</h5>
                            <p>Free shipping on all orders</p>
                        </div>
                        <div className="support-icon">
                            <i class="fa-solid fa-headset"></i>
                        </div>
                        <div className="support-content">
                            <h5>Support 24/7</h5>
                            <p>24/7 customer support</p>
                        </div>
                        <div className="support-icon">
                            <i class="fa-solid fa-money-bill-transfer"></i>
                        </div>
                        <div className="support-content">
                            <h5>Money Return</h5>
                            <p>Easy return policy</p>
                        </div>
                        <div className="support-icon">
                            <i class="fa-brands fa-shopify"></i>
                        </div>
                        <div className="support-content">
                            <h5>Order Discount</h5>
                            <p>Discounts on orders</p>
                        </div>
                    </div>
                </div>
                <Gallery />
                <div class="section-title text--center" style={{ padding: '50px', marginTop: '100px', textAlign: 'center', color: 'black', background: 'white', borderTop: '1px solid #afadad' }}>
                    <h2>FAMOUS BRANDS</h2>
                </div>
                <BrandsCarousel />
                <div class="section-title text--center" style={{ padding: '50px', marginTop: '40px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '30px', fontWeight: 'bold' }}>OUTSTANDING PRODUCT</h2>
                    <ButtonGroup className="flex" style={{
                        width: '10%', flexWrap: 'nowrap',
                        justifyContent: 'center', margin: 'auto', marginBottom: '30px'
                    }}>
                        <Button
                            className='text-black'
                            style={{ borderRadius: '0', marginRight: '5px', background: 'white', border: '1px solid black', color: 'black !important' }}
                            onClick={() => handleCategoryClick('Men')}
                            active={selectedCategory === 'Men'}
                        >
                            Men
                        </Button>
                        <Button
                            className='text-black'
                            style={{ borderRadius: '0', marginRight: '5px', background: 'white', border: '1px solid black', color: 'black !important' }}
                            onClick={() => handleCategoryClick('Women')}
                            active={selectedCategory === 'Women'}
                        >
                            Women
                        </Button>
                        <Button
                            className='text-black'
                            style={{ borderRadius: '0', marginRight: '5px', background: 'white', border: '1px solid black', color: 'black !important' }}
                            onClick={() => handleCategoryClick('Couple')}
                            active={selectedCategory === 'Couple'}
                        >
                            Couple
                        </Button>
                    </ButtonGroup>
                    {selectedCategory === 'Men' && <NewProduct />}
                    {selectedCategory === 'Women' && <NewProductWm />}
                    {selectedCategory === 'Couple' && <NewProductCp />}
                </div>

            </div>
        </div >
    )
}
