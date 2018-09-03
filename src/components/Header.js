import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <h1>Nourish Our Souls</h1>
            <nav className="topNav">
				<ul className="topNavLinks">
                    <Link to="/" className="navLink"><li>Home</li></Link>
                    <li className="navSeperator"> | </li>
                    <Link to="/admin" className="navLink"><li>Add Post</li></Link>
                    <li className="navSeperator"> | </li>
                    <Link to="/aboutus" className="navLink"><li>About Us</li></Link>
                    <li className="navSeperator"> | </li>
                    <Link to="/contactus" className="navLink"><li>Contact Us</li></Link>
                    <li className="navSeperator"> | </li>
                    <Link to={`/blog-list/recipes`} className="navLink" ><li key="recipes">Recipes</li></Link>
                    <li className="navSeperator"> | </li>
                    <Link to={`/blog-list/restaurants`} className="navLink" ><li key="restaurants">Restaurants</li></Link>
                    <li className="navSeperator"> | </li>
                    <Link to={`/blog-list/foodadventures`} className="navLink" ><li key="foodadventures">Food Adventures</li></Link>
				</ul>
			</nav>
        </header>
    );
};

export default Header;