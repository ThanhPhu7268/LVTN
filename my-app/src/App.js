import HomePage from './components/user/home';
import AdminPage from './components/admin/adminPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/user/category';
import LoginForm from './components/user/loginform';
import RegistrationForm from './components/user/register';
import ProductPage from './components/user/product';
import ProductDetailPage from './components/user/prductdetail';
import PersonalInfo from './components/user/profile';

function App() {

    return (
        <Router>
            <Routes>
                <Route path='/*' element={<HomePage />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/login' element={<LoginForm />} />
                {/* <Route path='/user' element={<PersonalInfo />} /> */}
                <Route path='/product' element={<ProductPage />} />
                <Route path='/product/:id' element={<ProductDetailPage />} />
                <Route path='/register' element={<RegistrationForm />} />
                <Route path='/admin/*' element={<AdminPage />} />
            </Routes>
        </Router>);
}

export default App;