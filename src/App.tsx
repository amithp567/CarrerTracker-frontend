import {BrowserRouter, Routes, Route} from 'react-router';
import { ToastContainer } from 'react-toastify';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="light"
            closeOnClick
            pauseOnHover
            draggable
          />
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path= '/home' element = {<Home/>}/>
          <Route  path = '/login' element = {<Login/>}/>
          <Route path = '/register' element = {<Register/>}/>
          <Route path='/password/change' element = {<ForgotPassword/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App