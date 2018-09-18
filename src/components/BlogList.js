import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';

//  FIREBASE REFERENCE FOR THE BLOG POSTS NODE
const categoryRef = firebase.database().ref('/BlogPosts');

class BlogList extends Component {
    constructor() {
        super();
        //  SETTING THE INITIAL STATE
        this.state = {
            blogPostList: [],
            currentCategory: '',
            allPostsArray: [],
            filteredLists: [],
        }
    }
    componentDidMount() {
        //  GRABBING A SNAPSHOT OF THE BLOG POSTS NODE FROM FIREBASE WHEN THE COMPONENT MOUNTS
        const category = (this.props.match.params.category.toLowerCase().replace(' ', ''));
        this.setState({ 
            currentCategory: category
        })
        categoryRef.on('value', (snapshot) => {
            this.gatherCategoryList(snapshot.val(), category);
        })
    }
    //  GRABBING A SNAPSHOT OF THE BLOG POSTS NODE FROM FIREBASE WHEN THE COMPONENT WILL RECEIVE COMPONENTS (WHEN SELECTING A DIFFERENT CATEGORY)
    componentWillReceiveProps(nextProps) {
        const category = (nextProps.match.params.category.toLowerCase().replace(' ', ''));
        this.setState({
            currentCategory: category
        })
        categoryRef.on('value', (snapshot) => {
            this.gatherCategoryList(snapshot.val(), category);
        })
    }
    //  GOING THROUGH ALL THE BLOG POST OBJECTS FOR THE SPECIFIC CATEGORY AND MAKING THEM INTO AN ARRAY OF JUST THE RELEVENT DATA
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
        //  SETTING THE STATE FOR THE NEWLY CREATED ARRAYS
        this.setState({
            allPostsArray,
            filteredLists
        })
    }
    render() {
        return (
            <section className='blogList'>
                <h2>List of Posts Under - {this.props.match.params.category}</h2>
                {/* GOING THROUGH THE ARRAY OF FILTERED POSTS AND RENDERING THEM ONTO THE PAGE*/}
                {this.state.filteredLists.map((post) => {
                    return (
                        <Link to={`/blog-post/${post.key}`} key={post.key}>
                            <article className='blogListListing' key={post.key}>
                                <figure className='blogListPicture'>
                                    <img src={post.image ? `${post.image}` : '/assets/default.jpg'} alt='yummy food' />
                                </figure>
                                <div className='blogListText'>
                                    <h3 className='blogListTitle'>{post.title}</h3>
                                    <h4 className='blogListAuthor'>Writter By: {post.author}</h4>
                                    <h4 className='blogListDate'>Posted On: {post.postDate}</h4>
                                    <p className='blogListDescription'>{post.shortDescription}</p>
                                    <p className='blogListCategories'>Categories: {post.category}</p>
                                </div>
                            </article>
                        </Link>
                    )
                })}
            </section>
        );
    }
};

export default BlogList;