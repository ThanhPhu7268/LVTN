import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Card, CardHeader, Typography, Button, CardBody, CardFooter, Avatar, IconButton, Tooltip, Input
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Modal, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';

export default function AdminBrands() {
    const [brands, setBrands] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newBrand, setNewBrand] = useState('');
    const [newBrandLogo, setNewBrandLogo] = useState('');

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/filter/thuonghieu');
            setBrands(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        setNewBrand(e.target.value);
    };

    const handleAddBrand = () => {
        // Add logic to add new brand
        // You can use axios.post() similar to what you did for products
        // After successfully adding the brand, fetch the updated brand list again
        // and close the modal
    };

    const handleEditBrand = (id) => {
        // Add logic to edit the brand with id
        // For example, open a modal with brand details to edit
    };

    const handleDeleteBrand = (id, name) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete the brand "${name}"?`);
        if (isConfirmed) {
            // Add logic to delete the brand with id
            // After deletion, fetch the updated brand list again
        }
    };

    return (
        <Card className="w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Brands
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            List of brands
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
                            <PlusCircleIcon className="h-8 w-8" /> Add Brand
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div style={{ backgroundColor: "white", padding: "20px", maxWidth: "400px", margin: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Add Brand
                    </Typography>
                    <TextField
                        label="Brand Name"
                        fullWidth
                        value={newBrand}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Brand Logo URL"
                        fullWidth
                        value={newBrandLogo}
                        onChange={(e) => setNewBrandLogo(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '10px' }}
                        onClick={handleAddBrand}
                    >
                        Add Brand
                    </Button>
                </div>
            </Modal>
            <CardBody className="overflow-scroll px-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Brand ID
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Brand Logo
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Brand Name
                                </Typography>
                            </th>
                            <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    Actions
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand.idthuonghieu}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-bold"
                                    >
                                        {brand.idthuonghieu}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Avatar
                                        src={brand.thuonghieuhinhanh}
                                        alt={brand.thuonghieuten}
                                        size="lg"
                                        className="border border-blue-gray-50 object-contain "
                                    />
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        style={{ fontSize: '15px' }}
                                        className="font-bold"
                                    >
                                        {brand.thuonghieuten}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Tooltip content="Edit Brand">
                                        <IconButton variant="text" onClick={() => handleEditBrand(brand.idthuonghieu)}>
                                            <PencilIcon className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip content="Delete Brand">
                                        <IconButton variant="text" onClick={() => handleDeleteBrand(brand.idthuonghieu, brand.thuonghieuten)}>
                                            <TrashIcon style={{ color: 'red' }} className="h-4 w-4" />
                                        </IconButton>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
