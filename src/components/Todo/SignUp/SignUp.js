import React,{useState, useRef} from 'react'
import Button from '../../UI/Button/Button'
import classes from "./SignUp.module.css"
import {Link,useHistory} from "react-router-dom"
import firebase from '../../../firebase';
import { nanoid } from 'nanoid';


const SignUp = () => {
    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const history = useHistory()
    // const database = firebase.firestore().collection("user")  
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const name = nameInputRef.current.value
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

        if (password.length < 8){
            alert("Password Should be greater than 8 character")
        }

        firebase.auth().createUserWithEmailAndPassword(
            email,
            password
        ).then((response)=>{
            return firebase.firestore().collection("user")
            .doc(response.user.uid)
            .set({
                id:response.user.uid,
                name:name,
            })
             .then(() => {
                setMessage(`${name} have been SignUp Successfully`)
                history.push("/sign-in")              
             })
        }).catch((err) => {
        setMessage(err.message)              
        })

        console.log(message);
        }


    return (
        <div>
            <section id="todolist-form">
            <h1 className={classes.header}>Just the Basics</h1>
            {message}
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
                    <Button>Sign Up</Button>               
                </div>
                <div className={classes.footer}>
                    <Link to="/sign-in">
                        <a>Already have a account? Login</a>
                    </Link>
                </div>
              </form>
            </section>
        </div>
    )
}

export default SignUp
