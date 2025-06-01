import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../LayOut/LayOut";
import { db } from "../../utility/firebase";
import { DataContext } from "../../Dataprovider/Dataprovider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Product/ProductCard";

function Orders() {
	const [{ user }, dispatch] = useContext(DataContext);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		if (user) {
			const q = query(
				collection(db, "users", user.uid, "orders"),
				orderBy("created", "desc")
			);
			const unsubscribe = onSnapshot(q, (snapshot) => {
				setOrders(
					snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
				);
			});
			return unsubscribe; // Clean up listener on unmount
		} else {
			setOrders([]);
		}
	}, [user]);

	return (
		<LayOut>
			<section className={classes.container}>
				<div className={classes.Orders__container}>
					<h2>Your Orders</h2>
					{orders?.length === 0 && (
						<div style={{ padding: "20px" }}>you don't have orders yet.</div>
					)}
					<div>
						{orders?.map((eachOrder, i) => (
							<div key={eachOrder.id}>
								<hr />
								<p>Order ID: {eachOrder?.id}</p>
								{eachOrder?.data?.basket?.map((order, idx) => (
									<ProductCard
										flex={true}
										product={order}
										key={order.id || i}
									/>
								))}
							</div>
						))}
					</div>
				</div>
			</section>
		</LayOut>
	);
}

export default Orders;
