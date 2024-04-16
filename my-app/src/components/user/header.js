import React from "react";
import '../../assets/css/hearder.css'
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Dropdown } from "antd";
import { Avatar, Input, Tooltip } from '@material-tailwind/react';
import axios from 'axios';

export default function HeaderHome() {
    const navigate = useNavigate();

    const calculateTotalIdInCart = () => {
        // Lấy danh sách các sản phẩm từ localStorage
        const cartItems = JSON.parse(window.localStorage.getItem('cart')) || [];

        // Khởi tạo biến để lưu tổng số id
        let totalIds = 0;

        // Duyệt qua mỗi sản phẩm trong giỏ hàng và tính tổng số id
        cartItems.forEach(item => {
            // Tăng tổng số id lên 1 cho mỗi sản phẩm trong giỏ hàng
            totalIds += 1;
        });

        // Trả về tổng số id
        return totalIds;
    };
    const quantity = calculateTotalIdInCart();
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
                <div className="w-full md:w-72">
                    <Input
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                    />
                </div>
                <Tooltip content="WishList">
                    <span style={{ marginLeft: '26%' }}>
                        <svg style={{ color: '#747474' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 19.654l-.758-.685q-2.448-2.236-4.05-3.829t-2.529-2.808t-1.295-2.201T3 8.15q0-1.908 1.296-3.204T7.5 3.65q1.32 0 2.475.675T12 6.288Q12.87 5 14.025 4.325T16.5 3.65q1.908 0 3.204 1.296T21 8.15q0 .996-.368 1.98t-1.295 2.202t-2.52 2.808t-4.06 3.83zm0-1.354q2.4-2.17 3.95-3.716t2.45-2.685t1.25-2.015T20 8.15q0-1.5-1-2.5t-2.5-1q-1.194 0-2.204.682t-1.808 2.053h-.976q-.818-1.39-1.818-2.063q-1-.672-2.194-.672q-1.48 0-2.49 1T4 8.15q0 .856.35 1.734t1.25 2.015t2.45 2.675T12 18.3m0-6.825" /></svg>
                    </span>
                </Tooltip>
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
                    <Tooltip content="Login">
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <svg className="span-id" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M128 28a100 100 0 1 0 100 100A100.11 100.11 0 0 0 128 28M68.87 198.42a68 68 0 0 1 118.26 0a91.8 91.8 0 0 1-118.26 0m124.3-5.55a75.61 75.61 0 0 0-44.51-34a44 44 0 1 0-41.32 0a75.61 75.61 0 0 0-44.51 34a92 92 0 1 1 130.34 0M128 156a36 36 0 1 1 36-36a36 36 0 0 1-36 36" /></svg>
                        </Link>
                    </Tooltip>
                )}
            </section>
            <div className="header-container" style={{ background: 'rgba(249,250,251)' }}>
                <div className="header-logo">
                    <Link to='/' ><img alt="" src="./img/logo/logo.png"></img></Link>
                </div>
                <ul className="nav-menu">
                    <li className="hv-mid">
                        <Link
                            to='/'
                        >
                            Home
                        </Link>
                    </li>
                    <li className="hv-mid">
                        <Link
                            to='/product'
                        >
                            Men
                        </Link>
                    </li>
                    <li className="hv-mid">
                        <Link
                            to='/productwm'
                        >
                            Women
                        </Link>
                    </li>
                    <li className="hv-mid">
                        <Link
                            to='/productcp'
                        >
                            Couple
                        </Link>
                    </li>
                    <li className="hv-mid">
                        <Link
                            href="#"
                        >
                            History
                        </Link>
                    </li>
                </ul>
                <div className="nav-login-cart">
                    {/* <button>Login</button> */}
                    <Link to="/Cart"><svg style={{ width: '45px', height: '45px', color: '#747474' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2.237 2.288a.75.75 0 1 0-.474 1.424l.265.088c.676.225 1.124.376 1.453.529c.312.145.447.262.533.382c.087.12.155.284.194.626c.041.361.042.833.042 1.546v2.672c0 1.367 0 2.47.117 3.337c.12.9.38 1.658.982 2.26c.601.602 1.36.86 2.26.982c.866.116 1.969.116 3.336.116H19a.75.75 0 0 0 0-1.5h-8c-1.435 0-2.436-.002-3.192-.103c-.733-.099-1.122-.28-1.399-.556a1.496 1.496 0 0 1-.255-.341h9.905c.448 0 .842 0 1.17-.035c.354-.039.698-.124 1.02-.337c.324-.213.537-.495.712-.806c.161-.286.317-.649.493-1.061l.467-1.09c.385-.896.706-1.647.867-2.257c.168-.637.212-1.302-.184-1.903c-.396-.6-1.025-.822-1.676-.919c-.625-.092-1.441-.092-2.417-.092H5.707a5.204 5.204 0 0 0-.009-.083c-.055-.485-.176-.93-.467-1.333c-.291-.404-.675-.66-1.117-.865c-.417-.194-.946-.37-1.572-.58zM5.75 6.75V9.5c0 1.172.001 2.054.057 2.75h10.215c.496 0 .809-.001 1.046-.027c.219-.023.303-.062.356-.097c.053-.035.122-.097.23-.289c.117-.208.24-.495.436-.95l.429-1c.414-.968.69-1.616.819-2.106c.126-.476.062-.62.014-.694c-.049-.073-.157-.189-.644-.26c-.501-.075-1.205-.077-2.257-.077zm-.5 12.75a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 0 0-4.5 0m2.25.75a.75.75 0 1 1 0-1.5a.75.75 0 0 1 0 1.5m9 1.5a2.25 2.25 0 1 1 0-4.5a2.25 2.25 0 0 1 0 4.5m-.75-2.25a.75.75 0 1 0 1.5 0a.75.75 0 0 0-1.5 0" clip-rule="evenodd" /></svg></Link>
                    <div className="cart-count">{quantity}</div>
                </div>
            </div>
        </header >
    )
}