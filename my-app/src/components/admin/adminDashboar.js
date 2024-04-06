import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Breadcrumbs,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { BanknotesIcon, ChartBarIcon, CreditCardIcon } from "@heroicons/react/24/outline";

const lineChartConfig = {
    type: "line",
    height: 240,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        // Configuration options for the Line Chart
        // ...
    },
};

const barChartConfig = {
    type: "bar",
    height: 240,
    series: [
        {
            name: "Sales",
            data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
        },
    ],
    options: {
        // Configuration options for the Bar Chart
        // ...
    },
};

export default function Revenue() {
    return (
        <div>
            <Breadcrumbs className=" w-72 flex" style={{ margin: '20px', width: '72%', marginLeft: '355px', background: 'white', color: 'black' }}>
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
            <div className=" w-72 flex" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
                {/* Today's Revenue */}
                <Card style={{ margin: 'auto' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                            <BanknotesIcon className="h-6 w-6" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Today money
                            </Typography>
                            <Typography variant="h3" color="blue-gray">
                                $203
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">

                    </CardBody>
                </Card>

                {/* Sold Products */}
                <Card style={{ margin: 'auto' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                            <CreditCardIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Visualize sold products.
                            </Typography>
                            <Typography variant="h4" color="blue-gray">
                                Sold Products
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        {/* Render appropriate chart or data for Sold Products */}
                    </CardBody>
                </Card>

                {/* Total Revenue */}
                <Card style={{ margin: ' 12px auto 12px auto' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >
                        <div className="w-max rounded-lg bg-gray-900 p-3 text-white">
                            <ChartBarIcon className="h-6 w-6" />
                        </div>
                        <div>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Total Revenue
                            </Typography>
                            <Typography variant="h3" color="blue-gray">
                                $4072
                            </Typography>

                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        {/* Render appropriate chart or data for Total Revenue */}
                    </CardBody>
                </Card>
            </div>
            <div className=" w-72 flex" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
                <Card style={{ marginRight: '10px', width: '47%', margin: 'auto' }}>
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

                                Monthly revenue statistics
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...lineChartConfig} />
                    </CardBody>
                </Card>

                <Card style={{ width: '47%', margin: 'auto' }}>
                    <CardHeader
                        floated={false}
                        shadow={false}
                        color="transparent"
                        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                    >

                        <div>
                            <Typography variant="h6" color="blue-gray">
                                Quarterly Revenue
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="max-w-sm font-normal"
                            >
                                Quarterly revenue statistics
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody className="px-2 pb-0">
                        <Chart {...barChartConfig} />
                    </CardBody>
                </Card>
            </div>
        </div >
    );
}
