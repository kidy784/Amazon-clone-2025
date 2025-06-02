import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { DataContext } from "../Dataprovider/Dataprovider";
import { auth } from "../utility/firebase";
function Header() {
	const [{ user,basket }, dispatch] = useContext(DataContext);
	const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
	return (
		<section className={classes.fixed}>
			<div className={classes.header_container}>
				<div className={classes.logo_container}>
					<Link to="/">
						<img
							src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
							alt="amazon logo"
							style={{ width: "100px" }}
						/>
					</Link>
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
					<IoSearch size={38} />
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
					<Link to={!user && "/auth"}>
						<div>
							{user ? (
								<>
									<p>Hello {user?.email?.split("@")[0]}</p>
									<span onClick={()=>auth.signOut()}>signOut</span>
								</>
							) : (
								<>
									<p> Hello, Sign in</p>
									<span>Account & Lists</span>
								</>
							)}
						</div>
					</Link>

					<Link to="/orders">
						<p>returns</p>
						<span> & orders</span>
					</Link>

					<Link to="/cart" className={classes.cart}>
						<FiShoppingCart size={35} />
						<span>{totalItem}</span>
					</Link>
				</div>
			</div>
			<LowerHeader />
		</section>
	);
}

export default Header;
