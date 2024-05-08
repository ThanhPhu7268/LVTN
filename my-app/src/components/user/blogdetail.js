import React from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

const BlogDetail = () => {
    const { id } = useParams();
    const blogPosts = [
        {
            id: 1,
            title: "The story of 4 Casio brothers establishing a cheap and durable watch brand",
            image: "https://donghosocxam.com/wp-content/uploads/2021/03/4-anh-em-thanh-lap-Casio-1.jpg",
            noidung: "The story of the 4 Casio brothers who founded the cheap and durable watch brand is an interesting story about the beginnings of one of the oldest and most famous watch brands in the world. In 1946, the 4 brothers Kashio - Toshio, Kazuo, Tadao and Yukio - founded Kashio Seisakujo Company in Tokyo, Japan. They initially started out manufacturing computer parts and other devices such as lenses and flashlights. However, in the 1950s, they gradually branched out into watch manufacturing. Their goal is to create high-quality, accurate watches while remaining affordable and accessible to everyone. Thanks to the creativity and dynamism of the four brothers, Casio has quickly become one of the leading watch brands in the world. Casio is famous for its innovation in electronic watch technology, from producing the world's first electronic wristwatch in 1974 to developing modern smartwatches. What distinguishes Casio is its commitment to providing quality products at affordable prices, while continuously advancing in the field of watch technology. This has helped Casio become one of the most popular and popular watch brands worldwide.",
            content: "Like so many organizations these days, Autodesk is a company in transition. It was until recently a traditional boxed software company selling licenses.",
            link: "http://localhost:3000/blog"
        },
        {
            id: 2,
            title: "Details of Casio Lineage Solar Watch Model",
            image: "https://www.watchstore.vn/upload_images/images/2024/05/08/casio-lineage-nang-luong-mat-troi-2.jpg",
            noidung: "The Casio Lineage Solar Watch Model combines timeless elegance with cutting-edge technology to deliver a timepiece that is both stylish and functional. Whether you're looking for a reliable everyday watch or a sophisticated accessory for special occasions, the Lineage Solar Watch Model offers the perfect blend of form and function.",
            content: "The Casio Lineage Solar Watch Model combines timeless elegance with cutting-edge technology to deliver...",
            link: "http://localhost:3000/blog"
        },
        {
            id: 3,
            title: "Top 10 chiếc đồng hồ đeo tay đắt nhất thế giới cập nhật 2024",
            image: "https://www.watchstore.vn/upload_images/images/baolinh/dong-ho-dat-nhat-the-gioi.jpg",
            noidung: "Top 10 chiếc đồng hồ đắt nhất thế giới luôn là điều thu hút sự quan tâm của giới thượng lưu và các nhà sưu tập đồng hồ...",
            content: "In 2024, Bulgari is expanding its Aluminium collection with three new models: a GMT, dressed in black and white",
            link: "http://localhost:3000/blog"
        },
        {
            id: 4,
            title: "Nên mua đồng hồ Casio hay Citizen? So sánh giá bán, giá thanh lý",
            image: "https://www.h2hubwatches.com/cdn/shop/articles/1_-_2023-10-17T181336.799.jpg?v=1697548271",
            noidung: "Trong quá trình mua đồng hồ, việc lựa chọn giữa Casio và Citizen luôn là một câu hỏi khó khăn...",
            content: "Like so many organizations these days, Autodesk is a company in transition. ",
            link: "http://localhost:3000/blog"
        },
        // Các bài đăng khác...
    ];
    const post = blogPosts.find(post => post.id === parseInt(id));

    if (!post) return <div>Bài đăng không tồn tại</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="w-full max-w-[48rem] flex-row" style={{ border: '1px solid #747474', borderRadius: '12px', padding: '20px' }}>
                <img
                    src={post.image}
                    alt="post-image"
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
                <h2 style={{ marginTop: '20px' }}>{post.title}</h2>
                <p style={{ marginBottom: '10px', color: '#333', textAlign: 'justify' }}>{post.noidung}</p>
                {/* <p style={{ marginBottom: '20px', color: '#333' }}>{post.content}</p> */}
                <a href={post.link} style={{ textDecoration: 'none', color: 'blue' }}>Back to Blog</a>
            </div>
        </div>
    );
};

export default BlogDetail;
