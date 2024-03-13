import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/home.css';


const BrandsCarousel = () => {
    const brands = [
        './img/brand/ca.webp',
        './img/brand/cs.webp',
        './img/brand/dk.webp',
        './img/brand/gk.webp',
        './img/brand/hb.webp',
        './img/brand/lg.webp',
        './img/brand/seiko.webp',
        './img/brand/om.webp',
        './img/brand/logo-tissot.webp',
        './img/brand/om.webp',
    ];

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    return (
        <div>
            <div className='img-brands'>
                <img src='https://cdn.galle.vn/media/amasty/webp/wysiwyg/z3739362259835_a026dde213099895fcc39e723c7a3562_jpg.webp' style={{ width: '50%' }} />
                <img src='https://cdn.galle.vn/media/amasty/webp/wysiwyg/z3739362264568_cedeb06bdab76eace15149fc6ce95ae3_jpg.webp' style={{ width: '50%' }} />
            </div>

            <Carousel responsive={responsive} className="brands-carousel">
                {brands.map((brand, index) => (
                    <div key={index} className="brand-item">
                        <img src={brand} alt={`Brand ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default BrandsCarousel;