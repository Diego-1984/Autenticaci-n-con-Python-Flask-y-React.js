import React, { useContext , useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [pasword, setPasword] = useState("")
	const handelClick =()=>{
		fetch(process.env.BACKEND_URL + "api/login",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        })
        .then(res => res.json())
        .then(response => {
            if (response.token){
                localStorage.setItem("token", response.token)
                navigate("/private")
            } else {
                alert("Something went wrong")
            }
        })
    	}

	return (
		<>
		<div className="text-center mt-5">
			<h1>LOGIN</h1>
			<input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="e-mail"></input>
			<input type="pasword" onChange={(e)=>{setPasword(e.target.value)}}placeholder="pasword"></input>
			<button onClick={handelClick()}>Login</button>
		</div>	
		</>
	);
	}
