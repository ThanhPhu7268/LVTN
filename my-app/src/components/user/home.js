import React from "react";
import '../../assets/css/home.css';
import HomePage from "./homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderHome from "./header";
import FooterHome from "./footer";
import Cart from "./category";
import UserProfile from "./profile"
import PurchaseHistory from "./history";

export default function Home() {
    return (
        <>
            <HeaderHome />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/user' element={<UserProfile />} />
                <Route path='/history' element={<PurchaseHistory />} />
            </Routes>
            <FooterHome />
        </>
    );
}