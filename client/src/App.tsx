import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Mainpage from './MainPage/MainPage';
import Register from './Auth/Register/Register';
import Login from './Auth/Login/Login';
import NavBar from './NavBar/NavBar';
import { AuthProvider } from './context/AuthContext';


function App() {


  return (
    <>
    <AuthProvider>

    <BrowserRouter>
    <NavBar></NavBar>
      <div className='main'>
      <Routes>
        <Route path='/' element={<Mainpage />}/>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
      </div>
    </BrowserRouter>
    
    </AuthProvider>

    </>
  )
}

export default App
