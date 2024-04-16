import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Typography, CardBody, CardFooter, Avatar, IconButton, Tooltip, Button } from "@material-tailwind/react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import { Modal, Select, MenuItem } from "@mui/material";

const AdminOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Khai báo biến totalPages

    useEffect(() => {
        getOrders();
    }, [currentPage]);

    const getOrders = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/order');
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
        <Card className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Orders
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Otis watch orders
                        </Typography>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
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
                                    Orderer
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
                                    style={{ fontWeight: 'bold' }}
                                    className="font-normal leading-none opacity-70"
                                >
                                    Total Price
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    style={{ fontWeight: 'bold' }}
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
                                        {order.tennguoidat}
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
                                            <Link to={`/admin/orderdetail/${order.iddonhang}`}>
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Edit Order Status" >
                                        <IconButton variant="text" style={{ color: '#7D879C', borderRadius: '50%' }} onClick={() => handleChangeOrderStatus(order)}>
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Modal open={modalVisible} onClose={handleModalCancel}>
                    <div style={{ backgroundColor: "white", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                        <Typography variant="h6" gutterBottom>
                            Update Order Status
                        </Typography>
                        <Select
                            fullWidth
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Đang Xử Lí">Đang Xử Lí</MenuItem>
                            <MenuItem value="Đã Duyệt">Đã Duyệt</MenuItem>
                            <MenuItem value="Chờ Lấy Hàng">Chờ Lấy Hàng</MenuItem>
                            <MenuItem value="Chờ Giao Hàng">Chờ Giao Hàng</MenuItem>
                            <MenuItem value="Đã Giao">Đã Giao</MenuItem>
                        </Select>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "10px" }}
                            onClick={handleUpdateOrderStatus}
                        >
                            Update
                        </Button>
                    </div>
                </Modal>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm" onClick={handlePreviousPage}>
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <IconButton key={index} variant={currentPage === index + 1 ? 'outlined' : 'text'} size="sm" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </IconButton>
                    ))}
                </div>
                <Button variant="outlined" size="sm" onClick={handleNextPage}>
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
};

export default AdminOrder;
