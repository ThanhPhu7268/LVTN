import React, { useState } from 'react';
import { Layout, Row, Col, Card, Button, Pagination, Slider, InputNumber } from 'antd';
import '../../assets/css/product.css'
import HeaderHome from './header';
const { Content, Sider } = Layout;

const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [priceRange, setPriceRange] = useState([0, 100]); // Khoảng giá
    const pageSize = 8; // Số sản phẩm hiển thị trên mỗi trang

    // Dữ liệu sản phẩm
    const products = [
        { id: 1, name: 'Product 1', price: 10, image: 'https://wscdn.vn/upload/image/uploads/images/OP990-45ADGS-GL-X-1-1654832239373.webp' },
        { id: 2, name: 'Product 2', price: 20, image: 'https://wscdn.vn/upload/image/OP89322AGSR-N-1-1093122827-1599567497.jpg' },
        { id: 3, name: 'Product 3', price: 30, image: 'https://wscdn.vn/upload/image/Thiet-ke-chua-co-ten-1-743370860-689369278.webp' },
        { id: 4, name: 'Product 4', price: 72, image: 'https://wscdn.vn/upload/image/uploads/images/OP89322GS-T-1-1655199810349.webp' },
        { id: 5, name: 'Product 5', price: 30, image: 'https://wscdn.vn/upload/image/Thiet-ke-chua-co-ten-16-1399303158-1972365369.webp' },
        { id: 6, name: 'Product 6', price: 70, image: 'https://wscdn.vn/upload/image/1-KHUNG-SP-6676612-550872714.webp' },
        { id: 7, name: 'Product 7', price: 40, image: 'https://wscdn.vn/upload/image/uploads/images/A500WA-1DF-1681802995930.webp' },
        { id: 8, name: 'Product 8', price: 50, image: 'https://wscdn.vn/upload/image/uploads/images/B650WC-5ADF-1681871766855.webp' },
        { id: 9, name: 'Product 9', price: 55, image: 'https://wscdn.vn/upload/image/Thiet-ke-chua-co-ten-1-743370860-689369278.webp' },
        { id: 10, name: 'Product 10', price: 68, image: 'https://wscdn.vn/upload/image/Thiet-ke-chua-co-ten-1-743370860-689369278.webp' },
        { id: 11, name: 'Product 11', price: 22, image: 'https://wscdn.vn/upload/image/Thiet-ke-chua-co-ten-1-743370860-689369278.webp' },
        // Thêm dữ liệu sản phẩm khác nếu cần
    ];

    // Tính toán số trang
    const totalPage = Math.ceil(products.length / pageSize);

    // Lấy danh sách sản phẩm trên trang hiện tại và theo khoảng giá
    const currentProducts = products
        .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Các tùy chọn lọc sản phẩm
    const filterOptions = ['Option 1', 'Option 2', 'Option 3'];

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
                            max={100}
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
                                max={100}
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
                            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    className="product-card"
                                    cover={<img alt={product.name} src={product.image} className='img-conten' />}
                                    hoverable
                                >
                                    <Card.Meta title={product.name} description={`$${product.price}`} />
                                </Card>
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