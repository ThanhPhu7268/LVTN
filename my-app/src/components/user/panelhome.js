import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'antd';

const PanelHome = () => {
    const carouselRef = useRef(null);
    const [autoplayInterval, setAutoplayInterval] = useState(5000); // Thời gian chuyển đổi ảnh (mili giây)

    useEffect(() => {
        const interval = setInterval(() => {
            carouselRef.current.next();
        }, autoplayInterval);

        return () => {
            clearInterval(interval);
        };
    }, [autoplayInterval]);

    return (
        <Carousel
            ref={carouselRef}
            autoplay={false}
            dotPosition="bottom"
            effect="fade"
            speed={1500} // Tốc độ chuyển đổi (mili giây)
        >
            <div>
                <img src="./img/banner/banner5.avif" alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
                <img src="./img/banner/banner3.avif" alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
                <img src='./img/banner/banner1.jpg' alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
                <img src="./img/banner/banner4.jpg" alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
            </div>
            <div>
                <img src="./img/banner/banner2.jpg" alt="banner cua trang chu" style={{ width: "100%", height: "100%" }} />
            </div>
        </Carousel>
    );
};

export default PanelHome;