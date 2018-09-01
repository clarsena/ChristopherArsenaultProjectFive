import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
	return (
		<aside className="sidebar">
			<nav className="sideNav">
				<ul className="sidebarLinks">
					<Link to="/" className="navLink"><li>Home</li></Link>
					<Link to="/aboutus" className="navLink"><li>About Us</li></Link>
					<Link to="/contactus" className="navLink"><li>Contact Us</li></Link>
				</ul>
				<h3 className="sidebarHeading">Categories</h3>
				<ul className="sidebarLinks">
					{props.sidebarCategories.map((category, i) => {
						return (
							<Link to={`/blog-list/${category}`} className="navLink" ><li key={category}>{category}</li></Link>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;