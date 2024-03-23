import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Table, Image, InputNumber, Radio, Row, Col } from 'antd';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import '../../assets/css/cartform.css';
import HeaderHome from './header';

const { Column } = Table;

const Cart = () => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Sản phẩm 1',
      image: 'https://wscdn.vn/upload/image/OP990-45ADGK-GL-X-1-389108085-1244847867.webp',
      price: 50,
      quantity: 2
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      image: 'https://wscdn.vn/upload/image/uploads/images/OP990-45ADGS-GL-D-1-1655171724651.webp',
      price: 70,
      quantity: 1
    },
    {
      id: 3,
      name: 'Sản phẩm 3',
      image: 'https://wscdn.vn/upload/image/uploads/images/OP990-45ADDGR-GL-T-2-1664954194331.webp',
      price: 90,
      quantity: 3
    }
  ]);
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleQuantityChange = (record, quantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === record.id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const calculateTotalPrice = () => {
    let totalUSD = 0;
    cartItems.forEach(item => {
      const priceUSD = item.price;
      totalUSD += priceUSD * item.quantity;
    });
    setTotalPrice(totalUSD);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toString(), // Cập nhật với giá trị mới nhất của totalPrice
            currency_code: "USD"
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      console.log(details);
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleFinish = (values) => {
    console.log('Form values:', values);
  };

  const handleDeleteItem = (product) => {
    const updatedItems = cartItems.filter(item => item.id !== product.id);
    setCartItems(updatedItems);
  };

  const onFinish = (values) => {
    // Xử lý đặt hàng
    console.log(values);
  };

  return (
    <div>
      <HeaderHome />
      <Form form={form} onFinish={handleFinish} layout="vertical" className='container-formcart'>
        <Table dataSource={cartItems} pagination={false}>
          <Column
            title="Hình ảnh"
            dataIndex="image"
            key="image"
            render={(image) => <Image src={image} width={100} />}
          />
          <Column title="Tên sản phẩm" dataIndex="name" key="name" />
          <Column
            title="Giá"
            dataIndex="price"
            key="price"
            render={(price) => <span>{price.toLocaleString()} USD</span>}
          />
          <Column
            title="Số lượng"
            dataIndex="quantity"
            key="quantity"
            render={(quantity, record) => (
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => handleQuantityChange(record, value)}
              />
            )}
          />
          <Column
            title="Thành tiền"
            dataIndex="totalPrice"
            key="totalPrice"
            render={(text, record) => (
              <span>{(record.price * record.quantity).toLocaleString()} USD</span>
            )}
          />
          <Column
            title=""
            key="delete"
            render={(text, record) => (
              <Button type="link" danger onClick={() => handleDeleteItem(record)}>
                Xoá
              </Button>
            )}
          />
        </Table>

        <div style={{ marginTop: '20px' }}>
          <div style={{ textAlign: 'right', fontSize: '15px', fontWeight: 'bold' }}>
            Tổng tiền tạm tính: <strong style={{ color: 'red' }}>{totalPrice.toLocaleString()} USD</strong>
          </div>

          {paymentMethod === 'COD' && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                    <Input placeholder="Nhập họ và tên" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={14}>
                  <Form.Item
                    label="Địa chỉ nhận hàng"
                    name="address"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng' }]}
                  >
                    <Input.TextArea placeholder="Nhập địa chỉ nhận hàng" />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    label="Ghi chú"
                    name="note">
                    <Input.TextArea placeholder="Nhập ghi chú thêm (Nếu có)" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Form.Item
            label="Phương thức thanh toán"
            name="paymentMethod"
            rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
          >
            <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
              <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>

              <PayPalScriptProvider value="online" options={{ "client-id": "AcOG8gBNAy9KzZ5DbNaawBqbADMz8iVB_evLQtrpPwHq7k23E76NZYyqv-0Pj5PvcnRCUBjpMcKICaWX" }}>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            </Radio.Group>
          </Form.Item>
          <div className="btn-dathang-container">
            <Form.Item>
              <Button type="primary" htmlType="submit" className='btn-dathang'>
                Đặt hàng
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Cart;