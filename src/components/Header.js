import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super();
        //  SETTING THE INITIAL STATE FOR THE MOBILE NAV MENU
        this.state = {
            isActive: false
        }
    }
    //  TOGGLES THE STATE OF THE MOBILE NAV MENU
    toggleNavMenu = (e) => {
        this.setState({
            isActive: !this.state.isActive
        })
    }
    render() {
        //  RENDERS THE HEADER AND NAV MENU TO THE PAGE
        return (
            <header className='header'>
                <nav className='topNav'>
                    <h1>Nourish Our Souls</h1>
                    <p onClick={this.toggleNavMenu} className='topNavHamburgerIcon'><i className='fas fa-bars'></i></p>
                    <div className={this.state.isActive ? 'topNavHamburgerMenu show' : 'topNavHamburgerMenu'}>
                        <ul className='topNavLinks navColumns'>
                            {/* ROUTING LINKS TO NAVIGATE THROUGH THE PAGE */}
                            <li onClick={this.toggleNavMenu} className='exitResponsive'><i className='fas fa-times'></i></li>
                            <Link to='/' onClick={this.toggleNavMenu} className='navLink topNavItemHidden'><li>Home</li></Link>
                            <Link to='/admin' onClick={this.toggleNavMenu} className='navLink topNavItemHidden'><li>Add Post</li></Link>
                            <Link to={`/blog-list/recipes`} onClick={this.toggleNavMenu} className='navLink topNavItemHidden' ><li key='recipes'>Recipes</li></Link>
                            <Link to={`/blog-list/restaurants`} onClick={this.toggleNavMenu} className='navLink topNavItemHidden' ><li key='restaurants'>Restaurants</li></Link>
                            <Link to={`/blog-list/foodadventures`} onClick={this.toggleNavMenu} className='navLink topNavItemHidden' ><li key='foodadventures'>Food Adventures</li></Link>
                            <Link to='/aboutus' onClick={this.toggleNavMenu} className='navLink topNavItemHidden'><li>About Us</li></Link>
                            <Link to='/contactus' onClick={this.toggleNavMenu} className='navLink topNavItemHidden'><li>Contact Us</li></Link>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
};

export default Header;