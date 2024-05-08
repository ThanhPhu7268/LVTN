import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select } from 'antd';
import { Button, Textarea } from '@material-tailwind/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const { Meta } = Card;
const { Option } = Select;

const OrderDetailPage = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [data, setData] = useState([]);
    const [newStatus, setNewStatus] = useState({
        tinhTrang: ''
    });
    console.log(id);
    useEffect(() => {
        getOrderDetails(id);
        getProductOrder(id);
        handleUpdateOrderStatus(id);
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

    const handleUpdateOrderStatus = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/order/update/${id}`, newStatus);
            console.log('Update order status successfully');
            alert('cập nhật thành công')
            // Cập nhật lại trạng thái đơn hàng trong state hoặc tải lại trang để cập nhật dữ liệu mới
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleCancel = async (id) => {
        try {
            // Lấy thông tin chi tiết của đơn hàng
            const response = await axios.get(`http://localhost:8080/api/order/detail/${id}`);
            const orderDetail = response.data;

            // Kiểm tra nếu trạng thái của đơn hàng đã là 5 (đã huỷ) thì không cần thực hiện cập nhật
            if (orderDetail[0].donhangtrangthai === 5) {
                console.log('Order is already cancelled');
                return;
            }

            // Nếu không, thực hiện yêu cầu cập nhật trạng thái của đơn hàng
            await axios.put(`http://localhost:8080/api/order/cancel/${id}`, newStatus);
            console.log('Update order status successfully');
            alert('Bạn đã huỷ đơn hàng thành công');
            // Cập nhật lại trạng thái đơn hàng trong state hoặc tải lại trang để cập nhật dữ liệu mới
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const handleCancelConfirmation = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            handleCancel(id);
        }
    };

    return (
        <div className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto' }}>
            {/* <span style={{ fontSize: '20px', fontWeight: '700', paddingTop: '16px' }}>Order Detail</span> */}
            {order && order.map(orderItem => (
                <Card key={orderItem.maDH} style={{ marginTop: '16px', border: 'none' }}>
                    <div style={{ display: 'flex' }}>
                        <p style={{ color: '#7D879C' }}>Order ID:<span style={{ color: 'black', fontWeight: 'bold' }}>{orderItem.maDH}</span></p>
                        <p style={{ color: '#7D879C', marginLeft: '20%' }}>Order Date:<span style={{ color: 'black', fontWeight: 'bold' }}> {handleformatDate(orderItem.donhangngaylap)}</span></p>
                        <p style={{ color: '#7D879C', marginLeft: '20%' }}>Shipping Address:<span style={{ color: 'black', fontWeight: 'bold' }}> {orderItem.donhangdiachigiaohang}</span></p>
                    </div>
                    <Select defaultValue={orderItem.trangthai} style={{ width: 300, height: 50 }} onChange={(value) => setNewStatus({ tinhTrang: value })}>
                        <Option value="1">Processing</Option>
                        <Option value="2">Pending</Option>
                        <Option value="3">Delivering</Option>
                        <Option value="4">Delivered</Option>
                    </Select>
                    <h3 style={{ marginTop: '16px' }}>All Products Order:</h3>
                    <Row gutter={[16, 16]}>
                        {data.map(product => (
                            <Col key={product.id} span={24}>
                                <Card style={{ borderRadius: '0' }}>
                                    <div className='flex'>
                                        <img src={`http://localhost:8080/upload/${product.sanphamhinhdaidien}`} alt={product.sanphamten} style={{ width: '8%', height: 'auto', marginRight: '15px' }} />
                                        <Meta
                                            title={product.sanphamten}
                                            description={`Price: $${product.sanphamgia} x ${product.chitietdonhangsoluong}`}
                                        />
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Card style={{ marginTop: '10px', width: '40%' }}>
                            <div>
                                <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Total Summary</p>
                                <p style={{ color: '#7D879C' }}>Subtotal: <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '10px' }}>${orderItem.donhangtonggia}.00</span></p>
                                <p>Shipping fee: <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '10px' }}>0</span></p>
                                <p>Discount(%):  <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '10px' }}>0</span></p>
                                <p>Total: <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '10px' }}>${orderItem.donhangtonggia}.00</span></p>
                                <p>Payment Method: <span style={{ color: 'black', fontWeight: 'bold', marginLeft: '10px' }}>{orderItem.phuongthucthanhtoanten}</span></p>
                            </div>
                        </Card>
                        <div style={{ paddingTop: '10px', marginTop: '10px' }}>
                            <Textarea style={{ marginTop: '10px' }} variant="static" label="Customer Note:" placeholder={orderItem.donhangghichu} />
                            <Button style={{ borderRadius: '0', height: '48px', marginTop: '14%', marginRight: '5px' }} type="primary" onClick={() => handleUpdateOrderStatus(id)}>Update Status</Button>
                            <Button style={{ borderRadius: '0', height: '48px', marginTop: '14%' }} type="primary" onClick={() => {
                                if (orderItem.donhangtrangthai === 1 || orderItem.donhangtrangthai === 2) {
                                    handleCancelConfirmation(id);
                                }
                            }}>Cancel Order</Button>
                        </div>

                    </div>
                    {/* Add more buttons or functionality as needed */}
                </Card>
            ))
            }
        </div >
    );
}

export default OrderDetailPage;
