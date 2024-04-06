import React, { useState } from 'react';
import PanelHome from './panelhome';
import '../../assets/css/home.css';
import BrandsCarousel from './brands';
import NewProduct from './producthot';
import { ButtonGroup, Button } from "@material-tailwind/react";
import NewProductWm from './producthotwm';

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState('Men');

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };
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
                <div class="section-title text--center" style={{ padding: '50px', textAlign: 'center' }}>
                    <h2>FAMOUS BRANDS</h2>
                </div>
                <BrandsCarousel />
                <div class="section-title text--center" style={{ padding: '50px', marginTop: '0px', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '50px' }}>OUTSTANDING PRODUCT</h2>
                    <ButtonGroup className="flex" style={{
                        width: '10%', flexWrap: 'nowrap',
                        justifyContent: 'center', margin: 'auto', marginBottom: '30px'
                    }}>
                        <Button
                            onClick={() => handleCategoryClick('Men')}
                            active={selectedCategory === 'Men'}
                        >
                            Men
                        </Button>
                        <Button
                            onClick={() => handleCategoryClick('Women')}
                            active={selectedCategory === 'Women'}
                        >
                            Women
                        </Button>
                        <Button
                            onClick={() => handleCategoryClick('Couple')}
                            active={selectedCategory === 'Couple'}
                        >
                            Couple
                        </Button>
                    </ButtonGroup>
                    {selectedCategory === 'Men' && <NewProduct />}
                    {selectedCategory === 'Women' && <NewProductWm />}
                </div>

            </div>
        </div >
    )
}
