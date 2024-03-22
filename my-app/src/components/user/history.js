import React from 'react';
import { Table, Space } from 'antd';

const PurchaseHistory = () => {
    const dataSource = [
        {
            key: '1',
            orderNumber: 'ORD-001',
            purchaseDate: '2022-03-20',
            totalPrice: 1500000,
            paymentMethod: 'COD',
            products: [
                {
                    key: '1',
                    image: 'URL_HÌNH_ẢNH_1',
                    productName: 'Sản phẩm 1',
                },
                {
                    key: '2',
                    image: 'URL_HÌNH_ẢNH_2',
                    productName: 'Sản phẩm 2',
                },
            ],
        },
        // Thêm dữ liệu cho các đơn hàng khác tương tự
    ];

    const columns = [
        {
            title: 'Số đơn hàng',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            render: (orderNumber, record) => ({
                children: orderNumber,
                props: {
                    rowSpan: record.products.length,
                },
            }),
        },
        {
            title: 'Ngày mua',
            dataIndex: 'purchaseDate',
            key: 'purchaseDate',
            render: (_, record) => ({
                children: record.purchaseDate,
                props: {
                    rowSpan: record.products.length,
                },
            }),
        },
        {
            title: 'Tổng giá đơn hàng',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (_, record) => ({
                children: record.totalPrice.toLocaleString(),
                props: {
                    rowSpan: record.products.length,
                },
            }),
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (_, record) => ({
                children: record.paymentMethod,
                props: {
                    rowSpan: record.products.length,
                },
            }),
        },
        // {
        //     title: 'Hình ảnh sản phẩm',
        //     dataIndex: 'image',
        //     key: 'image',
        //     render: (image) => <img src={image} alt="Product" style={{ width: '50px' }} />,
        // },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: () => (
                <Space size="middle">
                    {/* Các nút thao tác, ví dụ: xem chi tiết đơn hàng, in hóa đơn, v.v. */}
                    <a href="#">Xem chi tiết</a>
                    <a href="#">In hóa đơn</a>
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record) => {
        const productColumns = [
            {
                title: 'Hình ảnh sản phẩm',
                dataIndex: 'image',
                key: 'image',
                render: (image) => <img src={image} alt="Product" style={{ width: '50px' }} />,
            },
            {
                title: 'Tên sản phẩm',
                dataIndex: 'productName',
                key: 'productName',
            },
            {
                title: 'Thao tác',
                key: 'action',
                render: () => (
                    <Space size="middle">
                        {/* Các nút thao tác cho từng sản phẩm */}
                        <a href="#">Xem chi tiết</a>
                        <a href="#">Thêm vào giỏ hàng</a>
                    </Space>
                ),
            },
        ];

        return <Table dataSource={record.products} columns={productColumns} pagination={false} />;
    };

    return (
        <Table
            dataSource={dataSource}
            columns={columns}
            expandedRowRender={expandedRowRender}
            pagination={false}
            style={{ maxWidth: '1200px', margin: 'auto', marginTop: '50px', marginBottom: '50px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.459)' }}
        />
    );
};

export default PurchaseHistory;