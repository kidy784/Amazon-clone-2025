
import React from "react";
import { catagoryInfos } from "./Categoryfullinfo";
import CategoryCard from "./CategoryCard";
import classes from "./Category.module.css";

function Category() {
	return (
		<section className={classes.catagory_container}>
			{catagoryInfos.map((info) => (
				<CategoryCard key={info.id} data={info} />
			))}
		</section>
	);
}

export default Category;

