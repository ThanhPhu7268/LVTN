import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import '../../assets/css/login.css';
import axios from 'axios';


const RegistrationForm = () => {

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await axios.get(`http://localhost:8080/api/account/${values.username}`);
            let user = response.data;
            if (user.length > 0) {
                console.log('Tai khoan da ton tai');
            } else {
                alert('Ban da tao tai khoan thanh Cong')
                axios.post(`http://localhost:8080/api/account`, values, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        username: '',
        password: '',

    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const validatePhoneNumber = (_, value) => {
        if (!value) {
            return Promise.reject('Please input your phone number!');
        }
        if (!/^\d+$/.test(value)) {
            return Promise.reject('Please enter a valid phone number!');
        }
        if (value.length > 10) {
            return Promise.reject('Phone number should not exceed 10 characters!');
        }
        return Promise.resolve();
    };



    return (
        <div className="registration-container">
            <Form name="registration-form" onFinish={onFinish} className="registration-form">
                <h2 className="registration-title">Sign Up</h2>
                <Form.Item
                    name="fullName"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input className="registration-input" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className="registration-input" placeholder="Username" value={formData.username} onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email address!' },
                    ]}
                >
                    <Input className="registration-input" placeholder="Email" value={formData.phone} onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    name="phone"
                    rules={[
                        { required: true },
                        { validator: validatePhoneNumber },
                    ]}
                >
                    <Input className="registration-input" placeholder="Phone" value={formData.phone} onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters!' },
                    ]}
                >
                    <Input.Password className="registration-input" placeholder="Password" value={formData.password} onChange={handleChange} />
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
                    <Button type="submit" htmlType="submit" className="registration-button">
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