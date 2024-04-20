import React, { useState, useEffect } from 'react';
import '../../assets/css/productdetail.css';
import { Card, Row, Col, Modal, Rate, message } from 'antd';
import { Button } from '@material-tailwind/react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import HeaderHome from './header';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

const { Meta } = Card;

const ProductDetailPage = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getProduct(id);
    }, []);

    const getRandomRating = () => {
        return Math.random() * (5 - 3) + 3; // Generates a random number between 3 and 5
    };

    const getProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setVisible(true);
    };

    const handleBuyNow = () => {
        console.log('Buy now');
    };

    const [totalPrice, setTotalPrice] = useState(0);

    const calculateTotalPrice = (cartItems) => {
        let totalUSD = 0;
        cartItems.forEach(item => {
            const priceUSD = item.price;
            totalUSD += priceUSD * item.quantity;
        });
        setTotalPrice(totalUSD);

        // Lưu tổng tiền vào localStorage
        window.localStorage.setItem('totalPrice', totalUSD);
    };

    const addCartDetail = async () => {
        const user = JSON.parse(window.localStorage.getItem('user'));
        if (!user) {
            message.warning('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
            return;
        }
        if (data[0].soluongcon === 0) {
            message.warning('Sản phẩm đã hết hàng. Không thể thêm vào giỏ hàng!');
            return;
        }
        const response = await axios.get(`http://localhost:8080/api/cart/${user.idkhachhang}`);
        let product = {
            quantity: 1,
            idcart: response.data[0].idgiohang,
            idproduct: id,
            productName: data[0].sanphamten,
            productImg: data[0].sanphamhinhdaidien,
            price: data[0].sanphamgia
        };
        let isHas = 0;
        let cart = JSON.parse(window.localStorage.getItem('cart'));
        if (cart) {
            for (const key of cart) {
                if (key.idproduct === product.idproduct) {
                    key.quantity++;
                    isHas = 1;
                    break;
                }
            }
            if (isHas === 0) {
                cart.push(product);
            }
        } else {
            cart = [product];
        }
        message.success('Đã Thêm Vào Giỏ Hàng!');
        localStorage.setItem('cart', JSON.stringify(cart));

        // Cập nhật tổng giá trị của giỏ hàng sau khi thêm sản phẩm
        calculateTotalPrice(cart);
    };

    return (
        <div>
            <HeaderHome />
            <Card style={{ padding: '18px', margin: '40px', border: '1px solid #cfcdcd', borderRadius: '0' }}>
                <Row>
                    <Col span={12}>
                        {data[0] && (
                            <div className="main-image-container">
                                <img
                                    alt="Main Product"
                                    src={`http://localhost:8080/upload/${data[0].sanphamhinhdaidien}`}
                                    className="main-image"
                                />
                            </div>
                        )}
                    </Col>
                    <Col span={12}>
                        {data[0] && (
                            <div className="product-infomation">
                                <div className="product-info">
                                    <h2 className="product-name">{data[0].sanphamten}</h2>
                                    <div className="flex">
                                        <p className="product-price" style={{ fontSize: '25px', fontWeight: 'bold', color: 'black', marginRight: '20px', paddingRight: '14px', borderRight: '1px solid rgb(199 188 188)' }}>
                                            ${data[0].sanphamgia}
                                        </p>
                                        <div className="product-rating">
                                            <Rate
                                                style={{ color: '#000', fontSize: 24, paddingTop: '3px' }}
                                                character={<span className="custom-rate-icon">&#9733;</span>}
                                                allowHalf
                                                defaultValue={getRandomRating()}
                                            />
                                            <span className="rating-count">(18 reviews)</span>
                                        </div>
                                    </div>
                                    <p style={{ width: '90%', paddingTop: '10px', borderTop: '1px solid rgb(199 188 188)', textAlign: 'justify' }}>{data[0].sanphammota}</p>
                                    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                                        <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'black', marginBottom: '5px' }}>Features</p>
                                        <div style={{ color: '#0000007d' }}>
                                            <i className="fa-solid fa-truck"></i> Free Delivery
                                        </div>
                                        <div style={{ color: '#0000007d' }}>
                                            <i className="fa-solid fa-shop"></i> Free Store Pickup
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="text-black bg-white"
                                            style={{ marginTop: "10px", width: "300px", borderRadius: '0', border: '1px solid #333' }}
                                            onClick={addCartDetail}
                                            icon={<ShoppingCartOutlined />}
                                        >
                                            <i className="fa-solid fa-cart-shopping"></i> Add to Cart ({data[0].soluongcon})
                                        </Button>
                                        <Button
                                            type="primary"
                                            size="large"
                                            className="buy-now-button"
                                            style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                            onClick={handleBuyNow}
                                        >
                                            <i className="fa-regular fa-heart" style={{ fontSize: '15px' }}></i>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Col>
                </Row>
                <Modal visible={visible} onCancel={() => setVisible(false)} footer={null}>
                    <img alt="Selected Product" src={selectedImage} className="modal-image" />
                </Modal>
            </Card>

            <div style={{ padding: '40px' }}>
                <h2 style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '5px', textAlign: 'center' }}>Customer Reviews</h2>
                <p style={{ marginBottom: 0, textAlign: 'center', color: '#a3a3a3' }}>leave your review below</p>
                {/* Sample Review */}
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56, marginRight: '20px' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '10px' }}>John Doe</span>
                            <Rate character={<span className="custom-rate-icon">&#9733;</span>}
                                allowHalf
                                defaultValue={getRandomRating()} />
                        </div>
                        <p style={{ marginBottom: 0 }}>Great product! Really satisfied with the quality.</p>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56, marginRight: '20px' }} />
                    <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ fontSize: '16px', fontWeight: 'bold', marginRight: '10px' }}>John Doe</span>
                            <Rate character={<span className="custom-rate-icon">&#9733;</span>}
                                allowHalf
                                defaultValue={getRandomRating()} />
                        </div>
                        <p style={{ marginBottom: 0 }}>Great product! Really satisfied with the quality.</p>
                    </div>
                </div>
                {/* Add more reviews here */}
            </div>
        </div>
    );
}

export default ProductDetailPage;
