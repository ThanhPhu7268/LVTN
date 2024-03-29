import React from "react";
import { AdminSidebar } from "./adminsidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminProducts from "./adminProducts";
import AdminAccount from "./adminaccount";
import AdminOrder from "./adminorder";
import AccountManagementPage from "./adminAccountPage";
import '../../assets/css/admin.css';
export default function Home() {
    return (
        <>
            <AdminSidebar />
            <Routes>
                <Route path='/account' element={<AdminAccount />} />
                <Route path='/taikhoan' element={<AccountManagementPage />} />
                <Route path='/order' element={<AdminOrder />} />
                <Route path='/product' element={<AdminProducts />} />
            </Routes>
        </>
    );
}