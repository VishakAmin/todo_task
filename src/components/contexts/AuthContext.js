import React,{useState,useEffect, useContext} from "react";
import firebase from "../../firebase";



const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    

    // const [todoList, setTodoList] = useState([])
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)


  
    useEffect(() => {
       const unsubcribe =  firebase.auth().onAuthStateChanged(user => {
           setCurrentUser(user)
            setLoading(false)           
        })

        return unsubcribe
    }, [])



    function signup(email, password){
        return firebase.auth().createUserWithEmailAndPassword(email,password)
    }

    function login(email, password ){
       return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return firebase.auth().signOut()
    }

    const contextValue = {

        currentUser,
        signup,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={contextValue}>
           {!loading && children}
        </AuthContext.Provider>
    )
}


export default AuthContext;
