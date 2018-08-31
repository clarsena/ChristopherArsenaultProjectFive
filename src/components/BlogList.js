import React, { Component } from 'react';
import firebase from '../firebase';

const categoryRef = firebase.database().ref('/BlogPosts');

class BlogList extends Component {
    constructor() {
        super();
        this.state = {
            blogPostList: [],
            currentCategory: '',
            allPostsArray: [],
            filteredLists: [],
        }
    }
    componentDidMount() {
        const category = (this.props.match.params.category.toLowerCase().replace(" ", ""));
        this.setState({ 
            currentCategory: category
        })
        categoryRef.on('value', (snapshot) => {
            this.gatherCategoryList(snapshot.val(), category);
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const category = (nextProps.match.params.category.toLowerCase().replace(" ", ""));
        this.setState({
            currentCategory: category
        })
        categoryRef.on('value', (snapshot) => {
            this.gatherCategoryList(snapshot.val(), category);
        })
    }
    gatherCategoryList = (allPosts, category) => {
        // const category = this.props.match.params.category;
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
        this.setState({
            allPostsArray,
            filteredLists
        })
        console.log(this.state.filteredLists);
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