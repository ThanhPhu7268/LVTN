import React, { useState, useEffect } from 'react';
import '../../assets/css/productdetail.css';
import { Card, Row, Col, Modal, Rate, Button, Image, message } from 'antd';
import HeaderHome from './header';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const { id } = useParams();
    const [data, setData] = useState([])

    const getRandomRating = () => {
        return Math.random() * (5 - 3) + 3; // Generates a random number between 3 and 5
    };
    useEffect(() => {
        getProduct(id)
        // findIdCartByIdUser();
    }, []);

    const getProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [thumbnailImages, setThumbnailImages] = useState();
    const [cartItems, setCartItems] = useState([]); // Initialize cartItems and setCartItems using useState


    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setVisible(true);
    };

    const handleThumbnailClick = (imageUrl) => {
        setSelectedImage(imageUrl);
    };

    const handleBuyNow = () => {
        // Handle buy now event
        console.log('Buy now');
    };
    let cart = JSON.parse(window.localStorage.getItem('cart'))


    const addCartDetail = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'))
        const response = await axios.get(`http://localhost:8080/api/cart/${user.idkhachhang}`);
        let product = {
            quantity: 1,
            idcart: response.data[0].idgiohang,
            idproduct: id,
            productName: data[0].sanphamten,
            productImg: data[0].sanphamhinhdaidien,
            price: data[0].sanphamgia
        }
        let isHas = 0
        if (cart) {
            for (const key of cart) {
                if (key.idproduct == product.idproduct) {
                    key.quantity++
                    isHas = 1
                    break
                }
            }
            if (isHas == 0) {
                cart.push(product)
            }
        } else {
            cart = new Array()
            cart.push(product)
        }
        message.success('Đã Thêm Vào Giỏ Hàng!')
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // const findIdCartByIdUser = async () => {
    //     try {
    //         const user = JSON.parse(window.localStorage.getItem('user'))
    //         const response = await axios.get(`http://localhost:8080/api/cart/${user.idkhachhang}`);
    //         setProduct({
    //             quantity: 1,
    //             idcart: response.data[0].idgiohang,
    //             idproduct: id
    //         })
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // }
    return (
        <div>
            <HeaderHome />
            <Card>
                <Row>
                    <Col span={12}>
                        {data[0] && <div className="main-image-container">
                            <img alt="Main Product" src={selectedImage || data[0].sanphamhinhdaidien} className="main-image" />
                        </div>}
                        {/* <div className="thumbnail-images">
                            {thumbnailImages.map((imageUrl, index) => (
                                <img
                                    key={index}
                                    alt={`Product ${index}`}
                                    src={imageUrl}
                                    className={`thumbnail-image ${selectedImage === imageUrl ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(imageUrl)}
                                />
                            ))}
                        </div> */}

                    </Col>
                    <Col span={12}>
                        {data[0] && <div className="product-infomation">
                            <div className="product-info">
                                <h2 className="product-name">{data[0].sanphamten}</h2>
                                <p className="product-price">${data[0].sanphamgia}</p>
                                <div className="product-rating">
                                    <Rate style={{ color: '#000', fontSize: 24 }}
                                        character={<span className="custom-rate-icon">&#9733;</span>}
                                        allowHalf
                                        defaultValue={getRandomRating()} />
                                    <span className="rating-count">(18 reviews)</span>
                                </div>
                                <Button type="primary" size="large" className="buy-now-button" onClick={handleBuyNow}>
                                    Buy Now
                                </Button>
                                <Button type="primary" size="large" className="add-to-cart-button" onClick={addCartDetail}>
                                    Add to Cart
                                </Button>
                            </div>
                            <p>{data[0].sanphammota}</p>
                        </div>
                        }
                    </Col>
                </Row>
                <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
                    <img alt="Selected Product" src={selectedImage} className="modal-image" />
                </Modal>
            </Card>
        </div>
    );
}


export default ProductDetailPage;