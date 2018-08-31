import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Landing from './Landing';
import BlogList from './BlogList';
import AddEditPost from './AddEditPost';
import NotFound from './NotFound';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

const Main = () => {
    return (
        <section className="landingPage">
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/blog-list/:category" component={BlogList} />
                <Route path="/admin" component={AddEditPost} />
                <Route path="/aboutus" component={AboutUs} />
                <Route path="/contactus" component={ContactUs} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
};

export default Main;