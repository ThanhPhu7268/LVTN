import React from "react";
import '../../assets/css/hearder.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from 'axios';

export default function HeaderHome() {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

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
                                    {user.taikhoanten}<DownOutlined />
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
                            onClick={() => handleItemClick(0)}
                            style={{ color: selectedItem === 0 ? 'red' : 'black' }}
                        >
                            Home
                        </Link>
                    </li>
                    <li className={selectedItem === 1 ? 'active' : ''}>
                        <Link
                            to='/product'
                            onClick={() => handleItemClick(1)}
                            style={{ color: selectedItem === 1 ? 'red' : 'black' }}
                        >
                            Men
                        </Link>
                    </li>
                    <li className={selectedItem === 2 ? 'active' : ''}>
                        <a
                            href="#"
                            onClick={() => handleItemClick(2)}
                            style={{ color: selectedItem === 2 ? 'red' : 'black' }}
                        >
                            Women
                        </a>
                    </li>
                    <li className={selectedItem === 3 ? 'active' : ''}>
                        <a
                            href="#"
                            onClick={() => handleItemClick(3)}
                            style={{ color: selectedItem === 3 ? 'red' : 'black' }}
                        >
                            Kids
                        </a>
                    </li>
                    <li className={selectedItem === 4 ? 'active' : ''}>
                        <a
                            href="#"
                            onClick={() => handleItemClick(4)} style={{ color: selectedItem === 4 ? 'red' : 'black' }}
                        >
                            History
                        </a>
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