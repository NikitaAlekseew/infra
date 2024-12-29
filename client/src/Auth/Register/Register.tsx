import { useContext, useState } from 'react';
import './register.css'
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const {setAuth, setUser} = useContext(AuthContext)

    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) =>{
        event.preventDefault();
        try {
            const response = await axios.post('/api/register', {
                email,
                password,
                username,
            }, {withCredentials: true});
            if(response.status === 200){
                setEmail('');
                setPassword('');
                setUsername('');
                setAuth(true);
                setUser(response.data);
                navigate('/');

            }
        } catch (error) {
            console.error('Error register', error);
            alert('Регистрация пользователя не прошла')
        }
    }
    
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }

    return (
        <form className='registerForm' onSubmit={handleSubmit}>
            <input type="text" name="username" id="" placeholder="Введите cвое имя" value={username} onChange={handleUsernameChange}/>
            <input type="text" name="email" id="" placeholder="Введите свою почту" value={email} onChange={handleEmailChange}/>
            <input type="text" name="password" id="" placeholder="Введите пароль"value={password} onChange={handlePasswordChange}/>
            <input type="submit" value="Зарегистрироваться " />
        </form>
    );
}
 
export default Register;