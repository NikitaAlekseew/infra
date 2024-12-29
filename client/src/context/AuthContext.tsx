import axios from "axios";
import { createContext, ReactNode, useEffect, useState} from "react";


type AuthContextType = {
    isAuth: boolean;
    setAuth: (auth: boolean) => void;
    setUser:  (value: React.SetStateAction<User | null>) => void;
    user: User | null

}

// type User =({
//     username?: string,
//     id?: number
// }) | string

type User = ({
    username:string,
    id: number
}) | null

const AuthContext = createContext<AuthContextType>({
    isAuth: false,
    setAuth: () => {},
    user: null,
    setUser: () => { }, 
})

 
export const AuthProvider = ({ children } : { children: ReactNode}) => {
    const [isAuth, setAuth] = useState<boolean>(false);
    const [user, setUser] = useState<User>(null);

    useEffect(() => {
        axios.get('/api/user', {withCredentials: true})
        .then((response) =>{
            const userData = response.data
            if(userData === null){
                setAuth(false);
                setUser(null)

            }
            else{
                setAuth(true);
                setUser(userData)
            }
        })
    }, []);

    return(
        <AuthContext.Provider value={{ isAuth, user: user ? user : null, setAuth, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext