import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../assets/css/home.css';
import axios from 'axios';


const BrandsCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    })

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/thuonghieu`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
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
            <div className='img-brands' style={{ display: 'flex' }}>
                <img src='https://cdn.galle.vn/media/amasty/webp/wysiwyg/z3739362259835_a026dde213099895fcc39e723c7a3562_jpg.webp' style={{ width: '50%' }} />
                <img src='https://cdn.galle.vn/media/amasty/webp/wysiwyg/z3739362264568_cedeb06bdab76eace15149fc6ce95ae3_jpg.webp' style={{ width: '50%' }} />
            </div>

            <Carousel responsive={responsive} className="brands-carousel">
                {products.map((brand, index) => (
                    <div key={index} className="brand-item">
                        <img src={brand.thuonghieuhinhanh} alt={`Brand ${index + 1}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default BrandsCarousel;