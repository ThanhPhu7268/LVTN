import React, { useState } from 'react';
import { Table, Space, Button, Modal } from 'antd'; // Import Modal từ 'antd'
import { PDFViewer, BlobProvider } from '@react-pdf/renderer'; // Import BlobProvider từ '@react-pdf/renderer'
import Invoice from './invoice';


const PurchaseHistory = () => {
    const [visible, setVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState(null);
    const dataSource = [
        {
            key: '1',
            orderNumber: '#6d54d506	',
            purchaseDate: '2024-04-13',
            totalPrice: 100,
            paymentMethod: 'Paypal',
            status: 'Đang xử lý',
            products: [
                {
                    key: '1',
                    image: 'https://wscdn.vn/upload/image/1-KHUNG-SP-6676612-550872714.webp',
                    productName: 'Casio - Nam AE-1200WHD-1AVDF',
                },
                {
                    key: '2',
                    image: 'https://wscdn.vn/upload/original-image/LA670WA-7DF.jpg',
                    productName: 'Casio - Nữ LA670WA-7DF',
                },
            ],
        },
        // Thêm dữ liệu cho các đơn hàng khác tương tự
    ];

    const handlePrint = (record) => {
        setCurrentRecord(record);
        setVisible(true);
    };

    const handleCloseModal = () => {
        setVisible(false);
        setCurrentRecord(null);
    };

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
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (text, record) => ( // Sử dụng tham số record ở đây
                <Space size="middle">
                    {/* Các nút thao tác, ví dụ: xem chi tiết đơn hàng, in hóa đơn, v.v. */}
                    <a href="#">Xem chi tiết</a>
                    <Button onClick={() => handlePrint(record)}>In hóa đơn</Button> {/* Truyền record vào handlePrint */}
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
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                expandedRowRender={expandedRowRender}
                pagination={false}
                style={{ maxWidth: '1200px', margin: 'auto', marginTop: '50px', marginBottom: '50px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.459)' }}
            />
            <Modal
                visible={visible}
                title="Hoá đơn"
                onCancel={handleCloseModal}
                footer={[
                    <Button key="back" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                    <BlobProvider document={<Invoice {...currentRecord} />}>
                        {({ blob, url, loading, error }) => (
                            <Button key="download" href={url} download="invoice.pdf">
                                Tải xuống
                            </Button>
                        )}
                    </BlobProvider>,
                ]}
            >
                <PDFViewer width="100%" height="600px">
                    <Invoice {...currentRecord} />
                </PDFViewer>
            </Modal>
        </div>
    );
};

export default PurchaseHistory;