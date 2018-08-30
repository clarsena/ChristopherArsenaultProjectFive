import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
	console.log(props);
	return (
		<aside className="sidebar">
			<ul className="sidebarLinks">
				<a href="/"><li>Home</li></a>
			</ul>
			<h3 className="sidebarHeading">Categories</h3>
			<ul className="sidebarLinks">
				{props.sidebarCategories.map((category, i) => {
					return (
						<li key={i}>{category}</li>
					);
				})}
			</ul>

			<h3 className="sidebarHeading">Archive</h3>
			<ul className="sidebarLinks">
				{props.sidebarArchives.map((archive, i) => {
					return (
						<li key={i}>{archive}</li>
					);
				})}
			</ul>
		</aside>
	);
};

export default Sidebar;