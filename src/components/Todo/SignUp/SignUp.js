import React,{useState, useRef} from 'react'
import Button from '../../UI/Button/Button'
import classes from "./SignUp.module.css"
import {Link,useHistory} from "react-router-dom"
import firebase from '../../../firebase';
import { useAuth } from '../../contexts/AuthContext';


const SignUp = () => {
    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const history = useHistory()
    const {signup} = useAuth();

    // const database = firebase.firestore().collection("user")  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const onSubmitHandler =  async (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

        if (password.length < 8){
            alert("Password Should be greater than 8 character")
            setError("Password Should be greater than 8 character")
        }
     
        try {
            setIsLoading(true)
            setError("")
            signup(email, password).then((response) =>{
            firebase.firestore().collection("user")
            .doc(response.user.uid)
            .set({
                
            })
             .then(() => {
                history.push("/sign-in")              
             })                
            }).catch(err => {
                setError("Failed to create a account. Please Try Again")
            })
        }
        catch{
            setError("Failed to create a account. Please Try Again")
        }
        setIsLoading(false)
    //    console.log(message);
        }


    return (
        <div>
            <section id="todolist-form">
            <h1 className={classes.header}>Just the Basics</h1>
            {error}
            <form className={classes.formControl} onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="text">
                            Name
                    </label>
                    <input type="text" required placeholder="Enter Name" ref={nameInputRef}/>
                </div>
                <div>
                    <label htmlFor="email">
                            Email
                    </label>
                    <input type="email" required placeholder="Enter Email" ref={emailInputRef}/>
                </div>
                <div>
                    <label htmlFor="email" >
                            Your Password
                    </label>
                    <input type="password" required placeholder="Enter Password" ref={passwordInputRef}/>
                </div> 
                <div>
                    <Button disabled={isLoading}>Sign Up</Button>               
                </div>
                <div className={classes.footer}>
                    <Link to="/sign-in">
                        Already have a account? Login
                    </Link>
                </div>
              </form>
            </section>
        </div>
    )
}

export default SignUp
