import { PencilIcon } from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from 'axios';

const TABLE_HEAD = ["Name Product", "Amount", "Type", "Status", "Brand", ""];

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Khai báo biến totalPages

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/productbrand');
            const allProducts = response.data;

            // Tính chỉ số bắt đầu và chỉ số kết thúc của mảng sản phẩm dựa trên trang hiện tại và số lượng sản phẩm trên mỗi trang
            const startIndex = (currentPage - 1) * 5;
            const endIndex = startIndex + 5;

            const productsOnCurrentPage = allProducts.slice(startIndex, endIndex);
            setProducts(productsOnCurrentPage);

            // Tính số trang dựa trên tổng số sản phẩm và số lượng sản phẩm trên mỗi trang
            const totalProducts = allProducts.length;
            const totalPages = Math.ceil(totalProducts / 5);
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


    return (
        <Card className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Products
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            These are details about the last transactions
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                        <Button className="flex items-center gap-3" size="sm">
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => {
                            const isLast = index === products.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={item}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                src={item.sanphamhinhdaidien}
                                                alt={item}
                                                size="lg"
                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {item.sanphamten}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            ${item.sanphamgia}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {item.sanphamgioitinh}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        {/* <IconButton variant="text" onClick={handleClick}>
                                            <Chip
                                                size="small"
                                                variant="ghost"
                                                label={selectedStatus || "--Select status--"}
                                                color={
                                                    selectedStatus === "paid"
                                                        ? "primary"
                                                        : selectedStatus === "pending"
                                                            ? "secondary"
                                                            : "default"
                                                }
                                            />
                                        </IconButton>
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem onClick={() => handleMenuItemClick('paid')}>Paid</MenuItem>
                                            <MenuItem onClick={() => handleMenuItemClick('pending')}>Pending</MenuItem>
                                            <MenuItem onClick={() => handleMenuItemClick('cancelled')}>Cancelled</MenuItem>
                                        </Menu> */}
                                    </td>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-14 rounded-md border border-blue-gray-50 p-1">
                                                <Avatar
                                                    src={item.thuonghieuhinhanh}
                                                    size="xxl"
                                                    alt='{item}'
                                                    variant="square"
                                                    className="h-full w-full object-contain p-1"
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Tooltip content="Edit User">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
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
}