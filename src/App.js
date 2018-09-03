import React, { Component } from 'react';
import './App.css';
import firebase from './firebase';

// 	COMPONENTS
import Header from './components/Header';
import Main from './components/Main';

//	General Firebase Reference
const sidebarRef = firebase.database().ref('/Sidebar');

class App extends Component {
	constructor() {
		super();
		this.state = {
			sidebarCategories: [],
			sidebarArchives: [],
			sidebarGeneral: []
		}
	}
	componentDidMount() {
		sidebarRef.on('value', (snapshot) => {
			this.setSidebarLinks(snapshot.val());
		});
	}
	setSidebarLinks = (sidebarObject) => {
		this.setState({
			sidebarCategories: sidebarObject.Categories,
			sidebarArchives: sidebarObject.Archives,
			sidebarGeneral: sidebarObject.General
		})
	}
	render() {
		return (
			<div className="App wrapper">
				<Header />
				<main className="mainContent">
					<Main />
				</main>
			</div>
		);
	}
}

export default App;
