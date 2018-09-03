import React, { Component } from 'react';
import Preview from './Preview.js';
import firebase from '../firebase';

class AddEditPost extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            image: '',
            text: '',
            shortDescription: '',
            category: [],
            postDate: '',
            recipes: true,
            restaurants: false,
            foodadventures: false
        }
    }
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const d = new Date().toString();
        const newPostRef = firebase.database().ref('/BlogPosts');
        const newPostKey = newPostRef.push().key;
        if(this.state.recipes) {
            this.state.category.push('recipes');
        }
        if(this.state.restaurants) {
            this.state.category.push('restaurants');
        }
        if(this.state.foodadventures) {
            this.state.category.push('foodadventures');
        }
        const postToPush = {
            key: newPostKey,
            title: this.state.title,
            author: this.state.author,
            image: this.state.image,
            text: this.state.text,
            shortDescription: this.state.text.substr(0, 400),
            category: this.state.category,
            postDate: d,
        }
        newPostRef.push(postToPush);
        this.setState({
            title: '',
            author: '',
            image: '',
            text: '',
            shortDescription: '',
            category: [],
            postDate: '',
            recipes: true,
            restaurants: false,
            foodadventures: false
        })
    }
    render() {
        return (
            <section className="adminArea">
                <h2>Admin Area</h2>
                <form action="" className="adminForm" onSubmit={this.handleSubmit}>
                    <label htmlFor="newPostTitle" className="newPostLabel">Post Title: </label>
                    <input type="text" onChange={this.handleChange} className="newPostTitle newPostInput" name="title" id="title" placeholder="Enter your title..." required value={this.state.title} />
                    <label htmlFor="newPostAuthor" className="newPostLabel">Post Author: </label>
                    <input type="text" onChange={this.handleChange} className="newPostAuthor  newPostInput" name="author" id="author" placeholder="Enter your name..." required value={this.state.author} />
                    <label htmlFor="newPostImage" className="newPostLabel">Post Image: </label>
                    <input type="text" onChange={this.handleChange} className="newPostImage  newPostInput" name="image" id="image" placeholder="Enter the path to your image..." value={this.state.image} />
                    <label htmlFor="newPostText" className="newPostLabel">Write Your Post Here: </label>
                    <textarea onChange={this.handleChange} className="newPostText newPostInput" name="text" id="text" rows="10" placeholder="Write your post here..." required value={this.state.text} ></textarea>
                    <fieldset className="newPostInput" required>
                        <legend>Choose categories for the post</legend>
                        <div>
                            <input type="checkbox" className="newPostCategory fieldsetInput" id="categoryRecipe" name="recipes" checked={this.state.recipes} onChange={this.handleChange} />
                            <label htmlFor="categoryRecipe" className="fieldsetLabel"> Recipe </label>
                        </div>
                        <div>
                            <input type="checkbox" className="newPostCategory fieldsetInput" id="categoryRestaurant" name="restaurants" checked={this.state.restaurants} onChange={this.handleChange} />
                            <label htmlFor="categoryRestaurant" className="fieldsetLabel"> Restaurant </label>
                        </div>
                        <div>
                            <input type="checkbox" className="newPostCategory fieldsetInput" id="categoryFoodAdventure" name="foodadventures" checked={this.state.foodadventures} onChange={this.handleChange} />
                            <label htmlFor="categoryFoodAdventure" className="fieldsetLabel"> Food Adventure </label>
                        </div>
                    </fieldset>
                    <input type="submit" className="newPostSubmit" value="Create New Post"/>
                </form>
                <h2>Post Preview</h2>
                <Preview previewTitle={this.state.title} previewAuthor={this.state.author} previewImage={this.state.image} previewText={this.state.text} />
            </section>
        );
    }
};

export default AddEditPost;