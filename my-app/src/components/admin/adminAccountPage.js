import { Card, Typography } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from 'axios';
const TABLE_HEAD = ["Name", "Phone", "Email", "Account", ""];



export default function AccountManagementPage() {
    const [account, setAccount] = useState([])
    useEffect(() => {
        getAccount()
    }, []);

    const getAccount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/account/`);
            setAccount(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <Card className=" w-72" style={{ margin: '20px', width: '72%', marginLeft: 'auto', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)' }}>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {account.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'even:bg-blue-gray-50/50' : ''}>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {item.khachhangten}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {item.khachhangsdt}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {item.khachhangemail}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal">
                                    {item.taikhoanten}
                                </Typography>
                            </td>
                            <td className="p-4">
                                <Typography as="a" href="#" variant="small" color="gray" className="font-medium">
                                    Edit
                                </Typography>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}

