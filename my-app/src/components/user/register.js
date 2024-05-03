import React, { useState } from 'react';
import { Form, Input, message } from 'antd';
import { Button } from '@material-tailwind/react'
import '../../assets/css/login.css';
import axios from 'axios';


const RegistrationForm = () => {

    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        try {
            const response = await axios.get(`http://localhost:8080/api/account/${values.username}`);
            let user = response.data;
            if (user.length > 0) {
                message.warning('Tài khoản đã tồn tại!');
            } else {
                message.success('Bạn đã tạo tài khoản thành công!');
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
            <div style={{ display: 'flex', borderRadius: '40px', background: 'white' }}>
                <Form name="registration-form" onFinish={onFinish} className="registration-form">
                    <h2 className="registration-title">Sign Up</h2>
                    <div style={{ display: 'flex' }}>
                        <Form.Item
                            name="fullName"
                            style={{ width: '58% ', gap: '2px' }}
                            rules={[{ required: true, message: 'Please input your full name!' }]}
                        >
                            <Input className="registration-input" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
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
                    </div>
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
                        <Button type="submit" htmlType="submit" className="registration-button text-black">
                            Sign Up
                        </Button>
                    </Form.Item>

                    <div className="registration-footer">
                        Already have an account? <a href="/login">Log in</a>
                    </div>
                </Form>
                <img
                    style={{ height: '90vh', width: 'auto', borderTopRightRadius: '25px', borderBottomRightRadius: '0', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.459)' }}
                    src='https://www.omegawatches.com/media/catalog/product/o/m/omega-speedmaster-chronoscope-co-axial-master-chronometer-chronograph-43_mm-52260435102001-portrait-3-9cec87.png?w=720' />
            </div>
        </div>
    );
};

export default RegistrationForm;