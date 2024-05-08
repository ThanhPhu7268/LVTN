import React, { useState, useEffect } from 'react';
import { Layout, Row, Col, Card, Button, Pagination, Slider, InputNumber, Rate, Radio, Collapse, Input, } from 'antd';
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import '../../assets/css/product.css'
import HeaderHome from './header';
import { Link } from "react-router-dom";
import axios from 'axios';
const { Content, Sider } = Layout;
const { Panel } = Collapse;


const ProductPage = () => {
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [priceRange, setPriceRange] = useState([0, 99999]); // Khoảng giá
    const [products, setProducts] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedWatchType, setSelectedWatchType] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedMaterial, setSelectedMaterial] = useState(null);
    const [selectedDialStyle, setSelectedDialStyle] = useState(null);
    const pageSize = 8; // Số sản phẩm hiển thị trên mỗi trang
    const [machine, setMachine] = useState([]);
    const [size, setSize] = useState([]);
    const [brand, setBrand] = useState([]);
    const [type, setType] = useState([]);
    const [material, setMaterial] = useState([]);

    useEffect(() => {
        getProducts()
        getMachine()
        getSize()
        getBrand()
        getType()
        getMaterial()
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/gioitinh`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getType = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/type`);
            setType(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const findProductByType = async (types) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/kieumat/${types}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getMaterial = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/material`);
            setMaterial(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const findProductByMaterial = async (types) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/chatlieu/${types}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getBrand = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/thuonghieu`);
            setBrand(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const findProductByBrand = async (thuonghieu) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/thuonghieu/${thuonghieu}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getMachine = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/machine`);
            setMachine(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getSize = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/size`);
            setSize(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const findProductBySize = async (idsize) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/kichthuoc/${idsize}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const findProductByMachine = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/loaimay/${id}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const findProductByName = async (ten) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/timtheoten/${ten}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleChangeName = (event) => {
        if (event.target.value !== '') {
            findProductByName(event.target.value);
        }
    }
    // Tính toán số trang
    const totalPage = Math.ceil(products.length / pageSize);
    // Lấy danh sách sản phẩm trên trang hiện tại và theo khoảng giá
    const currentProducts = products
        .filter((product) => product.sanphamgia >= priceRange[0] && product.sanphamgia <= priceRange[1])
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);

    // Handlers cho các tùy chọn lọc sản phẩm
    const handleFilterOption = (option, filterType) => {
        switch (filterType) {
            case 'brand':
                setSelectedBrand(option);
                break;
            case 'watchType':
                setSelectedWatchType(option);
                break;
            case 'size':
                setSelectedSize(option);
                break;
            case 'material':
                setSelectedMaterial(option);
                break;
            case 'dialStyle':
                setSelectedDialStyle(option);
                break;
            default:
                break;
        }
    };

    const resetFilters = () => {
        setSelectedBrand(null);
        setSelectedWatchType(null);
        setSelectedSize(null);
        setSelectedMaterial(null);
        setSelectedDialStyle(null);
        localStorage.removeItem('selectedBrand');
        localStorage.removeItem('selectedWatchType');
        localStorage.removeItem('selectedSize');
        localStorage.removeItem('selectedMaterial');
        localStorage.removeItem('selectedDialStyle');
        getProducts()
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
                    {/* Thanh kéo thả để chọn khoảng giá */}
                    <div className="price-slider">
                        Filter
                        <Slider
                            range
                            min={0}
                            max={99999}
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                        />
                        <div >
                            <InputNumber
                                className="price-input-wrapper"
                                min={0}
                                max={100}
                                value={priceRange[0]}
                                onChange={(value) => handlePriceRangeChange([value, priceRange[1]])}
                            />
                            <InputNumber
                                className="price-input right-line"
                                min={0}
                                max={99999}
                                value={priceRange[1]}
                                onChange={(value) => handlePriceRangeChange([priceRange[0], value])}
                            />
                        </div>
                    </div>
                    <Button onClick={resetFilters} className='btn-reset'>Reset</Button>
                    <Input
                        placeholder='Search'
                        style={{ borderRadius: 0, marginBottom: 0, height: '40px', marginBottom: '10px' }}
                        onChange={handleChangeName}
                    />
                    <Collapse defaultActiveKey={['1', '2', '3', '4', '5']} accordion style={{ borderRadius: '0', backgroundColor: 'white' }}>
                        <Panel header="Brands" key="1">
                            <Radio.Group value={selectedBrand} onChange={(e) => handleFilterOption(e.target.value, 'brand')}>
                                {brand.map((item) => (
                                    <div key={item}>
                                        <Radio
                                            className='radio-btn'
                                            value={item}
                                            onClick={() => findProductByBrand(item.idthuonghieu)}
                                        >
                                            {item.thuonghieuten}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </Panel>
                        <Panel header="Types" key="2">
                            <Radio.Group value={selectedWatchType} onChange={(e) => handleFilterOption(e.target.value, 'watchType')}>
                                {type.map((item) => (
                                    <div key={item}>
                                        <Radio
                                            className='radio-btn'
                                            value={item}
                                            onClick={() => findProductByType(item.idkieumat)}
                                        >
                                            {item.loaikieumat}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </Panel>
                        <Panel header="Sizes" key="3">
                            <Radio.Group value={selectedSize} onChange={(e) => handleFilterOption(e.target.value, 'size')}>
                                {size.map((item) => (
                                    <div key={item}>
                                        <Radio
                                            className='radio-btn'
                                            value={item}
                                            onClick={() => findProductBySize(item.idkichthuoc)}
                                        >
                                            {item.kichthuocmat}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </Panel>
                        <Panel header="Materials" key="4">
                            <Radio.Group value={selectedMaterial} onChange={(e) => handleFilterOption(e.target.value, 'material')}>
                                {material.map((item) => (
                                    <div key={item}>
                                        <Radio
                                            className='radio-btn'
                                            value={item}
                                            onClick={() => findProductByMaterial(item.idchatlieu)}
                                        >
                                            {item.loaichatlieu}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </Panel>
                        <Panel header="Machine" key="5">
                            <Radio.Group value={selectedDialStyle} onChange={(e) => handleFilterOption(e.target.value, 'dialStyle')}>
                                {machine.map((item) => (
                                    <div key={item}>
                                        <Radio
                                            className='radio-btn'
                                            value={item}
                                            onClick={() => findProductByMachine(item.idloaimay)}
                                        >
                                            {item.loaimayten}
                                        </Radio>
                                    </div>
                                ))}
                            </Radio.Group>
                        </Panel>
                    </Collapse>
                </Sider>
                <Content>
                    <Row gutter={[16, 16]}>
                        {/* Hiển thị sản phẩm */}
                        {currentProducts.map((products) => (
                            <Col key={products.idsanpham} xs={24} sm={12} md={8} lg={6}>
                                <Link to={`/product/${products.idsanpham}`} style={{ textDecoration: 'none' }}>
                                    <Card className="card--product" hoverable cover={<img alt={products.sanphamten} src={`http://localhost:8080/upload/${products.sanphamhinhdaidien}`} className="img-conten" />}>
                                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                                            <div>
                                                <h3 style={{ fontSize: '13px', fontWeight: 'bold', textAlign: 'center' }}>{products.sanphamten}</h3>
                                                <p style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', color: 'black' }} >${products.sanphamgia} <ShoppingCartOutlined /></p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </Col>

                        ))}
                    </Row>
                    {/* Hiển thị thanh phân trang */}
                    <Pagination
                        className="pagination-btn"
                        style={{ marginTop: '10px' }}
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