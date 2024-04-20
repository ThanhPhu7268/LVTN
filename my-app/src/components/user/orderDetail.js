import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Typography, CardBody, CardFooter, Avatar, IconButton, Tooltip, Button } from "@material-tailwind/react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import { Breadcrumbs } from "@material-tailwind/react";
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { Modal, Select, MenuItem } from "@mui/material";

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Khai báo biến totalPages

    useEffect(() => {
        getOrders();
    }, [currentPage]);

    const getOrders = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const idkhachhang = user.idkhachhang;
        try {
            const response = await axios.get(`http://localhost:8080/api/order/history/${idkhachhang}`);
            const allOrders = response.data;
            // Tính chỉ số bắt đầu và chỉ số kết thúc của mảng đơn hàng dựa trên trang hiện tại và số lượng đơn hàng trên mỗi trang
            const startIndex = (currentPage - 1) * 5;
            const endIndex = startIndex + 5;
            const ordersOnCurrentPage = allOrders.slice(startIndex, endIndex);
            setOrders(ordersOnCurrentPage);
            // Tính số trang dựa trên tổng số đơn hàng và số lượng đơn hàng trên mỗi trang
            const totalOrders = allOrders.length;
            const totalPages = Math.ceil(totalOrders / 5);
            setTotalPages(totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleViewOrder = (order) => {
        // Xử lý hiển thị thông tin đơn hàng
        // console.log("Viewing order:", order);
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [status, setStatus] = useState('');

    const handleChangeOrderStatus = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
        setStatus(order.orderStatus);
    };
    const handleformatDate = (order) => {
        const orderDate = new Date(order);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = orderDate.toLocaleDateString('en-GB', options);
        // console.log(formattedDate); // Kết quả: "10 Nov 2022"
        return formattedDate;
    }

    const handleUpdateOrderStatus = () => {
        // Cập nhật trạng thái đơn hàng thông qua API hoặc state tùy thuộc vào cách bạn xử lý dữ liệu
        console.log("Updating order status:", selectedOrder.id, status);
        setModalVisible(false);
        // Cập nhật lại danh sách đơn hàng sau khi cập nhật trạng thái
        getOrders();
    };

    const handleModalCancel = () => {
        setSelectedOrder(null);
        setModalVisible(false);
    };

    return (
        <Card style={{ margin: '25px', boxShadow: 'none' }}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <Breadcrumbs style={{ background: 'white' }}>
                    <Link to="/" className="opacity-60" style={{ color: '#6c6c6c' }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </Link>
                    <a href="#" style={{ textDecoration: 'none', color: 'black' }}>My Order</a>
                </Breadcrumbs>
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            My Orders
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0" style={{ border: '1px solid #c7c2c2' }}>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    ID Order
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    Purchase Date
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    Address
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold', textAlign: 'center' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    Total Price
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold', textAlign: 'center' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    Order Status
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    Actions
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.iddonhang}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography style={{ fontWeight: 'bold' }} variant="small" color="blue-gray">
                                        {order.maDH}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray">
                                        {handleformatDate(order.donhangngaylap)}

                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" style={{ width: '135px' }}>
                                        {order.donhangdiachigiaohang}
                                    </Typography>
                                </td>
                                <td className="border-b border-blue-gray-50 text-center">
                                    <Typography variant="small" color="blue-gray">
                                        ${order.donhangtonggia}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50" style={{ textAlign: 'center' }}>
                                    <Typography variant="small" color="blue-gray"
                                        style={{ padding: '3px 12px', display: 'inline-flex', fontSize: '12px', fontWeight: 'bold', borderRadius: '8px', color: order.trangthaicolor, background: order.trangthaibg }}>
                                        {order.trangthai}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Tooltip content="View Order">
                                        <IconButton variant="text" style={{ color: '#7D879C', borderRadius: '50%' }} onClick={() => handleViewOrder(order)}>
                                            <Link style={{ color: '#7D879C' }} to={`/myorder/${order.iddonhang}`}>
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                        </IconButton>
                                    </Tooltip>
                                    {/* <Tooltip content="Edit Order Status" >
                                        <IconButton variant="text" style={{ color: '#7D879C', borderRadius: '50%' }} onClick={() => handleChangeOrderStatus(order)}>
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
                <div className="flex items-center gap-2" style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <IconButton key={index} variant={currentPage === index + 1 ? 'outlined' : 'text'} size="sm" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </IconButton>
                    ))}
                </div>
            </CardFooter>
        </Card >
    );
};

export default OrderPage;
