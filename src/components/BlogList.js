import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';


const categoryRef = firebase.database().ref('/BlogPosts');
// const d = new Date().toString();
// const postToPush = {
//     title: 'Best Place to Eat',
//     author: 'Vinodini',
//     image: 'image URL here',
//     text: 'The top restaurants to visit from around the city',
//     shortDescription: 'A little bit of words here',
//     category: ['restaurants', 'foodadventures'],
//     postDate: d
// }
// categoryRef.push(postToPush);

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
        const category = (nextProps.match.params.category.toLowerCase().replace(" ", ""));
        this.setState({
            currentCategory: category
        })
        categoryRef.on('value', (snapshot) => {
            this.gatherCategoryList(snapshot.val(), category);
        })
    }
    gatherCategoryList = (allPosts, category) => {
        const allPostsArray = Object.entries(allPosts).map((posts) => {
            return ({
              key: posts[0],
              title: posts[1].title,
              author: posts[1].author,
              image: posts[1].image,
              shortDescription: posts[1].shortDescription,
              category: posts[1].category.join(', '),
              postDate: posts[1].postDate
            })
        })
        const filteredLists = allPostsArray.filter(post => post.category.includes(category));
        this.setState({
            allPostsArray,
            filteredLists
        })
    }
    render() {
        return (
            <section className="blogList">
                <h2>List of Posts Under - {this.props.match.params.category}</h2>
                {this.state.filteredLists.map((post) => {
                    return (
                        <Link to={`/blog-post/${post.key}`} key={post.key}>
                            <article className="blogListListing" key={post.key}>
                                <h3 className="blogListTitle">{post.title}</h3>
                                <h4 className="blogListAuthor">Writter By: {post.author}</h4>
                                <h4 className="blogListDate">Posted On: {post.postDate}</h4>
                                <p className="blogListDescription">{post.shortDescription}</p>
                                <p className="blogListCategories">Categories: {post.category}</p>
                            </article>
                        </Link>
                    )
                })}
            </section>
        );
    }
};

export default BlogList;