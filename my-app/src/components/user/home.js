import React from "react";
import '../../assets/css/home.css';
import HomePage from "./homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderHome from "./header";
import FooterHome from "./footer";
import Cart from "./category";

export default function Home() {
    return (
        <>
            <HeaderHome />
            <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes>
            <FooterHome />
        </>
    );
}