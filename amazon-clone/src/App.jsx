import React,{useContext,useEffect} from "react";
import "./App.css";
import Routing from "./Router";
import { DataContext } from "./Components/Dataprovider/Dataprovider";
import {auth} from "./Components/utility/firebase"
import{Type} from "./Components/utility/action.type"

function App() {
	const[{user}, dispatch]=useContext(DataContext)
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// console.log(authUser);
				dispatch({
					type:Type.SET_USER,
					user:authUser
				})
			}else{
				dispatch({
					type:Type.SET_USER,
					User:null,
				})
			}
		});
	}, []);
	return (
		
		<div>
			
			<Routing />
		</div>
	);
}

export default App;
