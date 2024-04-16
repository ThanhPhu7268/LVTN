import React, { useState, useEffect } from 'react';
import { Form, Input, Table, Image, InputNumber, Radio, Row, Col, message, Popconfirm } from 'antd';
import { Card, Button, } from '@material-tailwind/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import '../../assets/css/cartform.css';
import HeaderHome from './header';

const { Column } = Table;

const Cart = () => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isPayPalVisible, setIsPayPalVisible] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    setCartItems(cart || []);
  }, []);

  const handleDeleteItem = (productId) => {
    const updatedItems = cartItems.filter(item => item.idproduct !== productId);
    setCartItems(updatedItems);
    message.success('Bạn đã xoá thành công');
    window.localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Tính lại tổng tiền tạm tính sau khi xoá sản phẩm
    calculateTotalPrice(updatedItems);
  };
  // Thêm hàm updateCartItemQuantity để cập nhật số lượng của mặt hàng trong localStorage
  const updateCartItemQuantity = (productId, quantity) => {
    const updatedItems = cartItems.map(item => {
      if (item.idproduct === productId) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(updatedItems);
    window.localStorage.setItem('cart', JSON.stringify(updatedItems));

    // Tính lại tổng giá trị của giỏ hàng sau khi cập nhật số lượng
    calculateTotalPrice(updatedItems);
  };

  // Thay đổi hàm handleQuantityChange để gọi hàm updateCartItemQuantity
  const handleQuantityChange = (record, quantity) => {
    const cartItemsFromLocalStorage = JSON.parse(window.localStorage.getItem('cart')) || [];

    if (quantity === 0) {
      // Hiển thị thông báo khi số lượng là 0
      message.info('Bạn có chắc muốn xoá sản phẩm này khỏi giỏ hàng không?');
      return;
    }

    const updatedCartItems = cartItemsFromLocalStorage.map(item => {
      if (item.idproduct === record.idproduct) {
        return { ...item, quantity };
      }
      return item;
    });

    window.localStorage.setItem('cart', JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);

    // Tính lại tổng tiền tạm tính dựa trên số lượng mới của các mặt hàng trong giỏ hàng
    calculateTotalPrice(updatedCartItems);
  };

  useEffect(() => {
    const storedTotalPrice = JSON.parse(window.localStorage.getItem('totalPrice'));
    if (storedTotalPrice) {
      setTotalPrice(storedTotalPrice);
    }
  }, []);

  const calculateTotalPrice = (cartItems) => {
    let totalUSD = 0;
    cartItems.forEach(item => {
      const priceUSD = item.price;
      totalUSD += priceUSD * item.quantity;
    });
    setTotalPrice(totalUSD);

    // Lưu tổng tiền vào localStorage
    window.localStorage.setItem('totalPrice', totalUSD);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toString(),
            currency_code: "USD"
          }
        }
      ]
    });
  };


  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details) {
        const nguoiDat = form.getFieldValue('fullName');
        const sodienthoai = form.getFieldValue('phoneNumber');
        const diachi = form.getFieldValue('address');
        const ghichu = form.getFieldValue('note');
        const pttt = '2';
        const cartItems = JSON.parse(window.localStorage.getItem('cart'));
        const totalPrice = JSON.parse(window.localStorage.getItem('totalPrice'));
        const user = JSON.parse(localStorage.getItem('user'));
        const idkhachhang = user.idkhachhang;

        fetch('http://localhost:8080/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idsanpham: cartItems.map(item => item.idproduct),
            quantity: cartItems.map(item => item.quantity),
            giaSanPham: cartItems.map(item => item.price),
            tongGia: totalPrice,
            sanPham: cartItems,
            idkhachhang,
            nguoiDat,
            sodienthoai,
            diachi,
            ghichu,
            pttt,
          })
        })
          .then(response => response.json())
          .then(result => {
            // Xử lý kết quả từ server
            console.log(result);
            setCartItems([]);
            window.localStorage.removeItem('cart');
            // Hiển thị thông báo cho người dùng
            message.success('Đặt hàng thành công!');
          })
          .catch(error => {
            // Xử lý lỗi
            console.error(error);
          });
      }
    });
  };

  //     // Thực hiện các thao tác khi thanh toán thành công
  //     // Ví dụ: Lấy dữ liệu từ Local Storage và từ các trường input

  //     // Tạo object chứa thông tin đơn hàng
  //     const orderData = {
  //       idsanpham: cartItems.map(item => item.idproduct),
  //       soluong: cartItems.map(item => item.quantity),
  //       giaSanPham: cartItems.map(item => item.price),
  //       tongGia: totalPrice,
  //       idkhachhang,
  //       nguoiDat,
  //       sodienthoai,
  //       diachi,
  //       ghichu,
  //       pttt,
  //     };
  //     console.log(orderData);
  //     // Xóa giỏ hàng sau khi đặt hàng thành công
  //     setCartItems([]);
  //     window.localStorage.removeItem('cart');
  //     // Hiển thị thông báo cho người dùng
  //     message.success('Đặt hàng thành công!');
  //   });
  // };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    if (e.target.value === 'PayPal') {
      setIsPayPalVisible(true);
    } else {
      setIsPayPalVisible(false);
    }
  };
  // const onFinish = (values) => {
  //   console.log(values);
  //   message.success('Đặt hàng thành công!');
  //   setCartItems([]);
  //   window.localStorage.removeItem('cart');
  // };
  const onFinish = (event) => {
    event.preventDefault();
    const nguoiDat = form.getFieldValue('fullName');
    const sodienthoai = form.getFieldValue('phoneNumber');
    const diachi = form.getFieldValue('address');
    const ghichu = form.getFieldValue('note');
    const pttt = '1';
    const cartItems = JSON.parse(window.localStorage.getItem('cart'));
    const totalPrice = JSON.parse(window.localStorage.getItem('totalPrice'));
    const user = JSON.parse(localStorage.getItem('user'));
    const idkhachhang = user.idkhachhang;
    if (cartItems) {
      const isConfirmed = window.confirm('Vui lòng kiểm tra kỹ giỏ hàng trước khi nhấn "OK" ?');
      if (isConfirmed) {
        fetch('http://localhost:8080/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idsanpham: cartItems.map(item => item.idproduct),
            quantity: cartItems.map(item => item.quantity),
            giaSanPham: cartItems.map(item => item.price),
            tongGia: totalPrice,
            sanPham: cartItems,
            idkhachhang,
            nguoiDat,
            sodienthoai,
            diachi,
            ghichu,
            pttt,
          })
        })
          .then(response => response.json())
          .then(result => {
            // Xử lý kết quả từ server
            console.log(result);
            setCartItems([]);
            window.localStorage.removeItem('cart');
            // Hiển thị thông báo cho người dùng
            message.success('Đặt hàng thành công!');
          })
          .catch(error => {
            // Xử lý lỗi khi gửi đơn hàng
            console.error('Lỗi khi gửi đơn hàng:', error);
            // Hiển thị thông báo lỗi cho người dùng
            message.error('Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại sau.');
          });
      } else {
        // Thực hiện hành động khi người dùng nhấn "Cancel" hoặc tắt hộp thoại
        // Ví dụ: Không làm gì cả, hoặc hiển thị thông báo khác, vv.
      }
      // Truy cập dữ liệu đã nhập trong formData và xử lý theo yêu cầu của bạn
    } else {
      alert('Giỏ hàng rỗng!!')
    }

  };

  const isPaymentDetailsFilled = () => {
    if (paymentMethod === 'PayPal') {
      const fieldsToCheck = ['fullName', 'phoneNumber', 'address'];
      return fieldsToCheck.every(field => form.getFieldValue(field));
    }
    return true;
  };

  return (
    <div>
      <HeaderHome />
      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={17}>
          <Card style={{ marginLeft: '20px', border: '1px solid rgb(215 208 208)', borderRadius: '0' }}>
            <Table dataSource={cartItems} pagination={false}>
              <Column
                title="Item"
                dataIndex="productImg"
                key="image"
                render={(productImg) => <Image src={productImg} width={100} />}
              />
              <Column title="Product Name" dataIndex="productName" key="name" />
              <Column
                title="Price"
                dataIndex="price"
                key="price"
                render={(price) => <span>{price.toLocaleString()} USD</span>}
              />
              <Column
                title="Quantity"
                dataIndex="quantity"
                key="quantity"
                render={(quantity, record) => (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '20px', cursor: 'pointer', marginRight: '2px' }} onClick={() => handleQuantityChange(record, quantity - 1)}>
                      <svg style={{ width: '20px', height: '28px', border: '0.1px solid #d9d9d9' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12" />
                      </svg>
                    </span>
                    <Input
                      min={1}
                      style={{ textAlign: 'center', width: '40px', height: '28px', borderRadius: '0' }}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(record, parseInt(e.target.value))}
                    />
                    <span style={{ width: '20px', cursor: 'pointer' }} onClick={() => handleQuantityChange(record, quantity + 1)}>
                      <svg style={{ width: '20px', height: '28px', border: '0.1px solid #d9d9d9', marginLeft: '2px' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                        <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m-6-6h12" />
                      </svg>
                    </span>
                  </div>
                )}
              />
              <Column
                title="Total"
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
                  <span type="link" danger onClick={() => handleDeleteItem(record.idproduct)}>
                    <svg style={{ color: 'gray', width: '24px', cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M9.17 4a3.001 3.001 0 0 1 5.66 0m5.67 2h-17m15.333 2.5l-.46 6.9c-.177 2.654-.265 3.981-1.13 4.79c-.865.81-2.196.81-4.856.81h-.774c-2.66 0-3.991 0-4.856-.81c-.865-.809-.954-2.136-1.13-4.79l-.46-6.9M9.5 11l.5 5m4.5-5l-.5 5" /></svg></span>
                )}
              />
            </Table>
          </Card>
        </Col>
        <Col span={7}>
          <Card style={{ padding: '20px', border: '1px solid rgb(215 208 208)', borderRadius: '0' }}>
            <Form form={form} layout="vertical">
              <div style={{ marginTop: '20px' }}>

                {paymentMethod === 'COD' && (
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Họ và tên" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                          <Input style={{ borderRadius: '0' }} placeholder="Nhập họ và tên" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Số điện thoại" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                          <Input style={{ borderRadius: '0' }} placeholder="Nhập số điện thoại" />
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
                          <Input.TextArea style={{ borderRadius: '0' }} placeholder="Nhập địa chỉ nhận hàng" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="Ghi chú"
                          name="note">
                          <Input.TextArea style={{ borderRadius: '0' }} placeholder="Nhập ghi chú thêm (Nếu có)" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )}
                <div style={{ textAlign: 'right', fontSize: '15px', fontWeight: 'bold' }}>
                  Tổng tiền tạm tính: <strong style={{ color: 'red' }}>{totalPrice.toLocaleString()} USD</strong>
                </div>
                <Form.Item
                  label="Phương thức thanh toán"
                  name="paymentMethod"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                >
                  <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
                    <Radio value="PayPal">Thanh toán bằng PayPal</Radio>
                  </Radio.Group>
                </Form.Item>

                {isPayPalVisible && isPaymentDetailsFilled() && (
                  <PayPalScriptProvider value="online" options={{ "client-id": "AcOG8gBNAy9KzZ5DbNaawBqbADMz8iVB_evLQtrpPwHq7k23E76NZYyqv-0Pj5PvcnRCUBjpMcKICaWX" }}>
                    <PayPalButtons
                      createOrder={createOrder}
                      onApprove={onApprove}
                    />
                  </PayPalScriptProvider>
                )}

                {!isPaymentDetailsFilled() && paymentMethod === 'PayPal' && (
                  <div style={{ color: 'red' }}>Vui lòng điền đầy đủ thông tin trước khi thanh toán bằng PayPal.</div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Form.Item>
                    <Button type="primary" onClick={onFinish} htmlType="submit"
                      style={{ padding: '10px 30px 10px 30px', borderRadius: '0', width: '172px', margin: 'auto' }}>
                      Đặt hàng
                    </Button>
                  </Form.Item>
                </div>
              </div>
            </ Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
