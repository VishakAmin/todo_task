import React,{useRef, useState} from 'react'
import Button from '../../UI/Button/Button'
import classes from './SignIn.module.css'
import {Link,useHistory} from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';


const SignIn = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const history = useHistory()
    const {login} = useAuth()


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

        try{
             setIsLoading(true)
             await login(email, password)
             history.push("/")
            
        }
        catch(err) {
            setError("Failed to Login. Password or Email is Invalid") 
        }
        setIsLoading(false)
    }
  

    return (
        <div>
            <section id="todolist-form">

            <h1 className={classes.header}>Login In</h1>
                {error}
            <form className={classes.formControl} onSubmit={onSubmitHandler}>
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
                    <Button disabled={isLoading}>Sign In</Button>               
                </div>
                <div className={classes.footer}>
                    <Link to="/sign-up">
                        Dont' have a account? SignUp
                    </Link>
                </div>
              </form>
            </section>
        </div>
    )
}

export default SignIn
