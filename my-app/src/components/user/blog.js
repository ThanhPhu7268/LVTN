import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";

const blogPosts = [
    {
        id: 1,
        title: "The story of 4 Casio brothers establishing a cheap and durable watch brand",
        image: "https://donghosocxam.com/wp-content/uploads/2021/03/4-anh-em-thanh-lap-Casio-1.jpg",
        noidung: "The story of the 4 Casio brothers who founded the cheap and durable watch brand is an interesting story about the beginnings of one of the oldest and most famous watch brands in the world. In 1946, the 4 brothers Kashio - Toshio, Kazuo, Tadao and Yukio - founded Kashio Seisakujo Company in Tokyo, Japan. They initially started out manufacturing computer parts and other devices such as lenses and flashlights. However, in the 1950s, they gradually branched out into watch manufacturing. Their goal is to create high-quality, accurate watches while remaining affordable and accessible to everyone. Thanks to the creativity and dynamism of the four brothers, Casio has quickly become one of the leading watch brands in the world. Casio is famous for its innovation in electronic watch technology, from producing the world's first electronic wristwatch in 1974 to developing modern smartwatches. What distinguishes Casio is its commitment to providing quality products at affordable prices, while continuously advancing in the field of watch technology. This has helped Casio become one of the most popular and popular watch brands worldwide.",
        content: "Like so many organizations these days, Autodesk is a company in transition. It was until recently a traditional boxed software company selling licenses.",
        link: "http://localhost:3000/blog/1"
    },
    {
        id: 2,
        title: "Details of Casio Lineage Solar Watch Model",
        image: "https://www.watchstore.vn/upload_images/images/2024/05/08/casio-lineage-nang-luong-mat-troi-2.jpg",
        noidung: "The Casio Lineage Solar Watch Model combines timeless elegance with cutting-edge technology to deliver a timepiece that is both stylish and functional. Whether you're looking for a reliable everyday watch or a sophisticated accessory for special occasions, the Lineage Solar Watch Model offers the perfect blend of form and function.",
        content: "The Casio Lineage Solar Watch Model combines timeless elegance with cutting-edge technology to deliver...",
        link: "http://localhost:3000/blog/2"
    },
    {
        id: 3,
        title: "Bulgari Aluminium, new 2024 models",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi9HJKdAenazGlfD955XDilurgX7NMcxdp0qU87hbWXrcfEIZfPNPmQjWmcHSdJtS09LHrB1KwbM_BfqY8-knh76yx8pmrXgl90wBkwZyPxo6Bo2B38yRXQL0ztk-_qImzGwCF23BA011Ffuxi2rZV8wBoXuxgRQY-K7K5KxlrtFxgXpWjx1p2rTWue7rQ/s700/Bvlgari%20Aluminium%202024.jpg",
        content: "In 2024, Bulgari is expanding its Aluminium collection with three new models: a GMT, dressed in black and white",
        link: "http://localhost:3000/blog/3"
    },
    {
        id: 4,
        title: "10 Best Practices for Writing Clean Code",
        image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgW6zmny6PKDGiJFoIzgwn_7iMdfIIomoyDu7hxtDU1Vedzr4YHzLBsqLvrSuwiuMKlnVFmJHYeReHAkqttQJUXDN62TQ7LlHw8Oyxo9O67Q_fNAnAVMujf7ippEFJ7BsU1KJ2UdSv-H5va9g1e00lqg_dU-zaSFTnnnAjge1EijGf1HlaTz0PQYzz92JM/s700/Mido%20OceanStar%20200C%20Carbon%20M042.431.77.081.00_003.jpg",
        content: "Like so many organizations these days, Autodesk is a company in transition. ",
        link: "http://localhost:3000/blog/4"
    },
    // Các bài đăng khác...
];

export default function Blog() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" style={{ padding: '30px', marginBottom: '50px', marginTop: '50px' }}>
            {blogPosts.map(post => (
                <Card key={post.id} className="w-full max-w-[48rem] flex-row" style={{ minHeight: '200px', border: '1px solid #747474', borderRadius: '12px' }}>
                    <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-2/5 shrink-0 rounded-r-none"
                    >
                        <img
                            src={post.image}
                            alt="card-image"
                            className="h-full w-full object-cover"
                        />
                    </CardHeader>
                    <CardBody>
                        <Typography variant="h4" color="blue-gray" className="mb-2">
                            {post.title}
                        </Typography>
                        <Typography color="gray" className="mb-8 font-normal" style={{ height: '104px' }}>
                            {post.content}
                        </Typography>
                        <a href={post.link} className="inline-block" style={{ textDecoration: 'none' }}>
                            <Button variant="text" className="flex items-center gap-2">
                                Learn More
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                            </Button>
                        </a>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}
