import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isActive: false
        }
    }
    toggleNavMenu = (e) => {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    render() {
        return (
            <header className="header">
                <h1>Nourish Our Souls</h1>
                <nav className="topNav">
                    <p onClick={this.toggleNavMenu} className="topNavHamburgerIcon"><i className="fas fa-bars"></i></p>
                    <div className={this.state.isActive ? 'topNavHamburgerMenu show' : 'topNavHamburgerMenu'}>
                        <ul className="topNavLinks navColumns">
                            <li onClick={this.toggleNavMenu} className="exitResponsive"><i className="fas fa-times"></i></li>
                            <Link to="/" onClick={this.toggleNavMenu} className="navLink topNavItemHidden"><li>Home</li></Link>
                            <li className="navSeperator"> | </li>
                            <Link to="/admin" onClick={this.toggleNavMenu} className="navLink topNavItemHidden"><li>Add Post</li></Link>
                            <li className="navSeperator"> | </li>
                            <Link to="/aboutus" onClick={this.toggleNavMenu} className="navLink topNavItemHidden"><li>About Us</li></Link>
                            <li className="navSeperator"> | </li>
                            <Link to="/contactus" onClick={this.toggleNavMenu} className="navLink topNavItemHidden"><li>Contact Us</li></Link>
                            <li className="navSeperator"> | </li>
                            <Link to={`/blog-list/recipes`} onClick={this.toggleNavMenu} className="navLink topNavItemHidden" ><li key="recipes">Recipes</li></Link>
                            <li className="navSeperator"> | </li>
                            <Link to={`/blog-list/restaurants`} onClick={this.toggleNavMenu} className="navLink topNavItemHidden" ><li key="restaurants">Restaurants</li></Link>
                            <li className="navSeperator"> | </li>
                            <Link to={`/blog-list/foodadventures`} onClick={this.toggleNavMenu} className="navLink topNavItemHidden" ><li key="foodadventures">Food Adventures</li></Link>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
};

export default Header;