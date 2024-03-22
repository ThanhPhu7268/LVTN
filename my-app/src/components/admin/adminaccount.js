import React, { useState } from 'react';
import { Layout, Table, Button, Modal, Form, Input, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AdminSidebar from './adminsidebar';
const { Header, Content } = Layout;

const AdminAccount = () => {
    const [accountList, setAccountList] = useState([
        {
            id: 1,
            fullName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'example1@gmail.com',
            username: 'user1',
            password: 'password1',
            createdAt: new Date().toISOString(),
        },
        {
            id: 2,
            fullName: 'Nguyễn Văn B',
            phoneNumber: '0987654321',
            email: 'example2@gmail.com',
            username: 'user2',
            password: 'password2',
            createdAt: new Date().toISOString(),
        },
        // ...Thêm tài khoản khác vào danh sách
    ]);

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'SĐT', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Tài khoản', dataIndex: 'username', key: 'username' },
        { title: 'Mật khẩu', dataIndex: 'password', key: 'password' },
        { title: 'Ngày tạo', dataIndex: 'createdAt', key: 'createdAt' },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Sửa
                    </Button>
                    <Button type="danger" onClick={() => handleDelete(record)}>
                        Xoá
                    </Button>
                </Space>
            ),
        },
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

    const handleModalOk = () => {
        form.validateFields().then((values) => {
            if (selectedAccount) {
                // Xử lý logic sửa tài khoản
                const updatedAccountList = accountList.map((item) =>
                    item.id === selectedAccount.id ? { ...item, ...values } : item
                );
                setAccountList(updatedAccountList);
            } else {
                // Xử lý logic tạo mới tài khoản
                const newAccount = {
                    id: accountList.length + 1,
                    createdAt: new Date().toISOString(),
                    ...values,
                };
                setAccountList([...accountList, newAccount]);
            }
            form.resetFields();
            setSelectedAccount(null);
            setModalVisible(false);
        });
    };

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
            <AdminSidebar />
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <div>
                        <span>DASHBOARD</span>
                    </div>
                </Header>
                {/* Nút thêm mới tài khoản */}
                <Button type="primary" onClick={handleAddAccount} icon={<PlusOutlined />} style={{ width: '20%', margin: '30px' }}>
                    Thêm mới tài khoản
                </Button>
                <Content style={{ margin: '16px' }}>
                    {/* Bảng liệt kê tài khoản */}
                    <Table columns={columns} dataSource={accountList} />

                    {/* Modal sửa/tạo mới tài khoản */}
                    <Modal
                        title={selectedAccount ? 'Sửa tài khoản' : 'Tạo mới tài khoản'}
                        visible={modalVisible}
                        onOk={handleModalOk}
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
        </Layout>
    );
};

export default AdminAccount;