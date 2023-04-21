import React, { useState } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Singup = () => {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const handelClick =()=>{
		fetch(process.env.BACKEND_URL + "api/singup",{
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
            if (response.message=="all ok"){
                navigate("/login")
            } else {
                alert("Usuario o contraseña incorrectos")
            }
        })
    	}

	return (
		<>
		<div className="text-center mt-5">
			<h1>SINGUP</h1>
			<input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="e-mail"></input>
			<input type="pasword" onChange={(e)=>{setPassword(e.target.value)}}placeholder="pasword"></input>
			<button onClick={handelClick()}>Singup</button>
		</div>	
		</>
	);
	}