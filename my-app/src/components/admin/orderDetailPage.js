import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Select } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Meta } = Card;
const { Option } = Select;

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [data, setData] = useState([]);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        getOrderDetails(id);
        getProductOrder(id);
    }, []);

    const getOrderDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/detail/${id}`);
            setOrder(response.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const getProductOrder = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/productdt/${id}`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    const handleformatDate = (order) => {
        const orderDate = new Date(order);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return orderDate.toLocaleDateString('en-GB', options);
    }

    const handleUpdateOrderStatus = async (orderId) => {
        try {
            await axios.put(`http://localhost:8080/api/order/${orderId}`, { orderStatus: newStatus });
            console.log('Update order status successfully');
            // Cập nhật lại trạng thái đơn hàng trong state hoặc tải lại trang để cập nhật dữ liệu mới
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto' }}>
            <span style={{ fontSize: '20px', fontWeight: '700', paddingTop: '16px' }}>Order Detail</span>
            {order && order.map(orderItem => (
                <Card key={orderItem.maDH} style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex' }}>
                        <p style={{ color: '#7D879C' }}>Order ID:<span style={{ color: 'black', fontWeight: 'bold' }}>{orderItem.maDH}</span></p>
                        <p style={{ color: '#7D879C', marginLeft: '20%' }}>Order Date:<span style={{ color: 'black', fontWeight: 'bold' }}> {handleformatDate(orderItem.donhangngaylap)}</span></p>
                    </div>
                    <p>Shipping Address: {orderItem.donhangdiachigiaohang}</p>
                    <p>Payment Method: {orderItem.phuongthucthanhtoan}</p>
                    <p>Order Status: {orderItem.donhangtrangthai}</p>
                    <h3>Products:</h3>
                    <Row gutter={16}>
                        {data.map(product => (
                            <Col key={product.id} span={8}>
                                <Card>
                                    <Meta title={product.sanphamten} description={`Price: ${product.sanphamgia}, Quantity: ${product.chitietdonhangsoluong}`} />
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Select defaultValue={orderItem.donhangtrangthai} style={{ width: 200 }} onChange={(value) => setNewStatus(value)}>
                        <Option value="1">Processing</Option>
                        <Option value="2">Pending</Option>
                        <Option value="3">Delivering</Option>
                        <Option value="4">Delivered</Option>
                        <Option value="5">Cancelled</Option>
                    </Select>
                    <Button type="primary" onClick={() => handleUpdateOrderStatus(orderItem.maDH)}>Update Status</Button>
                    {/* Add more buttons or functionality as needed */}
                </Card>
            ))}
        </div>
    );
}

export default OrderDetailPage;
