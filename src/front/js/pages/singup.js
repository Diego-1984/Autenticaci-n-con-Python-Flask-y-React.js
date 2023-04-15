import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Singup = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<input type="text" placeholder="e-mail"></input>
			<input type="pasword" placeholder="pasword"></input>
			<button>Singup</button>
		</div>
	);
};
