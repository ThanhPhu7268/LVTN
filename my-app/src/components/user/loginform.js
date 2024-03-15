import '../../assets/css/login.css'
import React from 'react';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';


const LoginForm = () => {
    const onFinish = (values) => {
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
                    Don't have an account? <a href="/register"> Sign up</a>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;