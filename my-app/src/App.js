import HomePage from './components/user/home';
import AdminPage from './components/admin/adminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/user/category';
import LoginForm from './components/user/loginform';
import RegistrationForm from './components/user/register';
import ProductPage from './components/user/product';
import ProductDetailPage from './components/user/prductdetail';
import Protectedadmin from './components/user/useAuth';
import ProductWmPage from './components/user/productwm';
import ProductCouplePage from './components/user/productcp';
import Invoice from './components/user/invoice';

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/*' element={<HomePage />} />
                <Route element={<Protectedadmin />}>
                    <Route path='/admin/*' element={<AdminPage />} />
                </Route>
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/product' element={<ProductPage />} />
                <Route path='/productwm' element={<ProductWmPage />} />
                <Route path='/productcp' element={<ProductCouplePage />} />
                <Route path='/product/:id' element={<ProductDetailPage />} />
                <Route path='/register' element={<RegistrationForm />} />
                <Route path='/bill' element={<Invoice />} />
            </Routes>
        </Router>);
}

export default App;