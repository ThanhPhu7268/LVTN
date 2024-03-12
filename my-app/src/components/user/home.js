import React, { useEffect } from "react";
import '../../assets/css/home.css';
import PanelHome from '../user/panelhome';

export default function HomePage() {
    return (
        <div className="body-container">
            <PanelHome />
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="support-wrap mb-30">
                                <div className="support-icon">
                                    <img className="animated" src="./img/home/support-1.png" alt="" />
                                </div>
                                <div className="support-content">
                                    <h5>Free Shipping</h5>
                                    <p>Free shipping on all orders</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="support-wrap mb-30">
                                <div className="support-icon">
                                    <img className="animated" src="./img/home/support-2.png" alt="" />
                                </div>
                                <div className="support-content">
                                    <h5>Support 24/7</h5>
                                    <p>24/7 customer support</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="support-wrap mb-30">
                                <div className="support-icon">
                                    <img className="animated" src="./img/home/support-3.png" alt="" />
                                </div>
                                <div className="support-content">
                                    <h5>Money Return</h5>
                                    <p>Easy return policy</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6">
                            <div className="support-wrap mb-30">
                                <div className="support-icon">
                                    <img className="animated" src="./img/home/support-4.png" alt="" />
                                </div>
                                <div className="support-content">
                                    <h5>Order Discount</h5>
                                    <p>Discounts on orders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="section-title text-center" style={{ marginBottom: '30px' }}>
                <h2>FAMOUS BRANDS</h2>
            </div>
            <div className="brand-pt">
                <img className="" src="./img/brand/ca.webp"></img>
                <img className="" src="./img/brand/cs.webp"></img>
                <img className="" src="./img/brand/dk.webp"></img>
                <img className="" src="./img/brand/gk.webp"></img>
                <img className="" src="./img/brand/hb.webp"></img>
                <img className="" src="./img/brand/lg.webp"></img>
                <img className="" src="./img/brand/seiko.webp"></img>
                <img className="" src="./img/brand/om.webp"></img>
                <img className="" src="./img/brand/logo-tissot.webp"></img>
                <img className="" src="./img/brand/om.webp"></img>
            </div>

            <div class="section-title text-center" style={{ marginBottom: '30px' }}>
                <h2>SẢN PHẨM NỔI BẬT</h2>
            </div>
        </div>
    );
}