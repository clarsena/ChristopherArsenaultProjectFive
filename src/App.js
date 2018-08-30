import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// 	COMPONENTS
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';

//	General Firebase Reference
const dbRef = firebase.database().ref('/Sidebar');

class App extends Component {
	constructor() {
		super();
		this.state = {
			sidebarCategories: [],
			sidebarArchives: []
		}
	}
	componentDidMount() {
		dbRef.on('value', (snapshot) => {
			this.setSidebarLinks(snapshot.val());
		});
	}
	setSidebarLinks = (sidebarObject) => {
		this.setState({
			sidebarCategories: sidebarObject.Categories,
			sidebarArchives: sidebarObject.Archives
		})
	}
	render() {
		return (
			<div className="App">
				<Header />
				<main className="mainContent">
					<Sidebar sidebarCategories={this.state.sidebarCategories} sidebarArchives={this.state.sidebarArchives} />
					<Landing />
				</main>
			</div>
		);
	}
}

export default App;
