import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const AddressPage = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [addressData, setAddressData] = useState({
        fullName: '',
        phoneNumber: '',
        province: '',
        district: '',
        ward: '',
        address: '',
    });

    const handleEditAddress = () => {
        // Logic to edit address
        setOpenDialog(true);
    };

    const handleAddNewAddress = () => {
        // Logic to add new address
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleAddressChange = (e) => {
        setAddressData({
            ...addressData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateAddress = () => {
        // Logic to update address
        setOpenDialog(false);
    };

    return (
        <div>
            {/* Add New Address Button */}
            <Button onClick={handleAddNewAddress} variant="contained" color="primary" sx={{ mb: 2 }}>
                Thêm địa chỉ mới
            </Button>

            {/* Address Cards */}
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                        Tên địa chỉ: John Doe
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                        Số điện thoại: 0123456789
                    </Typography>
                    <Button onClick={handleEditAddress} variant="outlined" sx={{ mr: 1 }}>
                        Chọn địa chỉ này
                    </Button>
                    <IconButton aria-label="edit" onClick={handleEditAddress} sx={{ mr: 1 }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </CardContent>
            </Card>

            {/* Dialog for Editing or Adding Address */}
            <Dialog open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Thêm/Sửa Địa Chỉ</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="fullName"
                        name="fullName"
                        label="Họ và tên"
                        type="text"
                        fullWidth
                        value={addressData.fullName}
                        onChange={handleAddressChange}
                    />
                    <TextField
                        margin="dense"
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        value={addressData.phoneNumber}
                        onChange={handleAddressChange}
                    />
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Tỉnh/Thành phố</InputLabel>
                        <Select
                            value={addressData.province}
                            label="Tỉnh/Thành phố"
                            onChange={handleAddressChange}
                            name="province"
                        >
                            <MenuItem value="">Chọn tỉnh/thành phố</MenuItem>
                            {vnAddress.provinces.getAllProvinces().map(province => (
                                <MenuItem key={province.code} value={province.name}>{province.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Quận/Huyện</InputLabel>
                        <Select
                            value={addressData.district}
                            label="Quận/Huyện"
                            onChange={handleAddressChange}
                            name="district"
                        >
                            <MenuItem value="">Chọn quận/huyện</MenuItem>
                            {vnAddress.districts.getAllDistrictsByProvinceCode(addressData.province.code).map(district => (
                                <MenuItem key={district.code} value={district.name}>{district.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Xã/Phường</InputLabel>
                        <Select
                            value={addressData.ward}
                            label="Xã/Phường"
                            onChange={handleAddressChange}
                            name="ward"
                        >
                            <MenuItem value="">Chọn xã/phường</MenuItem>
                            {vnAddress.wards.getAllWardsByDistrictCode(addressData.district.code).map(ward => (
                                <MenuItem key={ward.code} value={ward.name}>{ward.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        id="address"
                        name="address"
                        label="Địa chỉ chi tiết"
                        type="text"
                        fullWidth
                        value={addressData.address}
                        onChange={handleAddressChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Huỷ bỏ</Button>
                    <Button onClick={handleUpdateAddress} variant="contained" color="primary">
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddressPage;
