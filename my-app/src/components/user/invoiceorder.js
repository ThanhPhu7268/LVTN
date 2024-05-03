import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import QRCode from "react-qr-code";

const InvoiceOrder = ({ orderItem, dataItem }) => {
    const componentRef = useRef(null);
    const downloadInvoice = () => {
        // Tạo một instance mới của jsPDF với kích thước là A5
        const pdf = new jsPDF({
            format: 'a5' // Thiết lập kích thước là A5
        });

        // Lấy phần tử cần in làm hoá đơn
        const element = document.getElementById('invoice');

        // Sử dụng html2canvas để chuyển đổi phần tử thành hình ảnh và thêm vào tài liệu PDF
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10); // Đặt vị trí xuất phát cho hình ảnh trong tài liệu PDF

            // Tải xuống tài liệu PDF
            pdf.save('invoice.pdf');
        });
    };

    const handleformatDate = (order) => {
        const orderDate = new Date(order);
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return orderDate.toLocaleDateString('en-GB', options);
    }

    return (
        <div ref={componentRef}>
            {/* Button để tải về hoá đơn dưới dạng PDF */}
            <button onClick={downloadInvoice}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" /></svg>
            </button>

            {/* Phần tử hiển thị hoá đơn */}
            <div id="invoice" style={{ fontFamily: 'Arial, sans-serif' }}>
                <div style={{ width: '100%', height: '10px', background: 'black' }}></div>
                <h1 style={{ fontSize: '60px', fontFamily: 'fantasy', textAlign: 'center' }}>Invoice</h1>
                <p style={{ fontFamily: 'monospace', marginBottom: '0' }}><strong style={{ fontFamily: 'monospace' }}>Order Date:</strong> {handleformatDate(orderItem.donhangngaylap)}</p>
                <p style={{ fontFamily: 'monospace' }}><strong style={{ fontFamily: 'monospace' }}>Order ID:</strong> {orderItem.maDH}</p>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr style={{ background: 'black', color: 'white', border: '1px solid black' }}>
                            <th style={{ borderBottom: '1px solid black', borderRight: '1px solid white', padding: '8px', textAlign: 'center' }}>Item</th>
                            <th style={{ borderBottom: '1px solid black', borderRight: '1px solid white', padding: '8px', textAlign: 'left' }}>Description</th>
                            <th style={{ borderBottom: '1px solid black', borderRight: '1px solid white', padding: '8px', textAlign: 'left' }}>Price</th>
                            <th style={{ borderBottom: '1px solid black', borderRight: '1px solid white', padding: '8px', textAlign: 'left' }}>Quantity</th>
                            <th style={{ borderBottom: '1px solid black', padding: '8px', textAlign: 'left' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Duyệt qua các sản phẩm trong orderItem và hiển thị */}
                        {dataItem.map((item, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', padding: '4px', textAlign: 'center', fontFamily: 'monospace' }}>{index + 1}</td>
                                <td style={{ border: '1px solid black', padding: '8px', width: '240px', fontFamily: 'monospace' }}>{item.sanphamten}</td>
                                <td style={{ border: '1px solid black', padding: '8px', fontFamily: 'monospace' }}>${item.sanphamgia}.00</td>
                                <td style={{ border: '1px solid black', padding: '8px', fontFamily: 'monospace', textAlign: 'center' }}>{item.chitietdonhangsoluong}</td>
                                <td style={{ border: '1px solid black', padding: '8px', fontFamily: 'monospace' }}>${item.sanphamgia * item.chitietdonhangsoluong}.00</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div>
                        <p style={{ marginTop: '20px', marginBottom: '0', fontSize: '20px', color: 'black', fontFamily: 'fantasy' }}>Payment Method</p>
                        <p>Orderer: {orderItem.tennguoidat}<br />{orderItem.phuongthucthanhtoanten}</p>
                    </div>
                    <p style={{ marginTop: '20px', textAlign: 'end', fontFamily: 'monospace', fontSize: '20px' }}>Total: ${orderItem.donhangtonggia}.00</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: "auto", margin: "0 auto", width: "100%" }}>
                    <QRCode
                        size={256}
                        style={{ height: "auto", width: "150px" }}
                        value={orderItem.maDH}
                        viewBox={`0 0 256 256`}
                    />
                    <p style={{ marginTop: '6px', fontSize: '16px', fontWeight: 'bold', fontFamily: 'monospace' }}>Otis is happy to serve you !!!</p>
                </div>
                <p style={{ marginTop: '99px', textAlign: 'center', fontFamily: 'fantasy', fontSize: '20px' }}>Thank you for purchase!</p>
                <div style={{ width: '100%', height: '10px', background: 'black' }}></div>
            </div>
        </div >
    );
};

export default InvoiceOrder;
