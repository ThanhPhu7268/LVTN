import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {
    Card, CardHeader, Typography, Button, CardBody, CardFooter, Avatar, IconButton, Tooltip, Input
} from "@material-tailwind/react";
import { Modal, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { Upload } from "antd";
import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react";
import axios from 'axios';

const TABLE_HEAD = ["Name Product", "Amount", "Type", "Quantity Remaining", "Brand", ""];

export default function AdminWareHouse() {
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
            const startIndex = (currentPage - 1) * 15;
            const endIndex = startIndex + 15;
            const productsOnCurrentPage = allProducts.slice(startIndex, endIndex);
            setProducts(productsOnCurrentPage);
            // Tính số trang dựa trên tổng số sản phẩm và số lượng sản phẩm trên mỗi trang
            const totalProducts = allProducts.length;
            const totalPages = Math.ceil(totalProducts / 15);
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        tenSP: '',
        gia: '',
        moTa: '',
        gioiTinh: '',
        idchatlieu: '',
        idkieumat: '',
        idthuonghieu: '',
        idkichthuoc: '',
        idloaimay: '',
        anhDaiDien: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        // Kiểm tra nếu tên trường là "gia" và giá trị nhập vào nhỏ hơn hoặc bằng 0
        if (name === "gia" && parseFloat(value) <= 0) {
            // Đặt giá trị của ô nhập thành giá trị mặc định (ở đây là "1")
            newValue = "1";
        }
        // Cập nhật state với giá trị mới
        setNewProduct(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const handleAddProduct = (event) => {
        event.preventDefault();
        console.log(newProduct);
        axios.post('http://localhost:8080/api/products/', newProduct, {
            // headers: {
            //     'Content-Type': 'multipart/form-data'
            // }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);
                setIsModalOpen(false);
                // getApiData()
                setShowSuccessAlert(true);
                setNewProduct({
                    tenSP: '',
                    gia: '',
                    moTa: '',
                    gioiTinh: '',
                    idchatlieu: '',
                    idkieumat: '',
                    idthuonghieu: '',
                    idkichthuoc: '',
                    idloaimay: '',
                    anhDaiDien: ''
                })
                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000);
            })
            .catch(error => {
                // Xử lý lỗi
                console.error(error);
            });
    };

    const deleteProduct = (id, productName) => {
        const isConfirmed = window.confirm(`Bạn có chắc muốn xóa sản phẩm "${productName}" không?`);
        if (isConfirmed) {
            axios.delete(`http://localhost:8080/api/products/${id}`)
                .then(response => {
                    console.log(response.data);
                    getProducts(); // Update the product list after deletion
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            console.log('Hủy xóa');
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
                            Otis watch products
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
                    <div>
                        <Button
                            className="flex items-center gap-3"
                            size="sm"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <PlusCircleIcon className="h-8 w-8" /> Add Product
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={{ backgroundColor: "white", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Add Product
                    </Typography>
                    <TextField
                        label="Product Name"
                        fullWidth
                        name="tenSP"
                        value={newProduct.tenSP}
                        style={{ marginBottom: '10px' }}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Price"
                        fullWidth
                        name="gia"
                        type="number"
                        value={newProduct.gia}
                        style={{ marginBottom: '10px' }}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        name="moTa"
                        value={newProduct.moTa}
                        style={{ marginBottom: '5px' }}
                        onChange={handleInputChange}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: '1', marginRight: '5px' }}>
                            <InputLabel htmlFor="gioiTinh">Sex</InputLabel>
                            <Select
                                fullWidth
                                name="gioiTinh"
                                value={newProduct.gioiTinh}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="Nam">Men</MenuItem>
                                <MenuItem value="Nữ">Women</MenuItem>
                                <MenuItem value="Trẻ Em">Kid</MenuItem>
                                <MenuItem value="Cặp Đôi">Couple</MenuItem>
                            </Select>
                        </div>
                        <div style={{ flex: '1', marginLeft: '5px' }}>
                            <InputLabel htmlFor="chatLieu">Material</InputLabel>
                            <Select
                                fullWidth
                                name="idchatlieu"
                                value={newProduct.idchatlieu}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="1">Kính Sapphire</MenuItem>
                                <MenuItem value="2">Kính Khoáng</MenuItem>
                                <MenuItem value="3">Kính Hardlex</MenuItem>
                                <MenuItem value="4">Kính Nhựa</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ flex: '1', marginRight: '5px' }}>
                            <InputLabel htmlFor="kieuMat">Type</InputLabel>
                            <Select
                                fullWidth
                                name="idkieumat"
                                value={newProduct.idkieumat}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="1">Mặt tròn</MenuItem>
                                <MenuItem value="2">Mặt vuông</MenuItem>
                                <MenuItem value="3">Mặt oval</MenuItem>
                                <MenuItem value="4">Mặt chữ nhật</MenuItem>
                            </Select>
                        </div>
                        <div style={{ flex: '1', marginLeft: '5px' }}>
                            <InputLabel htmlFor="kichThuoc">Size</InputLabel>
                            <Select
                                fullWidth
                                name="idkichthuoc"
                                value={newProduct.idkichthuoc}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="1">Dưới 25mm</MenuItem>
                                <MenuItem value="2">25mm đến 30mm</MenuItem>
                                <MenuItem value="3">30mm đến 35mm</MenuItem>
                                <MenuItem value="4">35mm đến 38mm</MenuItem>
                                <MenuItem value="5">38mm đến 40mm</MenuItem>
                                <MenuItem value="6">40mm đến 43mm</MenuItem>
                                <MenuItem value="7">Trên 43mm</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                        <div style={{ flex: '1', marginRight: '5px' }}>
                            <InputLabel htmlFor="thuongHieu">Brand</InputLabel>
                            <Select
                                fullWidth
                                name="idthuonghieu"
                                value={newProduct.idthuonghieu}
                                style={{ marginBottom: '10px' }}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="1">Casio</MenuItem>
                                <MenuItem value="2">G-Shock</MenuItem>
                                <MenuItem value="3">Hublot</MenuItem>
                                <MenuItem value="4">Seiko</MenuItem>
                                <MenuItem value="5">Tissot</MenuItem>
                                <MenuItem value="6">Citizen</MenuItem>
                                <MenuItem value="7">Certina</MenuItem>
                                <MenuItem value="8">Daniel Klein</MenuItem>
                                <MenuItem value="9">Omega</MenuItem>
                                <MenuItem value="10">Orient</MenuItem>
                                <MenuItem value="11">Longines</MenuItem>
                                <MenuItem value="12">Bentley</MenuItem>
                            </Select>
                        </div>
                        <div style={{ flex: '1', marginLeft: '5px' }}>
                            <InputLabel htmlFor="loaiMay">Machine</InputLabel>
                            <Select
                                fullWidth
                                name="idloaimay"
                                value={newProduct.idloaimay}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                            >
                                <MenuItem value="1">Đồng Hồ Điện Tử (Quartz)</MenuItem>
                                <MenuItem value="2">Đồng Hồ Cơ (Mechanical)</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <TextField
                        label="Image"
                        fullWidth
                        name="anhDaiDien"
                        value={newProduct.anhDaiDien}
                        style={{ marginBottom: '10px' }}
                        onChange={handleInputChange}
                    />
                    {/* Add more fields as needed */}
                    <Button variant="contained" color="primary"
                        style={{ marginLeft: '30%' }}
                        onClick={handleAddProduct}>
                        Add Product
                    </Button>
                </div>
            </Modal>
            {showSuccessAlert && (
                <Alert severity="success" onClose={() => setShowSuccessAlert(false)}>
                    Success add product.
                </Alert>
            )}
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
                                                style={{ width: '280px', marginBottom: '0' }}
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
                                            style={{ marginBottom: '0', fontWeight: 'bold' }}
                                        >
                                            ${item.sanphamgia}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                            style={{ marginBottom: '0' }}
                                        >
                                            {item.sanphamgioitinh}
                                        </Typography>
                                    </td>
                                    <td className={classes} style={{ textAlign: 'center' }}>
                                        {item.soluongcon}
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
                                        <Tooltip content="Edit Product">
                                            <IconButton variant="text">
                                                <PencilIcon className="h-4 w-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete Product">
                                            <IconButton variant="text" color="red" onClick={() => deleteProduct(item.idsanpham, item.sanphamten)}>
                                                <TrashIcon className="h-4 w-4" />
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