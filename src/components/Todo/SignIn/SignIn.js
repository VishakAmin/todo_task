import React,{useRef,useContext} from 'react'
import Button from '../../UI/Button/Button'
import classes from './SignIn.module.css'
import {Link,useHistory} from "react-router-dom"
import AuthContext from '../../store/auth-context'
import firebase from '../../../firebase';


const SignIn = () => {

    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const history = useHistory()
    const authctx = useContext(AuthContext)


    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const email = emailInputRef.current.value
        const password = passwordInputRef.current.value

        const data ={ 
            email: email,
            password:password
        }

        firebase.auth().signInWithEmailAndPassword(data.email, data.password).then((res) =>{
            console.log("True",res);

        })
    }
    console.log(authctx.isLoggedIn);

    return (
        <div>
            <section id="todolist-form">
            <h1 className={classes.header}>Login In</h1>
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
                    <Button>Sign In</Button>               
                </div>
                <div className={classes.footer}>
                    <Link to="/sign-up">
                        <a>Dont' have a account? SignUp</a>
                    </Link>
                </div>
              </form>
            </section>
        </div>
    )
}

export default SignIn
