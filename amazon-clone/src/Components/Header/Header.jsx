import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import classes from "./Header.module.css";
import LowerHeader from "./Lowerheader";
function Header() {
	return (
		<>
			<div className={classes.header_container}>
				<div className={classes.logo_container}>
					<a href="/">
						<img
							src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
							alt="amazon logo"
						/>
					</a>
					<div className={classes.delivery}>
						<span>
							<IoLocationOutline />
						</span>
						<div>
							<p>Dilver to</p>
							<span>Ethiopia</span>
						</div>
					</div>
				</div>
				<div className={classes.search}>
					<select name="" id="">
						<option value="">All</option>
					</select>
					<input type="text" name="" id="" placeholder="Search products" />
					<IoSearch size={25} />
				</div>
				<div className={classes.order_container}>
					<a href="" className={classes.language}>
						<img
							src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/500px-Flag_of_the_United_States.svg.png"
							alt=""
						/>

						<select name="" id="">
							<option value="">EN</option>
						</select>
					</a>

					{/* three components */}
					<a href="">
						<p>Sign in</p>
						<span>Account & Lists</span>
					</a>

					<a href="">
						<p>returns</p>
						<span> & orders</span>
					</a>

					<a href="" className={classes.cart}>
						<FiShoppingCart size={35} />
						<span>0</span>
					</a>
				</div>
			</div>
			<LowerHeader/>
		</>
	);
}

export default Header;
