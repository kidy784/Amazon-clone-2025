import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../../Api/endpoints";
import ProductCard from "../../Product/ProductCard";
import Loader from "../../Loader/Loader";


function ProductDetail() {
  const {productId}=useParams()
  const [product,setProduct]=useState({})
  const [isLoading, setisLoading]=useState(false)
  useEffect(()=>{
    setisLoading(true)
axios.get(`${productUrl}/products/${productId}`)
.then((res)=>{
  setProduct(res.data)
  setisLoading(false)
}).catch((err)=>{
  console.log(err);
  setisLoading(false)
})
 },[])
  return (
		<LayOut>
			{isLoading ? (
				<Loader />
			) : (
				<ProductCard
					product={product}
					flex={true}
					renderDesc={true}
					renderAdd={true}
				/>
			)}
		</LayOut>
	);
}

export default ProductDetail