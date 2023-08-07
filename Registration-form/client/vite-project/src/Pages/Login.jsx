import React , {useState} from 'react';
// import axios from 'axios';
import  axiosInstance  from '../axiosInstance';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate()
const [data,Setdata] = useState({
    email:"",
    password:""
})

const handleSubmit = async(e) => {
    e.preventDefault();
    const {email , password} = data
    try { 
        const{ data} = await axiosInstance.post('/login',{
            email,
            password
        });
   if(data.error){
    toast.error(data.error)
   }
   else{
     Setdata({});
     navigate('/dashboard')
   }
   
    } catch (error) {
        console.log(error);
    }
     
}
    return <div>
        <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type = "email" placeholder='Enter email here' value={data.email} onChange={(e) => Setdata({...data ,email: e.target.value})}/>
            <label>Password</label>
            <input type = "password" placeholder='Enter password' value={data.password} onChange={(e) => Setdata({...data ,password: e.target.value})}/>
            <button type='submit'>Submit</button>
        </form>
    </div>;
}



export default Login;