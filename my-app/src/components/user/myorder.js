import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Steps, Modal } from 'antd';
import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumbs } from "@material-tailwind/react";
import InvoiceOrder from './invoiceorder';

const { Meta } = Card;

const MyOrder = () => {
    const { id } = useParams();
    const [order, setOrder] = useState([]);
    const [data, setData] = useState([]);
    const [newStatus, setNewStatus] = useState({
        tinhTrang: ''
    });

    const [showInvoiceModal, setShowInvoiceModal] = useState(false);

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

    const toggleInvoiceModal = () => {
        setShowInvoiceModal(!showInvoiceModal); // Toggle trạng thái hiển thị modal
    };

    return (
        <div style={{ background: '#dddddd', position: 'absolute' }}>
            <div style={{ margin: '20px', width: '55%', margin: 'auto' }}>
                {order && order.map(orderItem => (
                    <Card key={orderItem.maDH} style={{ marginTop: '20px', marginBottom: '20px', border: 'none' }}>
                        <Breadcrumbs>
                            <Link to='/' style={{ color: 'black' }}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </Link>
                            <Link to='/history' style={{ color: 'black', textDecoration: 'none' }}>
                                <span>Orders</span>
                            </Link>
                            <Link href="#" className="opacity-40" style={{ color: '#6c6c6c', textDecoration: 'none' }}>{orderItem.maDH}</Link>
                        </Breadcrumbs>
                        <Steps
                            size="small"
                            style={{ marginBottom: '20px', marginTop: '20px' }}
                            current={orderItem.donhangtrangthai}
                            items={[
                                {
                                    title: 'Processing',
                                },
                                {
                                    title: 'Pending',
                                },
                                {
                                    title: 'Delivering',
                                },
                                ,
                                {
                                    title: 'Delivered',
                                }
                            ]}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <p style={{ color: 'black', fontWeight: 'bold', fontSize: '30px' }}>Order ID: {orderItem.maDH}</p>
                                <Button onClick={toggleInvoiceModal} variant="outlined" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '45px' }}>
                                    <svg style={{ color: 'gray', marginRight: '4px' }} xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0zm192 0v128h128zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16m128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5.1c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16v-17.8c-11.2-2.1-21.7-5.7-30.9-8.9c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5.8 4.8 1.6 7.1 2.4c13.6 4.6 24.6 8.4 36.3 8.7c9.1.3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16" /></svg> Invoice
                                </Button>
                                <Modal
                                    visible={showInvoiceModal}
                                    onCancel={toggleInvoiceModal}
                                    footer={null}
                                >
                                    <InvoiceOrder orderItem={orderItem} dataItem={data} />
                                </Modal>
                            </div>
                            <div style={{ display: 'flex' }}>
                                <p style={{ color: '#7D879C', paddingRight: '15px', borderRight: '1px solid rgb(205 213 229)' }}>Order Date:<span style={{ color: 'black', fontWeight: 'bold' }}> {handleformatDate(orderItem.donhangngaylap)}</span></p>
                                <p style={{ color: '#7D879C', paddingLeft: '15px' }}>Shipping Address:<span style={{ color: 'black', fontWeight: 'bold' }}> {orderItem.donhangdiachigiaohang}</span></p>
                            </div>
                        </div>
                        <Row gutter={[16, 16]} style={{ borderTop: '1px solid rgb(205 213 229)', borderBottom: '1px solid rgb(205 213 229)' }}>
                            {data.map(product => (
                                <Col key={product.id} span={24}>
                                    <Card style={{ borderRadius: '0', border: 'none' }}>
                                        <div className='flex'>
                                            <img src={`http://localhost:8080/upload/${product.sanphamhinhdaidien}`} alt={product.sanphamten} style={{ width: '15%', height: 'auto', marginRight: '15px', padding: '10px', border: '1px solid rgb(205 213 229)', borderRadius: '10px' }} />
                                            <Meta
                                                title={product.sanphamten}
                                                description={`Price: $${product.sanphamgia}.00  Qty:${product.chitietdonhangsoluong}`}
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                            <Button style={{ borderRadius: '0', height: '48px', marginTop: '14%' }} type="primary" onClick={() => handleUpdateOrderStatus(id)}>Update Status</Button>
                        </div>
                        {/* Add more buttons or functionality as needed */}
                    </Card>
                ))
                }
            </div>
        </div >
    );
}

export default MyOrder;
