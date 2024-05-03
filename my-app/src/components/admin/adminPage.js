import React from "react";
import { AdminSidebar } from "./adminsidebar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminProducts from "./adminProducts";
import AdminAccount from "./adminaccount";
import AdminOrder from "./adminorder";
// import AccountManagementPage from "./adminAccountPage";
import Revenue from "./adminDashboar";
import AdminBrands from "./adminBrand";
import AdminWareHouse from "./adminWareHouse";
import OrderDetailPage from "./orderDetailPage";
import '../../assets/css/admin.css';
export default function Home() {
    return (
        <>
            <AdminSidebar />
            <Routes>
                <Route path='/taikhoan' element={<AdminAccount />} />
                {/* <Route path='/account' element={<AccountManagementPage />} /> */}
                <Route path='/order' element={<AdminOrder />} />
                <Route path='/warehouse' element={<AdminWareHouse />} />
                <Route path='/' element={<Revenue />} />
                <Route path='/orderdetail/:id' element={<OrderDetailPage />} />
                <Route path='/brand' element={<AdminBrands />} />
                <Route path='/product' element={<AdminProducts />} />
            </Routes>
        </>
    );
}