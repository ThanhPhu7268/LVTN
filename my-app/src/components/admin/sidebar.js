import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/sidebar.css'

export default function SideBar() {
    return (
        <div>
            <nav className='sidebar'>
                <header>
                    <div className='image-text'>
                        <span className='image'>
                            <img src='logo' alt='logo nhe' />
                        </span>

                        <div className='text header-text'>
                            <span className='name'>OtisWatch</span>
                            <span className='profession'>Ecommerce Website </span>
                        </div>
                    </div>

                    <i className="fa-solid fa-chevron-right toggle"></i>
                </header>

                <div className='menu-bar'>
                    <div className='menu'>
                        <li className='search-box'>
                            <i class="fa-solid fa-magnifying-glass icon"></i>
                            <input type='search' placeholder='Search...'></input>
                        </li>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <Link>
                                    <i class="fa-solid fa-house icon"></i>
                                    <span className='text nav-text'>DASHBOARD</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <Link>
                                    <i class="fa-solid fa-house icon"></i>
                                    <span className='text nav-text'>Quản lý đơn hàng</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <Link>
                                    <i class="fa-solid fa-house icon"></i>
                                    <span className='text nav-text'>Quản lý sản phẩm</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <Link>
                                    <i class="fa-solid fa-house icon"></i>
                                    <span className='text nav-text'>Quản lý tài khoản</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className='menu-links'>
                            <li className='nav-link'>
                                <Link>
                                    <i class="fa-solid fa-house icon"></i>
                                    <span className='text nav-text'>Quản lý thương hiệu</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
