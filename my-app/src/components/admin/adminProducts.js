import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import {
    Card, CardHeader, Typography, Button, CardBody, CardFooter, Avatar, IconButton, Tooltip, Input
} from "@material-tailwind/react";
import { Modal, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import Alert from '@mui/material/Alert';
import { useState, useEffect } from "react";
import '../../assets/css/admin.css'
import axios from 'axios';

const TABLE_HEAD = ["Name Product", "Amount", "Type", "Status", "Brand", ""];

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Khai báo biến totalPages
    const [formData, setFormData] = useState({
        tenSP: '',
        gia: '',
        moTa: '',
        gioiTinh: '',
        idchatlieu: '',
        idkieumat: '',
        idkichthuoc: '',
        idthuonghieu: '',
        idloaimay: '',
        idSP: ''
    });

    useEffect(() => {
        getProducts();
    }, [currentPage]);

    const getProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/products/productbrand');
            const allProducts = response.data;
            const startIndex = (currentPage - 1) * 15;
            const endIndex = startIndex + 15;
            const productsOnCurrentPage = allProducts.slice(startIndex, endIndex);
            setProducts(productsOnCurrentPage);
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
    const getProductById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products/${id}`);
            formData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // Hàm mở modal chỉnh sửa và điền dữ liệu của sản phẩm được chọn vào đó
    const openEditModal = (product) => {
        console.log(product);
        setSelectedProduct(product);
        setIsEditModalOpen(true);
        setFormData({
            tenSP: product.sanphamten,
            gia: product.sanphamgia,
            moTa: product.sanphammota,
            gioiTinh: product.sanphamgioitinh,
            idchatlieu: product.idchatlieu,
            idkieumat: product.idkieumat,
            idkichthuoc: product.idkichthuoc,
            idthuonghieu: product.idthuonghieu,
            idloaimay: product.idloaimay,
            idSP: product.idsanpham
        })
    };

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
        anhDaiDien: '',
        idSP: ''
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "gia" && parseFloat(value) <= 0) {
            newValue = "1";
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === "gia" && parseFloat(value) <= 0) {
            newValue = "1";
        }
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
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                // Xử lý kết quả từ server
                console.log(response.data);
                setIsModalOpen(false);
                // formDataData()
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
                    anhDaiDien: null
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

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setNewProduct((prev) => ({
            ...prev,
            anhDaiDien: file
        }))
    }

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

    const handleEditProduct = async () => {
        try {
            await axios.put(`http://localhost:8080/api/products/update`, formData);
            console.log('Update order status successfully');
            alert('cập nhật thành công');
            setIsEditModalOpen(false);
            // Cập nhật lại trạng thái đơn hàng trong state hoặc tải lại trang để cập nhật dữ liệu mới
        } catch (error) {
            console.error('Error updating order status:', error);
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
                                defaultValue={newProduct.idthuonghieu}
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
                    <label for="anhDaiDien" class="custom-file-upload">
                        <span>Choose picture</span>
                        <input
                            id="anhDaiDien"
                            type="file"
                            name="anhDaiDien"
                            style={{ marginBottom: '10px' }}
                            onChange={handleChangeImage}
                        />
                    </label>
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
                                                src={`http://localhost:8080/upload/${item.sanphamhinhdaidien}`}
                                                alt={item}
                                                size="lg"
                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                                style={{ width: '280px' }}
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
                                    <td className={classes} style={{ textAlign: "center" }}>
                                        {item.soluongcon > 0 ? (
                                            <Typography variant="body2" style={{ color: '#16f316', fontWeight: '700', textAlign: 'center', background: '#beffc9', borderRadius: '8px' }}>In Stock</Typography>
                                        ) : (
                                            <Typography variant="body2" style={{ color: 'red', fontWeight: '700', fontSize: '15px', textAlign: 'center', background: 'rgb(255 190 190)', borderRadius: '8px', paddingLeft: '2px', paddingRight: '2px' }}>Out of Stock</Typography>
                                        )}
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
                                            <IconButton variant="text" onClick={() => {
                                                getProductById(item.idsanpham)
                                                openEditModal(item)
                                            }}>
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
            <Modal Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                <div style={{ backgroundColor: "white", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Chỉnh sửa sản phẩm
                    </Typography>
                    {formData && (
                        <>
                            {/* Hiển thị các trường nhập với dữ liệu của sản phẩm được chọn điền sẵn */}
                            <TextField
                                label="Tên sản phẩm"
                                fullWidth
                                name="tenSP"
                                value={formData.tenSP}
                                style={{ marginBottom: '10px' }}
                                onChange={handleEditChange}
                            />
                            <TextField
                                label="Price"
                                fullWidth
                                name="gia"
                                type="number"
                                value={formData.gia}
                                style={{ marginBottom: '10px' }}
                                onChange={handleEditChange}
                            />
                            <TextField
                                label="Description"
                                fullWidth
                                name="moTa"
                                value={formData.moTa}
                                style={{ marginBottom: '5px' }}
                                onChange={handleEditChange}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ flex: '1', marginRight: '5px' }}>
                                    <InputLabel htmlFor="gioiTinh">Sex</InputLabel>
                                    <Select
                                        fullWidth
                                        name="gioiTinh"
                                        value={formData.gioiTinh}
                                        onChange={handleEditChange}
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
                                        value={formData.idchatlieu}
                                        onChange={handleEditChange}
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
                                        value={formData.idkieumat}
                                        onChange={handleEditChange}
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
                                        value={formData.idkichthuoc}
                                        onChange={handleEditChange}
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
                                        value={formData.idthuonghieu}
                                        style={{ marginBottom: '10px' }}
                                        onChange={handleEditChange}
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
                                        value={formData.idloaimay}
                                        onChange={handleEditChange}
                                        InputLabelProps={{ shrink: true }}
                                    >
                                        <MenuItem value="1">Đồng Hồ Điện Tử (Quartz)</MenuItem>
                                        <MenuItem value="2">Đồng Hồ Cơ (Mechanical)</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <input
                                type="file"
                                name="anhDaiDien"
                                style={{ marginBottom: '10px' }}
                                onChange={handleChangeImage}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginLeft: '30%' }}
                                onClick={handleEditProduct}
                            >
                                Lưu thay đổi
                            </Button>
                        </>
                    )}
                </div>
            </Modal>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm" style={{ padding: '3px' }} onClick={handlePreviousPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" /></svg>
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <IconButton key={index} variant={currentPage === index + 1 ? 'outlined' : 'text'} size="sm" onClick={() => handlePageChange(index + 1)}>
                            {index + 1}
                        </IconButton>
                    ))}
                </div>
                <Button variant="outlined" size="sm" style={{ padding: '3px' }} onClick={handleNextPage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z" /></svg>
                </Button>
            </CardFooter>
        </Card>
    );
}