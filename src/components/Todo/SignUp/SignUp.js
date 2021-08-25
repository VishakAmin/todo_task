import React,{useState} from 'react'
import Button from '../../UI/Button/Button'
import classes from "./SignUp.module.css"
import {Link,useHistory} from "react-router-dom"
import firebase from '../../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { useForm,Controller } from 'react-hook-form';
import { States } from '../../utils/states';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    number: yup.number().test('len', 'Must be exactly 10 characters', val => val && val.toString().length === 10 ).required(),
    state:  yup.string().required(),
    gender:  yup.string().nullable().required(),
    password: yup.string().required(),
    acceptTerms: yup.bool().oneOf([true], 'Accept Terms & Conditions')
})

const SignUp = () => {

    const history = useHistory()
    const {signup} = useAuth();
    const {register, handleSubmit, formState:{errors}, reset, control} = useForm({  resolver: yupResolver(schema)})
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
        reset();
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
                    <Controller 
                        render = {({field}) => <input {...field} type="text" placeholder="Enter First Name"/>}
                        control={control}
                        name="firstName"
                    />
                    <p>{errors.firstName?.message}</p> 
                    </div>
                    <div className={classes.firstname}>
                    <label htmlFor="text">
                            Lastname
                    </label>
                    <Controller 
                        render = {({field}) => <input {...field} type="text"  placeholder="Enter Last Name" /> }
                        control={control}
                        name="lastName"
                    />
                    <p>{errors.lastName?.message}</p> 
                    </div>                 
                    </div>
                <div>
                    <label htmlFor="text">
                            Email
                    </label>
                        <Controller 
                        render = {({field}) =>   <input {...field} type="email"  placeholder="Enter Email" /> }
                        control={control}
                        name="email"
                    />
                    <p>{errors.email?.message}</p> 
                </div>
                <div>
                    <label htmlFor="text">
                       Phone No.
                    </label>
                    <Controller 
                        render = {({field}) => <input { ...field } type="tel"  placeholder="Enter Phone Number" />}
                        control={control}
                        name="number"
                    />
                    <p>{errors.number?.message}</p> 
                </div>
                <div>
                    <label htmlFor="text">
                            State
                    </label>
                    <Controller 
                        render = {({field}) => (
                            <select { ...field }>
                            <option value = ""  >Choose State</option>
                               {States.map((state,index) => (
                                   
                                   <option key={index} value={state}>{state}</option>
                               ))}
                            </select>
                        )} 
                        control={control}
                        name="state"
                    />  
                     <p>{errors.state?.message}</p> 
                </div>
                <div>
                    <label htmlFor="text">
                          Gender
                    </label>
                    <div className={classes.radiobtn}>
                        <input {...register("gender")} type="radio" value="Male" />Male
                        <input {...register("gender")} type="radio" value="Female" /> Female
                    </div>
                    <p>{errors.gender?.message}</p> 
                </div>
                <div>
                    <label htmlFor="email" >
                            Your Password
                    </label>
                    <Controller 
                        render = {({field}) => <input {...field} type="password"  placeholder="Enter Password"/>}
                        control={control}
                        name="password"
                    />
                   <p>{errors.password?.message}</p> 
                </div> 
            
                <div className={classes.terms}>    
                    
                    <Controller 
                        render = {({field}) => <input type='checkbox' {...field}  id="acceptTerms"/>}
                        control={control}
                        name="password"
                    />
                    <p for="checkbox">Please accept the Terms & Conditions.</p>
 
                 </div>
                 <p>{errors.acceptTerms?.message}</p>
                
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
