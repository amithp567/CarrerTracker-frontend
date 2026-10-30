import { Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import GuestGuard from './guards/GuestGuard';
import AuthGuard from './guards/AuthGurard';
import MainLayout from './components/MainLayout';
import Comapany from './pages/Comapany';


const App = () => {
  return (
    <>
      <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="light"
            closeOnClick
            pauseOnHover
            draggable
          />
        <Routes>
          <Route element= {<GuestGuard/>}>
            <Route path='/' element={<Landing/>}/>
            <Route  path = '/login' element = {<Login/>}/>
            <Route path = '/register' element = {<Register/>}/>
            <Route path='/password/change' element = {<ForgotPassword/>}/>
          </Route>
          <Route element = {<AuthGuard/>}>
            <Route element={<MainLayout/>}>
              <Route path= '/home' element = {<Home/>}/>
              <Route path='/companies' element={<Comapany/>}/>
            </Route>
          </Route>
        </Routes>
    </>
  )
}

export default App