import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../firebase';
import sanitizeHTML from 'sanitize-html'

//  INITIAL LANDING PAGE
const blogPostsRef = firebase.database().ref('/BlogPosts');

class Landing extends Component {
    constructor() {
        super();
        //  SETTING THE INITIAL STATE
        this.state = {
            blogPostList: [],
        }
    }
    //  GRAB THE INFORMATION FROM FIREBASE WHEN THE COMPONENT MOUNTS
    componentDidMount() {
        blogPostsRef.on('value', (snapshot) => {
            this.gatherBlogPosts(snapshot.val());
        })
    }
    //  GO THROUGH THE FIREBASE INFORMATION AND GATHER ALL THE RELEVENT INFORMATION FOR THE POSTS
    gatherBlogPosts = (allPosts) => {
        const blogPostList = Object.entries(allPosts).map((posts) => {
            return ({
              key: posts[0],
              title: posts[1].title,
              author: posts[1].author,
              image: posts[1].image,
              text: posts[1].text,
              shortDescription: posts[1].shortDescription,
              category: posts[1].category.join(', '),
              postDate: posts[1].postDate
            })
        })
        this.setState({
            blogPostList,
        })
    }
    render() {
        // RENDERS THE BLOG POST TO THE PAGE. FOR THE IMAGE, IF THERE IS A PATH INSIDE, SHOW IT, OTHERWISE LOAD A DEFAULT PAGE
        return (
            <section className='blogList'>
                <h2>Latest Updates</h2>
                {this.state.blogPostList.map((post) => {
                    const cleanText = sanitizeHTML(post.shortDescription, {
                        allowedTags: [],
                        allowedAttributes: []
                      })
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
                                    <p className='blogListDescription'>{cleanText}</p>
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

export default Landing;