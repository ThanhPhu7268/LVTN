import React from "react";
import '../../assets/css/footer.css'

export default function FooterHome() {
    return (
        <footer>
            <div className="footer_good">
                <div className="footer_grid">
                    <div class="footer_title">Otis Watch</div>
                    <div class="footer_content">
                        <p>Với thông điệp "Refined Life", Otis mong muốn đem đến cho khách hàng một lối sống tinh gọn bằng các sản phẩm thời trang tinh tế.</p>
                        <img src="https://nichegamer.com/wp-content/uploads/2022/03/visa-mastercard-paypal-block-russia-03-06-22-1.jpg" style={{ width: "150px", height: "auto" }} />
                    </div>
                </div>
                <div className="footer_grid">
                    <div class="footer_title">Về chúng tôi</div>
                    <div class="footer_content">
                        <p><a href="/about">Giới thiệu</a></p>
                        <p><a href="/about">Liên hệ</a></p>
                        <p><a href="/about">Tuyển dụng</a></p>
                        <p><a href="/about">Tin tức</a></p>
                        <p><a href="/about">Hệ thống cửa hàng</a></p>
                    </div>
                </div>
                <div className="footer_grid">
                    <div class="footer_title">Chăm sóc khách hàng</div>
                    <div class="footer_content">
                        <p><a href="/about">Chính sách đổi trả</a></p>
                        <p><a href="/about">Chính sách bảo hành</a></p>
                        <p><a href="/about">Chính sách hoàn tiền</a></p>
                    </div>
                </div>
                <div className="footer_grid">
                    <div class="footer_title">Tổng đài hỗ trợ</div>
                    <div class="footer_content">
                        <p>Liên hệ đặt hàng <strong>0123456789</strong></p>
                        <p>Thắc mắc đơn hàng <strong>0123456789</strong></p>
                        <p>Góp ý, khiếu nại <strong>0123456789</strong></p></div>
                </div>
            </div>
        </footer >
    )
}