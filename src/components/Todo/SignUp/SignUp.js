import React,{useState, useRef} from 'react'
import Button from '../../UI/Button/Button'
import classes from "./SignUp.module.css"
import {Link,useHistory} from "react-router-dom"
import firebase from '../../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { States } from '../../utils/states';


const SignUp = () => {
    const nameInputRef = useRef()
    const emailInputRef = useRef()
    const passwordInputRef = useRef()
    const history = useHistory()
    const {signup} = useAuth();
    const {register, handleSubmit, formState:{errors}} = useForm()
    // const database = firebase.firestore().collection("user")  
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    console.log(States)
    const onSubmitHandler =  async (data) => {
        console.log(data);
     
        try {
            setIsLoading(true)
            setError("")
            signup(data.email, data.password).then((response) =>{
            firebase.firestore().collection("user")
            .doc(response.user.uid)
            .set({
                firstName: data.firstName,
                lastName: data.lastName, 
                email : response.user.email,
                phoneNumber: data.number,
                states: data.state,
                gender:data.gender
            })
             .then(() => {
                history.push("/sign-in")              
             })                
            }).catch(err => {
                setError("Failed to create a account. Please Try Again")
                console.log(err);
            })
        }
        catch{
            setError("Failed to create a account. Please Try Again 2")
        }
        setIsLoading(false)
        }


    return (
        <div>
            <section id="todolist-form">
            <h1 className={classes.header}>Just the Basics</h1>
            {error}
            <form className={classes.formControl} onSubmit={handleSubmit(onSubmitHandler)}>
                <div className={classes.inputBox}>
                    <div className={classes.firstname}>
                    <label htmlFor="text">
                            Firstname
                    </label>
                    <input  { ...register("firstName" , {required: true, maxLength: 20})} type="text" required placeholder="Enter First Name" ref={nameInputRef}/>
                    {errors.firstName && <p>First name is required.</p>}
                    </div>
                    <div className={classes.firstname}>
                    <label htmlFor="text">
                            Lastname
                    </label>
                    <input { ...register("lastName" , {required: true, maxLength: 20})} type="text" required placeholder="Enter Last Name" ref={nameInputRef}/>
                    {errors.lastName && <p>Last name is required.</p>}
                    </div>                 
                    </div>
                <div>
                    <label htmlFor="text">
                            Email
                    </label>
                    <input { ...register("email" , {required: true, maxLength: 40, pattern: /^\S+@\S+$/i}) } type="email" required placeholder="Enter Email" ref={emailInputRef}/>
                    {errors.email && <p>Email is must.</p>}
                </div>
                <div>
                    <label htmlFor="text">
                            Phone No.
                    </label>
                    <input { ...register("number" , {required: true, minLength: 10987563210}) } type="tel" required placeholder="Enter Phone Number" ref={emailInputRef}/>
                    {errors.number && <p>Please enter the phone number.</p>}

                </div>
                <div>
                    <label htmlFor="text">
                            State
                    </label>
                    <select { ...register("state" , {required: true}) }>
                     <option value = ""  >Choose State</option>
                        {States.map((state,index) => (
                            
                            <option key={index} value={state}>{state}</option>
                        ))}
                     </select>   
                </div>
                <div>
                    <label htmlFor="text">
                          Gender
                    </label>
                    <input {...register("gender", { required: true })} type="radio" value="Male" />Male
                    <input {...register("gender", { required: true })} type="radio" value="Female" /> Female
                    {errors.gender && <p>Please select the gender.</p>}
                </div>
                <div>
                    <label htmlFor="email" >
                            Your Password
                    </label>
                    <input {...register("password", { required: true })} type="password" required placeholder="Enter Password"/>
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
