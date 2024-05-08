import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Breadcrumbs,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { BanknotesIcon, ChartBarIcon, CreditCardIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import axios from "axios";


export default function Revenue() {
    const [total, setTotal] = useState([])
    const [sales, setSales] = useState([])
    const [all, setAll] = useState([])
    const [now, setNow] = useState([])
    useEffect(() => {
        getTotal()
    }, []);
    const getTotal = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/analyst/total`);
            const sale = await axios.get(`http://localhost:8080/api/analyst/totalsale`);
            const revenue = await axios.get(`http://localhost:8080/api/analyst/allrevenue`);
            const nowmonth = await axios.get(`http://localhost:8080/api/analyst/revenuemonth`);
            setTotal(response.data);
            setSales(sale.data);
            setAll(revenue.data);
            setNow(nowmonth.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const lineChartConfig = {
        type: "line",
        height: 240,
        series: [
            {
                name: "Sales",
                data: all.map(item => item.revenue),
            },
            {
                name: "Order",
                data: all.map(item => item.sodonhang),
            },
            {
                name: "Profit",
                data: all.map(item => item.profit),
            },
            {
                name: "Expense",
                data: all.map(item => item.expense),
            },
        ],
        options: {
            colors: ['#437fdf', '#8e31b9', '#1ded81', '#f16e6e']
            // Configuration options for the Line Chart
            // ...
        },
    };

    const barChartConfig = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Profit",
                data: all.map(item => item.profit),
            },
        ],
        options: {
            colors: ['#34ef8e']
        },
    };

    const columnChartConfig = {
        type: "bar",
        height: 240,
        series: [
            {
                name: "Revenue",
                data: all.map(item => item.revenue),
            },
            {
                name: "Expense",
                data: all.map(item => item.expense),
            },
        ],
        options: {
            // Configuration options for the Column Chart
            colors: ['#3bff34', '#F44336']
        },
    };

    return (
        <div className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            <Breadcrumbs className=" w-72 flex" style={{ margin: '20px', background: 'white', color: 'black' }}>
                <a href="#" className="opacity-60">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        style={{ color: 'black' }}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                </a>
                <a href="#" className="opacity-60" style={{ color: 'black', textDecoration: 'none' }}>
                    <span>Dashboard</span>
                </a >
                <a style={{ color: 'black' }} href="#">Analytics</a>
            </Breadcrumbs>
            <div className=" w-72 flex" style={{ margin: '20px', width: '100%', marginLeft: 'auto' }}>

                <Card style={{ margin: 'auto', borderRadius: '0', border: '1px solid #333', height: '127px' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white" style={{ background: 'blueviolet' }}>
                            <ShoppingBagIcon className="h-8 w-8" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                                style={{ marginBottom: '0' }}
                            >
                                Total Order
                            </Typography>
                            <Typography variant="h3" color="blue-gray" style={{ textAlign: 'center' }}>
                                {total[0]?.totalOrder}
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">

                    </CardBody>
                </Card>
                {/* Sold Products */}
                <Card style={{ margin: 'auto', borderRadius: '0', border: '1px solid #333', height: '127px' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white" style={{ background: 'coral' }}>
                            <CreditCardIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                                style={{ marginBottom: '0' }}
                            >
                                Sold products.
                            </Typography>
                            <Typography variant="h3" color="blue-gray" style={{ textAlign: 'center' }}>
                                {sales[0]?.tongsanpham}
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        {/* Render appropriate chart or data for Sold Products */}
                    </CardBody>
                </Card>

                {/* Total Revenue */}
                <Card style={{ margin: 'auto', borderRadius: '0', border: '1px solid #333', height: '127px' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                            <ChartBarIcon className="h-8 w-8" />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                                style={{ marginBottom: '0', paddingTop: '8px' }}
                            >
                                Current month's <br />revenue
                            </Typography>
                            <Typography variant="h3" color="blue-gray">
                                ${now[0]?.revenue}
                            </Typography>

                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        {/* Render appropriate chart or data for Total Revenue */}
                    </CardBody>
                </Card>
                {/* Today's Revenue */}
                <Card style={{ margin: 'auto', borderRadius: '0', border: '1px solid #333', height: '127px' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                            <BanknotesIcon className="h-8 w-8" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                                style={{ marginBottom: '0', paddingTop: '8px' }}
                            >
                                Current month's <br />profit
                            </Typography>
                            <Typography variant="h3" color="blue-gray">
                                ${now[0]?.profit}
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">

                    </CardBody>
                </Card>
            </div>
            <div className=" w-72 flex" style={{ margin: '20px', width: '100%', marginLeft: 'auto' }}>
                <Card style={{ marginRight: '10px', width: '47%', margin: 'auto', border: '1px solid rgb(217 209 209)', borderRadius: '0' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Monthly Revenue
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Detailed analysis chart
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...lineChartConfig} />
                    </CardBody>
                </Card>

                <Card style={{ width: '47%', margin: 'auto', border: '1px solid rgb(217 209 209)', borderRadius: '0' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >

                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Profit
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Profit of Otis Watch
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...barChartConfig} />
                    </CardBody>
                </Card>
            </div>
            <div style={{ margin: '20px', width: '100%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
                <Card style={{ width: '100%', margin: 'auto' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Sales vs Expense
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Sales and Expense comparison
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...columnChartConfig} />
                    </CardBody>
                </Card>
            </div>
        </div >
    );
}
