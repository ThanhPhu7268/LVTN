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
                <img src='https://www.omegawatches.com/media/wysiwyg/paris2024-chronoscope-stainless_steel-desktop-kv-4.jpg' style={{ width: '60%' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <img src='https://www.omegawatches.com/media/wysiwyg/paris2024-chronoscope-stainless_steel-desktop-kv_back.png' />
                    <img src='https://www.omegawatches.com/media/wysiwyg/watch-31030425004001-closeup-back.png' style={{}} />
                </div>
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