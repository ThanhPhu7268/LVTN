import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { message } from 'antd';

const Protectedadmin = () => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.taikhoanvaitro === '1') {
            return <Outlet />;
        } else {
            message.error('Tài khoản của bạn không có quyền!');
            return <Navigate to="/" />;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error here, such as showing an error message or redirecting to an error page
    }
};

export default Protectedadmin;