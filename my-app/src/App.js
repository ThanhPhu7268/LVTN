import HomePage from './components/user/home';
import HeaderHome from './components/user/header';
import FooterHome from './components/user/footer';
import SideBar from './components/admin/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component, useState } from 'react';

function App() {

    return (
        <Router>
            <HeaderHome />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/admin' element={<SideBar />} />
            </Routes>
            <FooterHome />
        </Router>);
}

export default App;