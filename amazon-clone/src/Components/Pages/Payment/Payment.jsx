import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../LayOut/LayOut";
import { DataContext } from "../../Dataprovider/Dataprovider";
import ProductCard from "../../Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../utility/firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Type } from "../../utility/action.type";
function Payment() {
	const [state, dispatch] = useContext(DataContext);
	const { user, basket } = state;
	// console.log (user)
	const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
	const total = basket?.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);
	const [cardError, setCardError] = useState(null);
	const [processing, setprocessing] = useState();
	const stripe = useStripe();
	const elements = useElements();
	const navigate= useNavigate();
	const handlechange = (e) => {
		// console.log (e);
		e.error?.message ? setCardError(e.error?.message) : setCardError("");
	};
	const handlePayment = async (e) => {
		e.preventDefault();

		try {
			setprocessing(true);
			// 1.stepone
			// backend functions ----> contact to the clinet secret
			const response = await axiosInstance({
				method: "post",
				url: `/payment/create?total=${total * 100}`,
			});
			// console.log(response.data.clientSecret);
			const clientSecret = response.data.clientSecret;

			// 2.steptwo
			// clinet side (react side confirmation)
			const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			});
			// console.log(paymentIntent);
			// 3.after the confirmation ----> order firestore database save clear basket
			await setDoc(
				doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
				{
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				}
			);
			//empty the basket
			dispatch({type:Type.EMPTY_BASKET})

			setprocessing(false);
			navigate("/orders",{state:{msg:"you have placed new order"}})
		} catch (error) {
			console.log(error);
			setprocessing(false);
		}
	};
	return (
		<LayOut>
			{/* header */}
			<div className={classes.Payment_header}>
				{" "}
				Cheakout ({totalItem}) items
			</div>
			{/* payment method */}
			<section className={classes.Payment}>
				{/* address */}
				<div className={classes.flex}>
					<h3> Delivery Address</h3>
					<div>
						<div>{user?.email}</div>
						<div>123 React Lane</div>
						<div> chicago,Il</div>
					</div>
				</div>
				<hr />
				{/* product */}
				<div className={classes.flex}>
					<h3> Review items and delivery</h3>
					<div>
						{basket?.map((item) => (
							<ProductCard product={item} flex={true} />
						))}
					</div>
				</div>
				<hr />
				{/* card form */}
				<div className={classes.flex}>
					<h3>Payment methods</h3>
					<div className={classes.payment_card_container}>
						<div className={classes.payment_details}>
							<form onSubmit={handlePayment}>
								{cardError && (
									<small style={{ color: "red" }}>{cardError}</small>
								)}
								<CardElement onChange={handlechange} />
								<div className={classes.payment_price}>
									<div>
										<span style={{ display: "flex", gap: "10px" }}>
											<p>Total order | </p>
											<CurrencyFormat amount={total} />
										</span>
									</div>
									<button type="submit">
										{processing ? (
											<div className={classes.loading}>
												<ClipLoader color="gray" size={12} />
												<p>Please Wait</p>
											</div>
										) : (
											"Pay Now"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Payment;
