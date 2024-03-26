import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Form, Input, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdminSidebar from './adminsidebar';
import '../../assets/css/sidebar.css';
import axios from 'axios';

const { Option } = Select;

const AdminProducts = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [products, setProducts] = useState([]);

    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSubmit = (values) => {
        const newProduct = {
            id: products.length + 1,
            ...values,
        };

        setProducts([...products, newProduct]);
        form.resetFields();
        setIsModalVisible(false);
    };
    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Chất liệu',
            dataIndex: 'material',
            key: 'material',
        },
        {
            title: 'Kiểu mặt',
            dataIndex: 'faceType',
            key: 'faceType',
        },
        {
            title: 'Thương hiệu',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Kích thước',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Loại máy',
            dataIndex: 'movement',
            key: 'movement',
        }, {
            title: 'Thao tác',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <span>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="link" onClick={() => handleDelete(record)}>
                        Xoá
                    </Button>
                </span>
            ),
        }
    ];
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </div>
    );

    const handleEdit = (record) => {
        // Hiển thị modal sửa và điền dữ liệu sản phẩm vào form
        form.setFieldsValue(record); // Điền dữ liệu sản phẩm vào form
        setIsModalVisible(true); // Hiển thị modal sửa
    };

    const handleDelete = (record) => {
        // Hiển thị xác nhận xoá và xử lý xoá sản phẩm sau khi xác nhận
        Modal.confirm({
            title: 'Xác nhận xoá',
            content: 'Bạn có chắc chắn muốn xoá sản phẩm này?',
            okText: 'Đồng ý',
            cancelText: 'Hủy',
            onOk: () => {
                const updatedProducts = products.filter((item) => item.id !== record.id);
                setProducts(updatedProducts);
            },
        });
    };

    return (
        <div className="admin-container">
            <AdminSidebar />
            <div>
                <Button type="primary" onClick={showModal} className='admin-btnplus' icon={<PlusOutlined />}>
                    Thêm sản phẩm
                </Button>
                <Table dataSource={products} columns={columns} />

                <Modal
                    title="Thêm sản phẩm"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={null}
                >
                    <Form form={form} onFinish={handleSubmit}>
                        <Form.Item name="name" label="Tên sản phẩm" placeholder="Nhập tên sản phẩm" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item name="price" label="Giá" placeholder="Thêm giá" rules={[{ required: true }]}>
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả" placeholder="Mô tả sản phẩm">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item name="gender" label="Sản phẩm giới tính" rules={[{ required: true }]} placeholder="Chọn giới tính">
                            <Select>
                                <Option value="1">Nam</Option>
                                <Option value="2">Nữ</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="material" label="Chất liệu" rules={[{ required: true }]}>
                            <Select>
                                <Option value="kính sapphire">Kính Sapphire</Option>
                                <Option value="kính cứng">Kính cứng</Option>
                                <Option value="kính hardlex">Kính Hardlex</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="faceType" label="Kiểu mặt" rules={[{ required: true }]}>
                            <Select>
                                <Option value="mặt tròn">Mặt tròn</Option>
                                <Option value="mặt vuông">Mặt vuông</Option>
                                <Option value="oval">Oval</Option>
                                <Option value="chữ nhật">Chữ nhật</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="brand" label="Thương hiệu" rules={[{ required: true }]}>
                            <Select>
                                <Option value="Casio">Casio</Option>
                                <Option value="G-Shock">G-Shock</Option>
                                <Option value="Hublot">Hublot</Option>
                                <Option value="Seiko">Seiko</Option>
                                <Option value="Tissot">Tissot</Option>
                                <Option value="Citizen">Citizen</Option>
                                <Option value="Certina">Certina</Option>
                                <Option value="Movado">Movado</Option>
                                <Option value="Omega">Omega</Option>
                                <Option value="Orient">Orient</Option>
                                <Option value="Longines">Longines</Option>
                                <Option value="Bentley">Bentley</Option>
                                <Option value="Daniel Klein">Daniel Klein</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="size" label="Kích thước" rules={[{ required: true }]}>
                            <Select>
                                <Option value="Dưới 25mm">Dưới 25mm</Option>
                                <Option value="25mm-30mm">25mm-30mm</Option>
                                <Option value="30mm-35mm">30mm-35mm</Option>
                                <Option value="35mm-38mm">35mm-38mm</Option>
                                <Option value="38mm-40mm">38mm-40mm</Option>
                                <Option value="40mm-43mm">40mm-43mm</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="movement" label="Loại máy" rules={[{ required: true }]}>
                            <Select>
                                <Option value="đồng hồ điện tử (Quartz)">Đồng hồ điện tử (Quartz)</Option>
                                <Option value="đồng hồ cơ (Mechanical)">Đồng hồ cơ (Mechanical)</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="image" label="Hình ảnh sản phẩm">
                            <Upload
                                name="image"
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={() => false}
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default AdminProducts;