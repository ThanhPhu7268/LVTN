import React from 'react';
import { Form, Input, Button } from 'antd';
import '../../assets/css/login.css'

const RegistrationForm = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="registration-container">
            <Form
                name="registration-form"
                onFinish={onFinish}
                className="registration-form"
            >
                <h2 className="registration-title">Sign Up</h2>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className="registration-input" placeholder="Username" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                >
                    <Input className="registration-input" placeholder="Email" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' },
                    ]}
                >
                    <Input.Password className="registration-input" placeholder="Password" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords are incorrect!');
                            },
                        }),
                    ]}
                >
                    <Input.Password className="registration-input" placeholder="Confirm Password" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="registration-button">
                        Sign Up
                    </Button>
                </Form.Item>

                <div className="registration-footer">
                    Already have an account? <a href="/login">Log in</a>
                </div>
            </Form>
        </div>
    );
};

export default RegistrationForm;