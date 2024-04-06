import React, { useState } from 'react';
import { Layout, Table, Button, Modal, Select, Space } from 'antd';
import AdminSidebar from './adminsidebar';

const { Header, Content } = Layout;
const { Option } = Select;

const AdminOrder = () => {
    const [orderList, setOrderList] = useState([
        {
            id: 1,
            orderName: 'Đơn hàng 1',
            products: ['Đồng Hồ Nam ', 'Đồng Hồ Nữ Casio'],
            totalAmount: 470,
            paymentStatus: 'Ship COD',
            orderStatus: 'Đang xử lý',
        },
        {
            id: 2,
            orderName: 'Đơn hàng 2',
            products: ['Đồng Hồ Nam ', 'Đồng Hồ Nữ Casio'],
            totalAmount: 240,
            paymentStatus: 'Ship COD',
            orderStatus: 'Đang giao',
        },
        {
            id: 3,
            orderName: 'Đơn hàng 3',
            products: ['Đồng Hồ Nam ', 'Đồng Hồ Nữ Casio'],
            totalAmount: 240,
            paymentStatus: 'Đã thanh toán online',
            orderStatus: 'Đang giao',
        }
        // ...Thêm đơn hàng khác vào danh sách
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [status, setStatus] = useState('');

    const renderProducts = (products) => {
        return (
            <ul>
                {products.map((product, index) => (
                    <li key={index}>{product}</li>
                ))}
            </ul>
        );
    };

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên đơn hàng', dataIndex: 'orderName', key: 'orderName' },
        { title: 'Sản phẩm', dataIndex: 'products', key: 'products', render: renderProducts },
        { title: 'Tổng giá tiền', dataIndex: 'totalAmount', key: 'totalAmount' },
        { title: 'Trạng thái thanh toán', dataIndex: 'paymentStatus', key: 'paymentStatus' },
        {
            title: 'Trạng thái đơn hàng',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            render: (text) => {
                let color = '';
                switch (text) {
                    case 'Đang xử lý':
                        color = 'red';
                        break;
                    case 'Đang giao':
                        color = '#fb8618';
                        break;
                    case 'Đã giao':
                        color = '#15f424';
                        break;
                    default:
                        color = 'black';
                }
                return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
            }
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button type="primary" style={{ background: 'black' }} onClick={() => handleChangeOrderStatus(record)}>
                        Thay đổi trạng thái
                    </Button>
                    <Button type="danger" style={{ background: 'beige' }} onClick={() => handleDeleteOrder(record)}>
                        Xoá đơn hàng
                    </Button>
                </Space>
            ),
        },
    ];

    const handleChangeOrderStatus = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
        setStatus(order.orderStatus);
    };

    const handleUpdateOrderStatus = () => {
        const updatedOrderList = orderList.map((order) =>
            order.id === selectedOrder.id ? { ...order, orderStatus: status } : order
        );
        setOrderList(updatedOrderList);
        setSelectedOrder(null);
        setModalVisible(false);
    };

    const handleDeleteOrder = (order) => {
        const updatedList = orderList.filter((item) => item.id !== order.id);
        setOrderList(updatedList);
    };

    const handleModalCancel = () => {
        setSelectedOrder(null);
        setModalVisible(false);
    };

    return (
        <Layout className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            {/* ... */}
            <Layout>
                <Content style={{ margin: '16px' }}>
                    {/* Bảng liệt kê đơn hàng */}
                    <Table columns={columns} dataSource={orderList} />

                    {/* Modal thay đổi trạng thái */}
                    <Modal
                        title="Thay đổi trạng thái đơn hàng"
                        visible={modalVisible}
                        onOk={handleUpdateOrderStatus}
                        onCancel={handleModalCancel}
                    >
                        <Select value={status} onChange={setStatus}>
                            <Option value="Đang xử lý">Đang xử lý</Option>
                            <Option value="Đang giao">Đang giao</Option>
                            <Option value="Đã giao">Đã giao</Option>
                        </Select>
                    </Modal>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminOrder;