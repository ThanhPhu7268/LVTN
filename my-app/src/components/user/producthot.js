import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";

export default function NewProduct() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/filter/gioitinh`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            {products.map((product, index) => (
                <Card key={index} className="w-full">
                    <CardHeader shadow={false} floated={false} className="h-56">
                        <img
                            src={product.sanphamhinhdaidien}
                            alt={product.sanphamten}
                            className="h-full object-cover"
                            style={{ width: 'auto', margin: 'auto' }}
                        />
                    </CardHeader>
                    <CardBody>
                        <div className="mb-2 items-center justify-between">
                            <Typography color="blue-gray" className="font-medium">
                                {product.sanphamten}
                            </Typography>
                            <Typography color="blue-gray" className="font-medium">
                                {product.sanphamgia} USD
                            </Typography>
                        </div>
                        <Typography
                            variant="small"
                            color="gray"
                            className="font-normal opacity-75"
                        >
                            {product.description}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button
                            ripple={false}
                            fullWidth={true}
                            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                        >
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
