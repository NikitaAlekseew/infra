import { useContext, useEffect, useState } from 'react';
import './login.css'
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';



const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {setAuth, setUser} = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                email: email,
                password: password,
            }, {withCredentials: true});
            if(response.status === 200){
                setEmail('');
                setPassword('');
                setAuth(true);
                setUser(response.data);
                navigate('/');
            }
            else{
                alert('Что-то пошло не так с логированием пользователя на стороне сервера')
            }
        } catch (error) {
            console.error('Error login to server: ', error);
            setEmail('');
            setPassword('');
            alert('Что-то пошло не так с логированием пользователя');
        }
    }
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    // useEffect(() => {
    //     axios.get('http://localhost:4000/login', {withCredentials: true})
    //     .then()
    // })
    return (
        <form className="loginForm"  onSubmit={handleSubmit}>
            <input type="text" name="email" placeholder="Введите email" value={email} onChange={handleEmailChange}/>
            <input type="text" name="password" placeholder="Введите пароль" value={password} onChange={handlePasswordChange}/>
            <input type="submit" value="Войти"/>
        </form>
    );
}
 
export default Login;