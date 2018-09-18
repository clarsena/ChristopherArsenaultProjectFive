import React, { Component } from 'react';
import Preview from './Preview.js';
import firebase from '../firebase';
import ControlledEditor from './ControlledEditor.js';
import sanitizeHTML from 'sanitize-html';
import { BrowserRouter as Redirect} from 'react-router-dom'
import moment from 'moment';

class AddEditPost extends Component {
    constructor() {
        super();
        //  SETTING THE INITIAL STATE
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
            foodadventures: false,
            newPostMade: false
        }
    }
    //  HANDLECHANGE LISTENS FOR ANY CHANGES IN THE INPUTS AND SETS THE STATE ACCORDINGLY
    handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    //  HANDLESUBMIT LISTENS FOR THE FORM SUBMISSION AND PUSHES THE NEW POST TO THE DATABASE
    handleSubmit = (e) => {
        e.preventDefault();
        //  CREATING THE CURRENT TIMESTAMP
        const d = moment().format('MMMM Do YYYY, h:mm a');
        //  FIREBASE REFERENCE FOR THE BLOGPOSTS NODE
        const newPostRef = firebase.database().ref('/BlogPosts');
        //  PUTTING TOGETHER ALL THE DATA FOR THE NEW POST
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
        //  PREPARING THE POST TO BE PUSHED TO FIREBASE
        const postToPush = {
            key: newPostKey,
            title: this.state.title,
            author: this.state.author,
            image: this.state.image,
            text: this.state.text,
            shortDescription: sanitizeHTML(this.state.text, {
                allowedTags: [],
                allowedAttributes: []
              }).substr(0, 400),
            category: this.state.category,
            postDate: d,
        }
        //  PUSHING THE POST TO FIREBASE AND CLEARING THE STATE
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
            foodadventures: false,
            newPostMade: true
        })
    }
    getPostText = (postText) => {
        this.setState({
            text: postText
        }), () => {};
    }
    render() {
        return (
            <section className='adminArea'>
            { this.state.newPostMade ? <Redirect push to='/' /> : ''}
                <h2>Admin Area</h2>
                {/* FORM INPUTS FOR ADDING A NEW POST*/}
                <form action='' className='adminForm' onSubmit={this.handleSubmit}>
                    <label htmlFor='newPostTitle' className='newPostLabel'>Post Title: </label>
                    <input type='text' onChange={this.handleChange} className='newPostTitle newPostInput' name='title' id='title' placeholder='Enter your title...' required value={this.state.title} />
                    <label htmlFor='newPostAuthor' className='newPostLabel'>Post Author: </label>
                    <input type='text' onChange={this.handleChange} className='newPostAuthor  newPostInput' name='author' id='author' placeholder='Enter your name...' required value={this.state.author} />
                    <label htmlFor='newPostImage' className='newPostLabel'>Post Image: </label>
                    <input type='text' onChange={this.handleChange} className='newPostImage  newPostInput' name='image' id='image' placeholder='Enter the path to your image...' value={this.state.image} />
                    <label htmlFor='newPostText' className='newPostLabel'>Write Your Post Here: </label>
                    <ControlledEditor getPostText={this.getPostText} />
                    <fieldset className='newPostInput' required>
                        <legend>Choose categories for the post</legend>
                        <div>
                            <input type='checkbox' className='newPostCategory fieldsetInput' id='categoryRecipe' name='recipes' checked={this.state.recipes} onChange={this.handleChange} />
                            <label htmlFor='categoryRecipe' className='fieldsetLabel'> Recipe </label>
                        </div>
                        <div>
                            <input type='checkbox' className='newPostCategory fieldsetInput' id='categoryRestaurant' name='restaurants' checked={this.state.restaurants} onChange={this.handleChange} />
                            <label htmlFor='categoryRestaurant' className='fieldsetLabel'> Restaurant </label>
                        </div>
                        <div>
                            <input type='checkbox' className='newPostCategory fieldsetInput' id='categoryFoodAdventure' name='foodadventures' checked={this.state.foodadventures} onChange={this.handleChange} />
                            <label htmlFor='categoryFoodAdventure' className='fieldsetLabel'> Food Adventure </label>
                        </div>
                    </fieldset>
                    <input type='submit' className='newPostSubmit' value='Create New Post'/>
                </form>
                <h2>Post Preview</h2>
                {/* PREVIEW COMPONENT TO GET A PREVIEW OF HOW THE POST WILL LOOK */}
                <Preview previewTitle={this.state.title} previewAuthor={this.state.author} previewImage={this.state.image} previewText={this.state.text} />
            </section>
        );
    }
};

export default AddEditPost;