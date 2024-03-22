import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Pagination, Slider, InputNumber, Rate } from 'antd';
import '../../assets/css/product.css'
import HeaderHome from './header';
import { Link } from "react-router-dom";
import axios from 'axios';
const { Content, Sider } = Layout;


const getRandomRating = () => {
    return Math.random() * (5 - 3) + 3; // Generates a random number between 3 and 5
};

const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [priceRange, setPriceRange] = useState([0, 300]); // Khoảng giá
    const [products, setProducts] = useState([]);
    const pageSize = 8; // Số sản phẩm hiển thị trên mỗi trang

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    // Tính toán số trang
    const totalPage = Math.ceil(products.length / pageSize);

    // Lấy danh sách sản phẩm trên trang hiện tại và theo khoảng giá
    const currentProducts = products
        .filter((product) => product.sanphamgia >= priceRange[0] && product.sanphamgia <= priceRange[1])
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Các tùy chọn lọc sản phẩm
    const filterOptions = ['Product 1', 'Product 2', 'Option 3'];

    // Handlers cho các tùy chọn lọc sản phẩm
    const handleFilterOption = (option) => {
        // Xử lý logic khi người dùng chọn tùy chọn lọc
    };

    // Handler cho sự kiện thay đổi trang
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handler cho sự kiện thay đổi khoảng giá
    const handlePriceRangeChange = (value) => {
        setPriceRange(value);
    };

    return (
        <div>
            <HeaderHome />
            <Layout className="product-page">
                <Sider width={280} className='sider-bar' style={{ background: 'white' }}>
                    {/* Hiển thị các tùy chọn lọc sản phẩm */}
                    <div className="filter-options">
                        {filterOptions.map((option) => (
                            <Button key={option} onClick={() => handleFilterOption(option)}>
                                {option}
                            </Button>
                        ))}
                    </div>
                    {/* Thanh kéo thả để chọn khoảng giá */}
                    <div className="price-slider">
                        <Slider
                            range
                            min={0}
                            max={300}
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                        />
                        <div className="price-input">
                            <InputNumber
                                min={0}
                                max={100}
                                value={priceRange[0]}
                                onChange={(value) => handlePriceRangeChange([value, priceRange[1]])}
                            />
                            <span>-</span>
                            <InputNumber
                                min={0}
                                max={200}
                                value={priceRange[1]}
                                onChange={(value) => handlePriceRangeChange([priceRange[0], value])}
                            />
                        </div>
                    </div>
                </Sider>
                <Content>
                    <Row gutter={[16, 16]}>
                        {/* Hiển thị sản phẩm */}
                        {currentProducts.map((product) => (
                            <Col key={product.idsanpham} xs={24} sm={12} md={8} lg={6}>
                                <Link to={`/product/${product.idsanpham}`} style={{ textDecoration: 'none' }}>
                                    <Card
                                        className="card--product"
                                        cover={<img alt={product.sanphamten} src={product.sanphamhinhdaidien} className='img-conten' />}
                                        hoverable
                                    >
                                        <Card.Meta title={product.sanphamten} description={`$${product.sanphamgia}`} />
                                        <Rate allowHalf defaultValue={getRandomRating()} />
                                    </Card>
                                </Link>
                            </Col>

                        ))}
                    </Row>
                    {/* Hiển thị thanh phân trang */}
                    <Pagination
                        className="pagination"
                        current={currentPage}
                        total={products.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </Content>
            </Layout>
        </div>
    );
};

export default ProductPage;