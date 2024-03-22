import React from 'react';
import { Avatar, Form, Input, Button } from 'antd';
import { UserOutlined, PhoneOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons';

const PersonalInfo = () => {
    const onFinish = (values) => {
        console.log('Form values:', values);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Form
                name="personalInfoForm"
                onFinish={onFinish}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ width: '500px', padding: '20px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <Avatar size={120} src="https://i.pinimg.com/564x/c5/04/ce/c504ce97f611b279f88b30858e19dd0a.jpg" />
                </div>
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                >
                    <Input prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                >
                    <Input prefix={<PhoneOutlined />} />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                >
                    <Input prefix={<HomeOutlined />} />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: 'Vui lòng nhập email!' },
                        { type: 'email', message: 'Email không hợp lệ!' },
                    ]}
                >
                    <Input prefix={<MailOutlined />} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default PersonalInfo;