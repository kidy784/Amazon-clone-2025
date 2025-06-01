import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import classes from "./Product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { DataContext } from "../Dataprovider/Dataprovider"; 
import { Type } from "../utility/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
	const { image, title, id, rating, price, description } = product;

	const [state, dispatch] = useContext(DataContext);

	const addToCart = () => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item: {
				image,
				title,
				id,
				rating,
				price,
				description,
			},
		});
	};

	return (
		<div
			className={`${classes.card_container} ${
				flex ? classes.product_flexed : ""
			}`}
		>
			<Link to={`/products/${id}`}>
				<img src={image} alt={title} />
			</Link>
			<div>
				<h4>{title}</h4>
				{renderDesc && <div style={{ maxWidth: "750px" }}>{description}</div>}
				{rating && (
					<div className={classes.rating}>
						<Rating value={rating.rate} precision={0.1} readOnly />
						<small>{rating.count}</small>
					</div>
				)}
				<div>
					<CurrencyFormat amount={price} />
				</div>
				{renderAdd && (
					<button className={classes.button} onClick={addToCart}>
						Add to Cart
					</button>
				)}
			</div>
		</div>
	);
}

export default ProductCard;
