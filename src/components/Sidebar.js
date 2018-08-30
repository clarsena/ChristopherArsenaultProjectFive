import React from 'react';

const Sidebar = (props) => {
	console.log(props);
	return (
		<aside className="sidebar">
			<h3>Categories</h3>
			<ul>
				{props.sidebarCategories.map((category, i) => {
					return (
						<li key={i}>{category}</li>
					);
				})}
			</ul>

			<h3>Archive</h3>
			<ul>
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