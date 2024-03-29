import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdminSidebar from './adminsidebar';

import axios from 'axios';
const { Header, Content } = Layout;


const AdminAccount = () => {
    const [accountList, setAccountList] = useState([
        // ...Thêm tài khoản khác vào danh sách
    ]);

    const [account, setAccount] = useState([])
    useEffect(() => {
        getAccount()
    }, []);

    const getAccount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/account/`);
            setAccount(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        { title: 'ID', dataIndex: 'idtaikhoan', key: 'id' },
        { title: 'Họ và tên', dataIndex: 'khachhangten', key: 'khachhangten' },
        { title: 'SĐT', dataIndex: 'khachhangsdt', key: 'khachhangsdt' },
        { title: 'Email', dataIndex: 'khachhangemail', key: 'khachhangemail' },
        { title: 'Tài khoản', dataIndex: 'taikhoanten', key: 'taikhoanten' },
        { title: 'Mật khẩu', dataIndex: 'matkhau', key: 'matkhau' },
        { title: 'Ngày tạo', dataIndex: 'khachhangngaytao ', key: 'khachhangngaytao' },
        // {
        //     title: 'Hành động',
        //     key: 'action',
        //     render: (text, record) => (
        //         <Space>
        //             <Button type="primary" onClick={() => handleEdit(record)}>
        //                 Sửa
        //             </Button>
        //             <Button type="danger" onClick={() => handleDelete(record)}>
        //                 Xoá
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];

    const handleEdit = (account) => {
        setSelectedAccount(account);
        setModalVisible(true);
        form.setFieldsValue(account);
    };

    const handleDelete = (account) => {
        const updatedList = accountList.filter((item) => item.id !== account.id);
        setAccountList(updatedList);
    };

    // const handleModalOk = () => {
    //     form.validateFields().then((values) => {
    //         if (selectedAccount) {
    //             // Xử lý logic sửa tài khoản
    //             const updatedAccountList = accountList.map((item) =>
    //                 item.id === selectedAccount.id ? { ...item, ...values } : item
    //             );
    //             setAccountList(updatedAccountList);
    //         } else {
    //             // Xử lý logic tạo mới tài khoản
    //             const newAccount = {
    //                 id: accountList.length + 1,
    //                 createdAt: new Date().toISOString(),
    //                 ...values,
    //             };
    //             setAccountList([...accountList, newAccount]);
    //         }
    //         form.resetFields();
    //         setSelectedAccount(null);
    //         setModalVisible(false);
    //     });
    // };

    const handleModalCancel = () => {
        form.resetFields();
        setSelectedAccount(null);
        setModalVisible(false);
    };

    const handleAddAccount = () => {
        setSelectedAccount(null);
        setModalVisible(true);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* ... */}
            {/* Nút thêm mới tài khoản */}
            <Button type="primary" onClick={handleAddAccount} icon={<PlusOutlined />} style={{ width: '20%', margin: '30px' }}>
                Thêm mới tài khoản
            </Button>
            <Content style={{ margin: '16px' }}>
                {/* Bảng liệt kê tài khoản */}
                <Table columns={columns} dataSource={account} />

                {/* Modal sửa/tạo mới tài khoản */}
                <Modal
                    title={selectedAccount ? 'Sửa tài khoản' : 'Tạo mới tài khoản'}
                    visible={modalVisible}
                    onCancel={handleModalCancel}
                >
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="fullName"
                            label="Họ và tên"
                            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            label="SĐT"
                            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                { required: true, message: 'Vui lòng nhập email' },
                                { type: 'email', message: 'Email không hợp lệ' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Tài khoản"
                            rules={[{ required: true, message: 'Vui lòng nhập tài khoản' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>
                </Modal>


            </Content>
        </Layout>
    );
};

export default AdminAccount;