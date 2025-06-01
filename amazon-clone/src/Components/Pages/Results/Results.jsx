import React, { useState, useEffect } from "react";
import classes from "./Results.module.css";
import LayOut from "../../LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../../Api/endpoints";

import ProductCard from "../../Product/ProductCard";
import Loader from "../../Loader/Loader"

function Results() {
	
	const [results, setResults] = useState([]);
	const[Loading,setLoading]=useState(false)
	const { categoryName } = useParams();

	// console.log(categoryName);

	useEffect(() => {
		axios
			.get(`${productUrl}/products/category/${categoryName}`)
			.then((res) => {
				setResults(res.data);
				setLoading(false)
			})
			.catch((err) => {
				console.log(err);
				setLoading(false)
			});
	}, [categoryName]); // also added categoryName to dependency array
	// console.log("CSS Module classes:", classes);
	return (
		<LayOut>
			<section>
				<h1 style={{ padding: "30px" }}>Results</h1>
				<p style={{ padding: "30px" }}>category /{categoryName}</p>
				<hr />
				{Loading ? (
					<Loader />
				) : (
					<div className={classes.products_container}>
						{results?.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								renderDesc={false}
								renderAdd={true}
								flex={false}
							/>
						))}
					</div>
				)}
			</section>
		</LayOut>
	)
}

export default Results;


