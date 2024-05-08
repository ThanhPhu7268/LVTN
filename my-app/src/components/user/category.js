import React, { useState, useEffect } from 'react';
import { Form, Input, Table, Image, Radio, Row, Col, message } from 'antd';
import { Card, Button, } from '@material-tailwind/react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import '../../assets/css/cartform.css';
import HeaderHome from './header';
import axios from 'axios';

const { Column } = Table;

const Cart = () => {
  const [form] = Form.useForm();
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [isPayPalVisible, setIsPayPalVisible] = useState(false);
  const [customer, setCustomer] = useState([])

  useEffect(() => {
    getCustomer();
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    setCartItems(cart || []);
  }, []);

  const getCustomer = async () => {
    try {
      const user = await JSON.parse(window.localStorage.getItem('user'));
      const idkhachhang = await user.idkhachhang;
      const response = await axios.get(`http://localhost:8080/api/account/customer/${idkhachhang}`);
      console.log(response.data)
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  console.log(customer)


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
        // Lấy số lượng còn trong kho từ thuộc tính remain của sản phẩm
        const remainingStock = item.remain;
        if (quantity > remainingStock) {
          message.warning('Số lượng sản phẩm trong giỏ hàng vượt quá số lượng còn trong kho.');
          return item; // Không thay đổi số lượng nếu vượt quá số lượng còn trong kho
        }
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

            // Tính lại totalPrice dựa trên giá trị mới của giỏ hàng
            setTotalPrice(0);

            // Cập nhật lại state và lưu vào localStorage
            window.localStorage.setItem('totalPrice', 0);
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

    if (!nguoiDat || !sodienthoai || !diachi) {
      message.error('Vui lòng điền đầy đủ thông tin trước khi đặt hàng.');
      return; // Ngăn người dùng tiếp tục
    }

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
            // Tính lại totalPrice dựa trên giá trị mới của giỏ hàng
            setTotalPrice(0);

            // Cập nhật lại state và lưu vào localStorage
            window.localStorage.setItem('totalPrice', 0);
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
                render={(productImg) => <Image src={`http://localhost:8080/upload/${productImg}`} width={100} />}
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
            <Form
              form={form}
              layout="vertical"
              initialValues={{ fullName: customer[0]?.khachhangten }}
            >
              <div style={{ marginTop: '20px' }}>
                {paymentMethod === 'COD' && (
                  <>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item label="Name" name="fullName" rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}>
                          <Input style={{ borderRadius: '0' }} placeholder="Nhập họ và tên" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Phone" name="phoneNumber" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                          <Input style={{ borderRadius: '0' }} placeholder="Nhập số điện thoại" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={16}>
                      <Col span={14}>
                        <Form.Item
                          label="Address"
                          name="address"
                          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ nhận hàng' }]}
                        >
                          <Input.TextArea style={{ borderRadius: '0' }} placeholder="Nhập địa chỉ nhận hàng" />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="Note"
                          name="note">
                          <Input.TextArea style={{ borderRadius: '0' }} placeholder="Nhập ghi chú thêm (Nếu có)" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )}
                <div style={{ textAlign: 'right', fontSize: '15px', fontWeight: 'bold' }}>
                  Total: <strong style={{ color: 'red' }}>{totalPrice.toLocaleString()}.00 USD</strong>
                </div>
                <Form.Item
                  label="Payment Method"
                  name="paymentMethod"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán' }]}
                >
                  <Radio.Group value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <Radio value="COD"><div style={{ display: 'flex', alignItems: 'center', fontSize: 'larger' }}><svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m22.031 10.875l-2.136-3.543a1.764 1.764 0 0 0-1.497-.846h-1.677v-.249a2.73 2.73 0 0 0-.804-1.935a2.748 2.748 0 0 0-1.94-.802H3.994a2.732 2.732 0 0 0-2.541 1.687a2.71 2.71 0 0 0-.204 1.05v8.958a1.739 1.739 0 0 0 1.507 1.722c-.005.09-.005.18 0 .269a3.147 3.147 0 0 0 .948 2.279A3.242 3.242 0 0 0 6 20.46a3.279 3.279 0 0 0 2.285-.956a3.26 3.26 0 0 0 .96-2.279a2.074 2.074 0 0 0 0-.248h5.509a2.065 2.065 0 0 0 0 .248a3.146 3.146 0 0 0 .948 2.28A3.241 3.241 0 0 0 18 20.5a3.278 3.278 0 0 0 2.285-.956a3.26 3.26 0 0 0 .959-2.279a2.065 2.065 0 0 0 0-.249H22a.76.76 0 0 0 .749-.746v-2.876c0-.89-.25-1.762-.719-2.519m-14.293 6.31a1.688 1.688 0 0 1-.519 1.225a1.79 1.79 0 0 1-2.466 0a1.732 1.732 0 0 1-.508-1.234a1.608 1.608 0 0 1 .14-.687c.132-.313.359-.577.648-.757a1.74 1.74 0 0 1 .998-.288c.338 0 .668.1.948.288c.287.183.513.446.65.757c.098.215.15.45.149.687zm3.244-4.976h-4.99a1 1 0 0 1-.999-.995a.994.994 0 0 1 .998-.996h4.991a1 1 0 0 1 .998.996a.994.994 0 0 1-.998.995m0-3.424h-4.99a1 1 0 0 1-.999-.995a.994.994 0 0 1 .998-.995h4.991a1 1 0 0 1 .998.995a.994.994 0 0 1-.998.995m8.734 8.4a1.687 1.687 0 0 1-.52 1.225a1.79 1.79 0 0 1-2.465 0a1.732 1.732 0 0 1-.509-1.234a1.64 1.64 0 0 1 .33-1.006c.246-.327.599-.56.998-.657h.25a.32.32 0 0 1 .139 0h.2c.303.035.592.148.838.329c.247.181.44.425.559.707c.099.215.15.45.15.686z" /><path fill="currentColor" d="M17.96 15.434a.318.318 0 0 0-.14 0z" /></svg> Payment on delivery (COD)</div></Radio>
                    <Radio value="PayPal"><div style={{ display: 'flex', alignItems: 'center', fontSize: 'larger' }}><svg style={{ marginRight: '5px' }} xmlns="http://www.w3.org/2000/svg" width="22" height="26" viewBox="0 0 256 302"><path fill="#27346A" d="M217.168 23.507C203.234 7.625 178.046.816 145.823.816h-93.52A13.393 13.393 0 0 0 39.076 12.11L.136 259.077c-.774 4.87 2.997 9.28 7.933 9.28h57.736l14.5-91.971l-.45 2.88c1.033-6.501 6.593-11.296 13.177-11.296h27.436c53.898 0 96.101-21.892 108.429-85.221c.366-1.873.683-3.696.957-5.477c-1.556-.824-1.556-.824 0 0c3.671-23.407-.025-39.34-12.686-53.765" /><path fill="#27346A" d="M102.397 68.84a11.737 11.737 0 0 1 5.053-1.14h73.318c8.682 0 16.78.565 24.18 1.756a101.6 101.6 0 0 1 6.177 1.182a89.928 89.928 0 0 1 8.59 2.347c3.638 1.215 7.026 2.63 10.14 4.287c3.67-23.416-.026-39.34-12.687-53.765C203.226 7.625 178.046.816 145.823.816H52.295C45.71.816 40.108 5.61 39.076 12.11L.136 259.068c-.774 4.878 2.997 9.282 7.925 9.282h57.744L95.888 77.58a11.717 11.717 0 0 1 6.509-8.74" /><path fill="#2790C3" d="M228.897 82.749c-12.328 63.32-54.53 85.221-108.429 85.221H93.024c-6.584 0-12.145 4.795-13.168 11.296L61.817 293.621c-.674 4.262 2.622 8.124 6.934 8.124h48.67a11.71 11.71 0 0 0 11.563-9.88l.474-2.48l9.173-58.136l.591-3.213a11.71 11.71 0 0 1 11.562-9.88h7.284c47.147 0 84.064-19.154 94.852-74.55c4.503-23.15 2.173-42.478-9.739-56.054c-3.613-4.112-8.1-7.508-13.327-10.28c-.283 1.79-.59 3.604-.957 5.477" /><path fill="#1F264F" d="M216.952 72.128a89.928 89.928 0 0 0-5.818-1.49a109.904 109.904 0 0 0-6.177-1.174c-7.408-1.199-15.5-1.765-24.19-1.765h-73.309a11.57 11.57 0 0 0-5.053 1.149a11.683 11.683 0 0 0-6.51 8.74l-15.582 98.798l-.45 2.88c1.025-6.501 6.585-11.296 13.17-11.296h27.444c53.898 0 96.1-21.892 108.428-85.221c.367-1.873.675-3.688.958-5.477c-3.122-1.648-6.501-3.072-10.14-4.279a83.26 83.26 0 0 0-2.77-.865" /></svg> Payment with PayPal</div></Radio>
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
                      Order
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
