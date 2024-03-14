import HomePage from './components/user/home';
import SideBar from './components/admin/sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Component, useState } from 'react';
import Cart from './components/user/category';
function App() {

    return (
        <Router>
            <Routes>
                <Route path='/*' element={<HomePage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/admin/*' element={<SideBar />} />
            </Routes>
        </Router>);
}

export default App;