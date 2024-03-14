import React from 'react';
import { Form, Input, Mentions, Button, Radio, Steps, Breadcrumb } from 'antd';
import '../../assets/css/cart.css';
import HeaderHome from './header';
const { Option } = Mentions;
const { Step } = Steps;

const Cart = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div>
      <HeaderHome />
      <Breadcrumb>
        <Breadcrumb.Item> <i class="fa-solid fa-house"></i> Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
      </Breadcrumb>
      <div className="bar-cart">
        <Steps size="small" current={2} className="steps-container">
          <Step title="Đơn Hàng" />
          <Step title="Giỏ Hàng" />
          <Step title="Thanh Toán" />
        </Steps>
      </div>
      <div>
        <Form onFinish={onFinish} className="payment-form">
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Mentions>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="TP.HCM">TP.HCM</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Mentions>
          </Form.Item>
          <Form.Item
            label="Phương thức thanh toán"
            name="paymentMethod"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
          >
            <Radio.Group>
              <Radio value="creditCard">Thẻ tín dụng</Radio>
              <Radio value="bankTransfer">Chuyển khoản ngân hàng</Radio>
              <Radio value="cash">Tiền mặt</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="btn-submit">Đặt hàng</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Cart;