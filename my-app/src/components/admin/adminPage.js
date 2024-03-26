import React from "react";
import AdminSidebar from "./adminsidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminProducts from "./adminProducts";
import AdminAccount from "./adminaccount";
import AdminOrder from "./adminorder";
export default function Home() {
    return (
        <>
            <AdminSidebar />
            <Routes>
                <Route path='/' element={<AdminAccount />} />
                <Route path='/order' element={<AdminOrder />} />
                <Route path='/adminproduct' element={<AdminProducts />} />
            </Routes>
        </>
    );
}