import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const Mainpage = () => {
    
    const auth = useContext(AuthContext);

    

    console.log(auth.isAuth)
    console.log(auth.user)

    return (
        <div>
            <h1>Hello, world!</h1>
            {auth.isAuth  ? 
            <h2>{auth.user?.username}</h2> :
            <h2>Пользователь не найден</h2>
            }
        </div>
    );
}
 
export default Mainpage;