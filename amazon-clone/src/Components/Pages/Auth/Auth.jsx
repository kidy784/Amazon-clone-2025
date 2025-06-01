import React, { useState,useContext } from 'react'

import classes from '../Auth/SignUp.module.css'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import {auth} from '../../utility/firebase'
import{signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import{DataContext} from '../../Dataprovider/Dataprovider'
import {Type} from"../../utility/action.type"
import{ClipLoader } from"react-spinners"

function Auth() {
	const [email, setEmail]=useState("")
	const [password, setPassword]=useState("")
	const[error, setError ]=useState("")
	const[loading, setLoading]=useState({
		signIn:false,
		signUP:false
	})
	 const [{user},dispatch]=useContext(DataContext);
	 const navigate = useNavigate();
	 const navStateData=useLocation()
	 console.log (navStateData)

console.log(user)
// console.log(email,password)
const authHandler=async(e)=>{
	e.preventDefault()
	console.log(e.target.name);
	if(e.target.name=="signin"){
		setLoading({...loading,signIn:true})
		signInWithEmailAndPassword(auth,email,password).then((userInfo)=>{
			
			dispatch({
				type:Type.SET_USER,
				user:userInfo.user
			});
			setLoading({...loading,signIn:false});
			navigate(navStateData?.state?.redirect ||"/")
		}).catch((err)=>
			{setError(err.message);
				setLoading({ ...loading,signIn: false });
			})

	}else {
		setLoading({ ...loading, signUP: true });
		createUserWithEmailAndPassword(auth, email,password).then((userInfo)=>{
			
			dispatch({
				type: Type.SET_USER,
				user: userInfo.user,
			});
			setLoading({...loading,signUP:false})
			navigate(navStateData?.state?.redirect || "/")
		}).catch((err)=>{
			setError(err.message)
			setLoading({ ...loading, signUP: false });
		})

	}
}
  return (
		<section className={classes.login}>
			{/* logo */}
			<Link to="/">
				<img
					src=" https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
					alt=""
				/>
			</Link>
			<div className={classes.login_container}>
				<h1> sign In</h1>
				{ navStateData?.state?.msg && (<small
				style={{padding:"5px",
					textAlign:"center",
					color:"red",
					fontWeight:"bold"
				}}>{navStateData?.state?.msg}

				</small>)}
				<form action="">
					<div>
						<label htmlFor="email">Email</label>
						<input
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							type="email"
							id="email"
						/>
					</div>
					<div>
						<label htmlFor="password">password</label>
						<input
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							type="password"
							id="password"
						/>
					</div>
					<button
						type="submit"
						onClick={authHandler}
						name="signin"
						className={classes.login_signINButton}
					>
						{loading.signIn ? (
							<ClipLoader color="#000" size={15}></ClipLoader>
						) : (
							"sign In"
						)}
					</button>
				</form>
				<p>
					By signing-in you agree to AMAZON FAKE CLONE conditions of use &
					sale.please see our Privecy Notice, our Cookies Notice and our
					Interest-Based Ads Notice.
				</p>
				<button
					type="submit"
					onClick={authHandler}
					name="signup"
					className={classes.login_registorButton}
				>
					{loading.signUP ? (
						<ClipLoader color="#000" size={15}></ClipLoader>
					) : (
						"Create your Amazon Account"
					)}
				</button>
				{error && (
					<small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
				)}
			</div>
		</section>
	);
}

export default Auth