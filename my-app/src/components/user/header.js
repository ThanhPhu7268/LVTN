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

                <Link href="/login"><div className="span-id"> <i class="fa-regular fa-user" style={{ fontSize: '22px' }}></i>Login</div></Link>
            </section>
            <div className="header-container">
                <div className="header-logo">
                    <Link href="/"><img alt="" src="./img/logo/logo.png"></img></Link>
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
                    <Link href="/Cart"><i className="fa-solid fa-cart-shopping" style={{ fontSize: '35px', color: 'black' }}></i></Link>
                    <div className="cart-count">0</div>
                </div>
            </div>
        </header >
    )
}