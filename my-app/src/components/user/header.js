import React from "react";
import '../../assets/css/hearder.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { Avatar } from '@material-tailwind/react';
import { DownOutlined } from "@ant-design/icons";
import axios from 'axios';

export default function HeaderHome() {
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState(null);

    const handleLogout = async () => {
        localStorage.removeItem('user');
        let cart = JSON.parse(window.localStorage.getItem('cart'))
        if (cart) {
            for (const product of cart) {
                await axios.post(`http://localhost:8080/api/cart`, product, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
        localStorage.removeItem('cart');

        navigate('/'); // Use useNavigate to navigate to the home page
    };

    const userJSON = localStorage.getItem('user');
    const user = JSON.parse(userJSON);

    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/user">Thông tin cá nhân</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/history">Lịch sử mua hàng</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <button onClick={handleLogout}>Đăng xuất</button>
            </Menu.Item>
        </Menu>
    );

    return (
        <header>
            <section className="section-nav">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                {user ? (
                    <div className="dropdown">
                        <div className="span-id">
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                                    <Avatar
                                        src="https://i.pinimg.com/564x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg"
                                        alt="avatar"
                                        size="md"
                                        style={{ marginTop: '24px' }}
                                        className="mx-auto mb-4 border-2 border-blue-gray-200 rounded-full" // Thêm lớp CSS để tạo viền xung quanh avatar
                                    />
                                </a>
                            </Dropdown>
                        </div>
                    </div>
                ) : (
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        <div className="span-id" >
                            <i className="fa-regular fa-user" style={{ fontSize: "22px" }}></i>
                            Login
                        </div>
                    </Link>
                )}
            </section>
            <div className="header-container">
                <div className="header-logo">
                    <Link to='/' ><img alt="" src="./img/logo/logo.png"></img></Link>
                </div>
                <ul className="nav-menu">
                    <li className={selectedItem === 0 ? 'active' : ''}>
                        <Link
                            to='/'
                        >
                            Home
                        </Link>
                    </li>
                    <li className={selectedItem === 1 ? 'active' : ''}>
                        <Link
                            to='/product'
                        >
                            Men
                        </Link>
                    </li>
                    <li className={selectedItem === 2 ? 'active' : ''}>
                        <Link
                            to='/productwm'
                        >
                            Women
                        </Link>
                    </li>
                    <li className={selectedItem === 3 ? 'active' : ''}>
                        <Link
                            href="#"
                        >
                            Kids
                        </Link>
                    </li>
                    <li className={selectedItem === 4 ? 'active' : ''}>
                        <Link
                            href="#"
                        >
                            History
                        </Link>
                    </li>
                </ul>
                <div className="nav-login-cart">
                    {/* <button>Login</button> */}
                    <Link to="/Cart"><i className="fa-solid fa-cart-shopping" style={{ fontSize: '35px', color: 'black' }}></i></Link>
                    {/* <div className="cart-count">0</div> */}
                </div>
            </div>
        </header >
    )
}