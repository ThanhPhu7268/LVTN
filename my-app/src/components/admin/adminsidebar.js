import '../../assets/css/sidebar.css';
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
    UserOutlined,
    ShoppingOutlined,
    AppstoreOutlined,
    BarChartOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const AdminSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token và chuyển hướng về trang đăng nhập
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <Sider width={200} theme="light" className="admin-sidebar">
            <div className="admin-sidebar-logo">
                <img alt="" src="./img/logo/logo.png" />
            </div>
            <div>
                <Menu mode="inline" defaultSelectedKeys={['1']} className="admin-sidebar-menu">
                    <Menu.Item key="1" icon={<UserOutlined />} className="admin-sidebar-menu-item">
                        Quản lý Tài khoản
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ShoppingOutlined />} className="admin-sidebar-menu-item">
                        Quản lý đơn hàng
                    </Menu.Item>
                    <Menu.Item key="3" icon={<AppstoreOutlined />} className="admin-sidebar-menu-item">
                        Quản lý sản phẩm
                    </Menu.Item>
                    <Menu.Item key="4" icon={<BarChartOutlined />} className="admin-sidebar-menu-item">
                        Thống kê
                    </Menu.Item>
                </Menu>
            </div>
            <div>
                <Menu mode="inline" className="admin-sidebar-menu">
                    <Menu.Item key="5" icon={<LogoutOutlined />} className="admin-sidebar-menu-item" onClick={handleLogout}>
                        Đăng xuất
                    </Menu.Item>
                </Menu>
            </div>
        </Sider>
    );
};

export default AdminSidebar;