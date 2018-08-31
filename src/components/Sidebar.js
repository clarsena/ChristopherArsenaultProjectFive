import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<aside className="sidebar">
			<ul className="sidebarLinks">
				<li><Link to="/">Home</Link></li>
				<li><Link to="/aboutus">About Us</Link></li>
				<li><Link to="/contactus">Contact Us</Link></li>
			</ul>
			<h3 className="sidebarHeading">Categories</h3>
			<ul className="sidebarLinks">
				{props.sidebarCategories.map((category, i) => {
					return (
						<li key={category}><Link to={`/blog-list/${category}`}>{category}</Link></li>
					);
				})}
			</ul>
		</aside>
	);
};

export default Sidebar;