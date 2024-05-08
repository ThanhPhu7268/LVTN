import React from "react";
import '../../assets/css/home.css';
import HomePage from "./homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderHome from "./header";
import FooterHome from "./footer";
import Cart from "./category";
import UserProfile from "./profile"
import OrderPage from "./orderDetail";
import Blog from "./blog";
import BlogDetail from "./blogdetail";
export default function Home() {
    return (
        <>
            <HeaderHome />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/user' element={<UserProfile />} />
                <Route path='/history' element={<OrderPage />} />
                <Route path='/blog' element={<Blog />} />
                <Route path='/blog/:id' element={<BlogDetail />} />
            </Routes>
            <FooterHome />
        </>
    );
}