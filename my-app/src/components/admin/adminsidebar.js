import React from "react";
import { useNavigate, Link } from "react-router-dom";
import 'tailwindcss/tailwind.css';
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

export function AdminSidebar() {
    const [open, setOpen] = React.useState(0);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token và chuyển hướng về trang đăng nhập
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    return (
        <Card className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-500/10 fixed" style={{ height: '94vh', marginLeft: '10px', boxShadow: '0 3px 10px rgba(0, 0, 0, 0.55)' }}>
            <div className="mb-2 p-4">
                <Typography variant="h2" color="blue-gray">
                    Admin
                </Typography>
            </div>
            <List>
                <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal" style={{ marginBottom: '0' }}>
                                Dashboard
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link
                                to='/admin/'
                                style={{ textDecoration: 'none', color: 'black', paddingLeft: '10px' }}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M.5 13.5h13m-9 0V.5h-4v13m8 0v-7h-4v7m8 0v-10h-4v10" /></svg>
                                    </ListItemPrefix>
                                    Analytics
                                </ListItem>
                            </Link>
                            <Link
                                to='/admin/taikhoan'
                                style={{ textDecoration: 'none', color: 'black', paddingLeft: '10px' }}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M2 16v-2.8q0-.85.438-1.562T3.6 10.55q1.55-.775 3.15-1.162T10 9q1.125 0 2.225.175t2.2.55q-.425.35-.775.763t-.625.887q-.75-.2-1.5-.288T10 11q-1.4 0-2.775.338T4.5 12.35q-.225.125-.363.35T4 13.2v.8h8.075q-.05.5-.05 1t.05 1zm8-8Q8.35 8 7.175 6.825T6 4t1.175-2.825T10 0t2.825 1.175T14 4t-1.175 2.825T10 8m0-2q.825 0 1.413-.587T12 4t-.587-1.412T10 2t-1.412.588T8 4t.588 1.413T10 6m10-2q0 1.65-1.175 2.825T16 8q-.275 0-.7-.062t-.7-.138q.675-.8 1.038-1.775T16 4t-.363-2.025T14.6.2q.35-.125.7-.163T16 0q1.65 0 2.825 1.175T20 4m-1 16q-2.075 0-3.537-1.463T14 15q0-2.1 1.463-3.55T19 10q2.1 0 3.55 1.45T24 15q0 2.075-1.45 3.538T19 20m-.7-2.75l3.525-3.55l-.7-.7l-2.825 2.825l-1.425-1.425l-.7.725z" /></svg>
                                    </ListItemPrefix>
                                    Customers
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <Accordion
                    open={open === 2}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
                        />
                    }
                >
                    <ListItem className="p-0" selected={open === 2}>
                        <AccordionHeader onClick={() => handleOpen(2)} className="border-b-0 p-3">
                            <ListItemPrefix>
                                <ShoppingBagIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            <Typography color="blue-gray" className="mr-auto font-normal" style={{ marginBottom: '0' }}>
                                E-Commerce
                            </Typography>
                        </AccordionHeader>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <Link
                                to='/admin/order'
                                style={{ textDecoration: 'none', color: 'black', paddingLeft: '10px' }}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m17.371 19.827l2.84-2.796l-.626-.627l-2.214 2.183l-.956-.975l-.627.632zM6.77 8.73h10.462v-1H6.769zM18 22.115q-1.671 0-2.836-1.164T14 18.115t1.164-2.835T18 14.115t2.836 1.165T22 18.115t-1.164 2.836T18 22.115M4 20.77V5.615q0-.67.472-1.143Q4.944 4 5.615 4h12.77q.67 0 1.143.472q.472.472.472 1.143v5.945q-.244-.09-.485-.154q-.24-.064-.515-.1v-5.69q0-.231-.192-.424T18.385 5H5.615q-.23 0-.423.192T5 5.615V19.05h6.344q.068.41.176.802t.303.748l-.035.035l-1.134-.827l-1.346.961l-1.346-.961l-1.347.961l-1.346-.961zm2.77-4.5h4.709q.056-.275.138-.515t.193-.485H6.77zm0-3.769h7.31q.49-.387 1.05-.645q.56-.259 1.197-.355H6.769zM5 19.05V5z" /></svg>
                                    </ListItemPrefix>
                                    Orders
                                </ListItem>
                            </Link>
                            <Link
                                to='/admin/product'
                                style={{ textDecoration: 'none', color: 'black', paddingLeft: '10px' }}
                            >
                                <ListItem>
                                    <ListItemPrefix>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M44 14L24 4L4 14v20l20 10l20-10z" /><path stroke-linecap="round" d="m4 14l20 10m0 20V24m20-10L24 24M34 9L14 19" /></g></svg>
                                    </ListItemPrefix>
                                    Products
                                </ListItem>
                            </Link>
                        </List>
                    </AccordionBody>
                </Accordion>
                <hr className="my-2 border-blue-gray-50" />
                <Link
                    to='/admin/brand'
                    style={{ textDecoration: 'none', color: 'black' }}
                >
                    <ListItem>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>

                        Brands


                        {/* <ListItemSuffix>
                        <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                    </ListItemSuffix> */}
                    </ListItem>
                </Link>
                <Link to='/admin/warehouse'
                    style={{ textDecoration: 'none', color: 'black' }}>
                    <ListItem>
                        <ListItemPrefix>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 11 11"><path d="M3 11H0V8h3v3zm4-3H4v3h3V8zm4 0H8v3h3V8zM5 4H2v3h3V4zm4 0H6v3h3V4zm1.44-.76a.5.5 0 0 0-.19-.68L5.75.06a.5.5 0 0 0-.49 0l-4.5 2.5a.5.5 0 0 0 .49.87L5.5 1.07l4.26 2.37a.5.5 0 0 0 .679-.198l.001-.002z" fill="currentColor" /></svg>
                        </ListItemPrefix>
                        WareHouse
                    </ListItem>
                </Link>
                <ListItem onClick={handleLogout}>
                    <ListItemPrefix>
                        <PowerIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Log Out
                </ListItem>
            </List>
        </Card>
    );
}