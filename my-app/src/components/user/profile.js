import React from 'react';
import { Card, CardBody, Typography, Avatar } from '@material-tailwind/react';

const UserProfile = () => {
    const users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            avatar: 'https://i.pinimg.com/564x/1d/f1/43/1df143603c7a9f51f3e8348f0ede6277.jpg',
            about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus magna id accumsan sodales.',
            phone: '123-456-7890',
            address: '123 Main St, Anytown, USA',
        }
    ];

    const user = users[0];

    return (
        <div className="max-w-md mx-auto mt-10" style={{ boxShadow: '0 3px 10px rgba(0, 0, 0, 0.404)', borderRadius: '20px' }}>
            <Card>
                <CardBody>
                    <div className="text-center" style={{ backgroundColor: 'white' }}>
                        <Avatar
                            src={user.avatar}
                            alt="avatar"
                            size="xxl"
                            className="mx-auto mb-4 border-4 border-blue-gray-200 rounded-full" // Thêm lớp CSS để tạo viền xung quanh avatar
                        />
                        <Typography variant="h4" color="blue-gray" className="font-semibold mb-2">
                            {user.name}
                        </Typography>
                        <Typography variant="subtitle" color="blue-gray" className="mb-4">
                            {user.email}
                        </Typography>
                    </div>
                    <div className="border-t border-blue-gray-200 mt-6 pt-4">
                        <Typography variant="subtitle" color="blue-gray" className="font-semibold mb-2">
                            About Me
                        </Typography>
                        <Typography variant="body" color="blue-gray" className="mb-4">
                            {user.about}
                        </Typography>
                    </div>
                    <div className="border-t border-blue-gray-200 mt-6 pt-4">
                        <Typography variant="subtitle" color="blue-gray" className="font-semibold mb-2">
                            Contact Information
                        </Typography>
                        <Typography variant="body" color="blue-gray" className="mb-2">
                            <span className="font-semibold">Phone:</span> {user.phone}
                        </Typography>
                        <Typography variant="body" color="blue-gray" className="mb-2">
                            <span className="font-semibold">Address:</span> {user.address}
                        </Typography>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default UserProfile;
