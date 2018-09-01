import React, { Component } from 'react';
import firebase from '../firebase';

class BlogPost extends Component {
    constructor() {
        super();
        this.state = {
            key: '',
            title: '',
            author: '',
            image: '',
            text: '',
            category: '',
            postDate: ''
        }
    }
    componentDidMount() {
        const key = (this.props.match.params.key);
        const blogPostRef = firebase.database().ref(`/BlogPosts/${key}`);
        blogPostRef.on('value', (snapshot) => {
            this.setState({
                key: snapshot.val().key,
                title: snapshot.val().title,
                author: snapshot.val().author,
                image: snapshot.val().image,
                text: snapshot.val().text,
                category: snapshot.val().category.join(', '),
                postDate: snapshot.val().postDate
            })
        })
    }

    render() {
        return (
            <article className="blogPostListing" key={this.state.key}>
                <h3 className="blogPostTitle">{this.state.title}</h3>
                <h4 className="blogPostAuthor">Written By: {this.state.author}</h4>
                <h4 className="blogPostDate">Posted On: {this.state.postDate}</h4>
                <p className="blogPostText">{this.state.text}</p>
                <p className="blogPostCategories">Categories: {this.state.category}</p>
            </article>
        );
    }
};

export default BlogPost;