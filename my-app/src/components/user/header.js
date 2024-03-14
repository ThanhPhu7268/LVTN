import React from "react";
import '../../assets/css/hearder.css'
import { useState } from "react";
import Link from "antd/es/typography/Link";

export default function HeaderHome() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };
    return (
        <header>
            <section className="section-nav">
                <div className="search-bar">
                    <input type="text" placeholder="Search..." />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div className="span-id" style={{ marginRight: '10px' }}>
                    {/* <div><i class="fa-solid fa-magnifying-glass"></i></div> */}
                    <div><i class="fa-regular fa-user"></i>Login</div>
                </div>
            </section>
            <div className="header-container">
                <div className="header-logo">
                    <a><img alt="" src="./img/logo/logo.png"></img></a>
                </div>
                <ul className="nav-menu">
                    <li className={selectedItem === 0 ? 'active' : ''}>
                        <a
                            href="#"
                            onClick={() => handleItemClick(0)}
                            style={{ color: selectedItem === 0 ? 'red' : 'black' }}
                        >
                            Home
                        </a>
                    </li>
                    <li className={selectedItem === 1 ? 'active' : ''}>
                        <a
                            href="#"
                            onClick={() => handleItemClick(1)}
                            style={{ color: selectedItem === 1 ? 'red' : 'black' }}
                        >
                            Men
                        </a>
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
                    <Link to="/Cart"><i className="fa-solid fa-cart-shopping" style={{ fontSize: '35px' }}></i></Link>
                    <div className="cart-count">0</div>
                </div>
            </div>
        </header >
    )
}