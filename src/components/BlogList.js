import React, { Component } from 'react';
import firebase from '../firebase';

const categoryRef = firebase.database().ref('/BlogPosts');
// let d = new Date();
// const tempPost = {
//     title: "Post 2",
//     author: "Chris",
//     image: "url-goes-here",
//     text: "This is another temporary post to see how it looks like when it gets up here",
//     category: ["recipes"],
//     postDate: d.toString(),
// }
// console.log(tempPost.postDate);
// // categoryRef.push(tempPost);

class BlogList extends Component {
    constructor() {
        super();
        this.state = {
            blogPostList: [],
            currentCategory: ''
        }
    }
    componentWillReceiveProps() {
        console.log(this.props); 
        const category = (this.props.match.params.category.toLowerCase().replace(" ", ""));
        this.setState({
            currentCategory: category
        })
        categoryRef.on('value', (snapshot) => {
            this.gatherCategoryList(snapshot.val());
        })
    }
    gatherCategoryList = (allPosts) => {
        const category = this.state.currentCategory;
        const allPostsArray = Object.entries(allPosts).map((posts) => {
            return ({
              key: posts[0],
              title: posts[1].title,
              author: posts[1].author,
              image: posts[1].image,
              text: posts[1].text,
              category: posts[1].category,
              postDate: posts[1].postDate
            })
        })
        const filteredLists = allPostsArray.filter(post => post.category.includes(category));
    }
    render() {
        return (
            <div className="blogList">
                <h2>Blog List Section</h2>
                <h3>{this.state.currentCategory} Section</h3>
            </div>
        );
    }
};

export default BlogList;