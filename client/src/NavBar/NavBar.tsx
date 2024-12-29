import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './NavBar.css'
import axios from 'axios';
import AuthContext from '../context/AuthContext';


const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const {setAuth, setUser, isAuth} = useContext(AuthContext);
    const handleLogOut = async () => {
        const response = await axios.get('/api/logout', {withCredentials: true});
        if(response.data === 'OK'){
            setAuth(false);
            setUser(null);
            navigate('/');
        }
    

    }

    
    return (
        
        <div className='NavBar'>
            <Link to='/'>Главная </Link>
            {isAuth ? 
                <button onClick={handleLogOut} className='logOutButton'>Выйти</button>
                :
                <>
                    <Link to='/register'>Регистрация </Link>
                    <Link to='/login'>Аутентификация </Link>
                </>
            }
            
        </div>
    );
}
 
export default NavBar;