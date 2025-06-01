// import React from "react";
// import classes from "./Cart.module.css";
// import LayOut from "../../LayOut/LayOut";
// import { useContext } from "react";
// import { DataContext } from "../../Dataprovider/Dataprovider";
// import ProductCard from "../../Product/ProductCard";
// import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
// import { Link } from "react-router-dom";
// import{Type} from "../../utility/action.type"
// import { IoIosArrowDown } from "react-icons/io";
// import { MdKeyboardArrowUp } from "react-icons/md";
// function Cart() {
// 	const [{ basket, user }, dispatch] = useContext(DataContext);
//   const total = basket?.reduce((amount,item)=>{
//      return item.price *item.amount+ amount},0)
//      const increment=(item)=>{dispatch({
//       type:Type.ADD_TO_BASKET,
//       item
//      })
//     }
//     const decrement=(id)=>{
//       dispatch({type:Type.ADD_TO_BASKET,
//         item:{id}
//       })
//     }
// 	return (
// 		<LayOut>
// 			<section className={classes.container}>
// 				<div className={classes.cart_container}>
// 					<h2>Hello</h2>
// 					<h3>your shopping basket</h3>
// 					<hr />
// 					{basket?.length === 0 ? (
// 						<p>opps ! No item in your cart</p>
// 					) : (
// 						basket?.map((item) => {
// 							return (
// 								<section className={classes.Cart_product}>
// 									<ProductCard
// 										key={item.id}
// 										product={item}
// 										renderDes={true}
// 										renderAdd={false}
// 										flex={true}
// 									/>
// 									<div className={classes.btn_container}>
// 										<button
// 											className={classes.btn}
// 											onClick={() => increment(item)}
// 										>
// 											<MdKeyboardArrowUp size={30}/>
// 										</button>
// 										<span>{item.amount}</span>
// 										<button
// 											className={classes.btn}
// 											onClick={() => decrement(item.id)}
// 										>
											
// 											<IoIosArrowDown size={30}/>
// 										</button>
// 									</div>
// 								</section>
// 							);
// 						})
// 					)}
// 				</div>
// 				{basket?.length !== 0 && (
// 					<div className={classes.subtotal}>
// 						<div>
// 							<p>subtotal({basket?.length} items)</p>
// 							<CurrencyFormat amount={total} />
// 						</div>
// 						<span>
// 							<input type="checkbox" />
// 							<small>This order contains a gift</small>
// 						</span>
// 						<Link to="/payments">continue to checkout</Link>
// 					</div>
// 				)}
// 			</section>
// 		</LayOut>
// 	);
// }

// export default Cart;
import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../LayOut/LayOut";
import { DataContext } from "../../Dataprovider/Dataprovider";
import ProductCard from "../../Product/ProductCard";
import CurrencyFormat from "../../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../utility/action.type";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

function Cart() {
	const [{ basket, user }, dispatch] = useContext(DataContext);

	const total = basket?.reduce((amount, item) => {
		return item.price * item.amount + amount;
	}, 0);

	const increment = (item) => {
		dispatch({
			type: Type.ADD_TO_BASKET,
			item,
		});
	};

	const decrement = (id) => {
		dispatch({
			type: Type.REMOVE_FROM_BASKET,
			id,
		});
	};

	return (
		<LayOut>
			<section className={classes.container}>
				<div className={classes.cart_container}>
					<h2>Hello</h2>
					<h3>Your shopping basket</h3>
					<hr />
					{basket?.length === 0 ? (
						<p>Oops! No item in your cart.</p>
					) : (
						basket?.map((item) => (
							<section className={classes.Cart_product}>
								<ProductCard
									key={item.id}
									product={item}
									renderDesc={true}
									renderAdd={false}
									flex={true}
								/>
								<div className={classes.btn_container}>
									<button
										className={classes.btn}
										onClick={() => increment(item)}
									>
										<MdKeyboardArrowUp size={25} />
									</button>
									<span>{item.amount}</span>
									<button
										className={classes.btn}
										onClick={() => decrement(item.id)}
									>
										<MdKeyboardArrowDown size={25} />
									</button>
								</div>
							</section>
						))
					)}
				</div>
				{basket?.length !== 0 && (
					<div className={classes.subtotal}>
						<div>
							<p>Subtotal ({basket?.length} items)</p>
							<CurrencyFormat amount={total} />
						</div>
						<label>
							<input type="checkbox" />
							<small>This order contains a gift</small>
						</label>
						<Link to="/payments">Continue to checkout</Link>
					</div>
				)}
			</section>
		</LayOut>
	);
}

export default Cart;

