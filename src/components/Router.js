import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing.js';
import Blog from './Blog';
import AddEditPost from './AddEditPost';
import NotFound from './NotFound';

const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route path="/blog/" component={Blog} />
				<Route path="/admin" component={AddEditPost} />
				<Route component={NotFound} />
			</Switch>
		</BrowserRouter> 
	);
};

export default Router;