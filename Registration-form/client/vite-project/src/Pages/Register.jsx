import React, { useState } from 'react';
import axiosInstance from "../axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const [data, setdata] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const { name, email, password } = data
        try {
           const {data} = await axiosInstance.post('/register',{
            name,email,password
           })
            if (data.error) {
                toast.error(data.error);
            } else {
                setdata({})
                toast.success('Registration successful, welcome!')
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" placeholder='Enter name here' value={data.name} onChange={(e) => setdata({ ...data, name: e.target.value })} />
                <label>Email</label>
                <input type="text" placeholder='Enter email here' value={data.email} onChange={(e) => setdata({ ...data, email: e.target.value })} />
                <label>Password</label>
                <input type="password" placeholder='Enter password' value={data.password} onChange={(e) => setdata({ ...data, password: e.target.value })} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Register;
