import React,{useState,useEffect} from "react";
import {useHistory} from "react-router-dom"
import firebase from "../../firebase";

const AuthContext = React.createContext({
    email:"",
    name:"",
    isLoggedIn: false,
    login: async (data) => {},
    logout: () => {},
})

export const AuthContextProvider = (props) => {
    const history = useHistory();
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    
    useEffect(() => {
        
    }, [])
    
    const logoutHandler = () => {
        setIsLoggedIn(false)
        localStorage.removeItem("accessToken");
        history.push("/sign-in")
    }

    const loginHandler = async (data) =>{
        firebase.auth().signInWithEmailAndPassword(data.email, data.password).then(() =>{
            setIsLoggedIn(true)
            return "true"
        })
      }
    

    const contextValue = {
        isLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        email: email,
        name: name,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}


export default AuthContext;