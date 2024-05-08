import React, { useState, useEffect } from 'react';
import '../../assets/css/productdetail.css';
import { Card, Row, Col, Modal, Rate, message } from 'antd';
import { Button, Rating, Typography } from '@material-tailwind/react';
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
    const [rate, setRate] = useState([]);
    useEffect(() => {
        getProduct(id);
    }, []);



    const getProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/${id}`);
            const comment = await axios.get(`http://localhost:8080/api/comment/${id}`)
            setRate(comment.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log(rate);

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
            price: data[0].sanphamgia,
            remain: data[0].soluongcon
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

    const [active, setActive] = useState('');
    const handleGalleryImageClick = (imageUrl) => {
        setActive(imageUrl);
    };

    const [rated, setRated] = React.useState(4);

    const totalReviews = rate.length; // Số lượng đánh giá
    let totalStars = 0; // Tổng số sao
    rate.forEach(item => {
        totalStars += item.sao; // Tính tổng số sao
    });

    const handleformatDate = (dateString) => {
        const orderDate = new Date(dateString);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return orderDate.toLocaleDateString('en-GB', options);
    };

    const averageRating = totalStars / totalReviews;

    return (
        <div>
            <HeaderHome />
            <Card style={{ padding: '18px', margin: '40px', border: '1px solid #cfcdcd', borderRadius: '0' }}>
                <Row>
                    <Col span={12}>
                        {data[0] && (
                            <div>
                                <div className="main-image-container">
                                    <img
                                        alt="Main Product"
                                        src={active ? active : `http://localhost:8080/upload/${data[0].sanphamhinhdaidien}`}
                                        className="main-image"
                                    />
                                </div>
                                <div className="gallery-container flex gap-4" style={{ justifyContent: 'center', marginTop: '10px' }}>
                                    {data[0].sanphamhinhdaidien && (
                                        <span>
                                            <img
                                                onClick={() => handleGalleryImageClick(`http://localhost:8080/upload/${data[0].sanphamhinhdaidien}`)}
                                                src={`http://localhost:8080/upload/${data[0].sanphamhinhdaidien}`}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt="gallery-image"
                                            />
                                        </span>
                                    )}
                                    {data[0].anh1 && (
                                        <span>
                                            <img
                                                onClick={() => handleGalleryImageClick(data[0].anh1)}
                                                src={data[0].anh1}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt="gallery-image"
                                            />
                                        </span>
                                    )}
                                    {data[0].anh2 && (
                                        <span>
                                            <img
                                                onClick={() => handleGalleryImageClick(data[0].anh2)}
                                                src={data[0].anh2}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt="gallery-image"
                                            />
                                        </span>
                                    )}
                                    {data[0].anh3 && (
                                        <span>
                                            <img
                                                onClick={() => handleGalleryImageClick(data[0].anh3)}
                                                src={data[0].anh3}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt="gallery-image"
                                            />
                                        </span>
                                    )}
                                    {data[0].anh4 && (
                                        <span>
                                            <img
                                                onClick={() => handleGalleryImageClick(data[0].anh4)}
                                                src={data[0].anh4}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt="gallery-image"
                                            />
                                        </span>
                                    )}
                                    {data[0].anh5 && (
                                        <span>
                                            <img
                                                onClick={() => handleGalleryImageClick(data[0].anh5)}
                                                src={data[0].anh5}
                                                className="h-20 max-w-full cursor-pointer rounded-lg object-cover object-center"
                                                alt="gallery-image"
                                            />
                                        </span>
                                    )}
                                    {/* Các ảnh tiếp theo ở đây */}
                                </div>
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
                                                value={averageRating}
                                            />
                                            <span className="rating-count">({totalReviews} reviews)</span>
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

            <div style={{ padding: '60px 100px' }}>
                <h2 style={{ fontSize: '35px', fontWeight: 'bold', marginBottom: '5px', textAlign: 'center' }}>Customer Reviews</h2>
                <p style={{ marginBottom: 0, textAlign: 'center', color: '#a3a3a3' }}>leave your review below</p>
                {/* Sample Review */}
                {/* <div style={{ display: 'flex', justifyContent: 'center', margin: '15px' }}>
                    <Button
                        className='border-black'
                        style={{ borderRadius: '0 !important', border: '1px solid #333' }}
                        variant="outlined">Write a review
                    </Button>
                </div> */}
                <div className="flex items-center gap-2 font-bold text-blue-gray-500" style={{ justifyContent: 'center', paddingBottom: '20px', borderBottom: '1px solid rgb(231 231 231)', marginBottom: '20px', fontSize: '22px' }}>
                    {totalReviews}
                    <Rate character={<span className="custom-rate-icon">&#9733;</span>}
                        value={averageRating} onChange={(value) => setRated(value)}
                        style={{ fontSize: '22px', color: 'black' }}
                        allowHalf
                    />
                    <Typography color="blue-gray" className="font-medium text-blue-gray-500" style={{ marginBottom: '0' }}>
                        Based on {totalReviews} Reviews
                    </Typography>
                </div>
                {rate?.map(item => (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
                        <Avatar alt="User Avatar" src="/static/images/avatar/1.jpg" sx={{ width: 56, height: 56, marginRight: '20px' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>{item.khachhangten}</span>
                                    <Rate character={<span className="custom-rate-icon">&#9733;</span>}
                                        allowHalf
                                        defaultValue={item.sao} />
                                </div>
                                <span style={{ fontSize: '15px', color: '#474848' }}>{handleformatDate(item.ngaydanhgia)}</span>
                            </div>
                            <p style={{ marginBottom: 0, fontSize: '16px' }}>{item.noidung}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductDetailPage;
