import React from 'react';
import PanelHome from './panelhome';
import '../../assets/css/home.css';
import BrandsCarousel from './brands';
export default function HomePage() {
    return (
        <div>
            <div className="body-container">
                <PanelHome />
                <div>
                    <div className="container">
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
                <div class="section-title text-center" style={{ padding: '50px' }}>
                    <h2>FAMOUS BRANDS</h2>
                </div>
                <BrandsCarousel />
                <div class="section-title text-center" style={{ padding: '50px', marginTop: '0px' }}>
                    <h2>SẢN PHẨM NỔI BẬT</h2>
                </div>
            </div>
        </div>
    )
}
