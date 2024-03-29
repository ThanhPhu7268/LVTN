import React from 'react';
import { Form, Input, Button, Empty, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/api/account/${values.username}`
            );
            let user = response.data;
            if (user.length > 0) {
                if (user[0].matkhau === values.password) {
                    message.success('Đăng nhập thành công!');
                    localStorage.setItem('user', JSON.stringify(user[0]));

                    // Kiểm tra vai trò và chuyển hướng
                    if (user[0].taikhoanvaitro === '1') {
                        navigate('/admin'); // Chuyển hướng đến trang admin
                    } else {
                        navigate('/'); // Chuyển hướng đến trang chủ (khách hàng)
                    }
                    const response = await axios.get(
                        `http://localhost:8080/api/cart/cartProducts?id=${user[0].idkhachhang}`
                    );
                    localStorage.setItem('cart', JSON.stringify(response.data));
                    if (response.data.length !== 0) {
                        await axios.delete(`http://localhost:8080/api/cart/${response.data[0].idcart}`)
                            .then(response => {
                                console.log('Item deleted successfully');
                                // Thực hiện các hành động khác sau khi xóa thành công, nếu cần
                            })
                            .catch(error => {
                                console.error('Error deleting item:', error);
                                // Xử lý lỗi nếu có
                            });
                    }

                } else {
                    message.error('Sai Mật Khẩu!');
                }
            } else {
                message.warning('Đăng nhập không thành công!');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        console.log('Received values of form: ', values);
    };

    return (
        <div className="login-container">
            <Form
                name="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                className="login-form"
            >
                <h2 className="login-title">LOGIN</h2>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className="login-input" placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password className="login-input" placeholder="Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-button">
                        Log In
                    </Button>
                </Form.Item>

                <div className="login-footer">
                    Don't have an account? <Link to="/register"> Sign up</Link>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;