import React, { Component } from 'react';
import firebase from '../firebase';
import sanitizeHTML from 'sanitize-html';

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
            postDate: '',
            cleanPost: '',
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
                postDate: snapshot.val().postDate,
                cleanPost: sanitizeHTML(snapshot.val().text, {
                    allowedTags: sanitizeHTML.defaults.allowedTags.concat([ 'img' ]),
                  })
            });
        })
    }

    render() {
        console.log(this.state.cleanPost)
        return (
            <article className="blogPostListing" key={this.state.key}>
                <h3 className="blogPostTitle">{this.state.title}</h3>
                <h4 className="blogPostAuthor">Written By: {this.state.author}</h4>
                <h4 className="blogPostDate">Posted On: {this.state.postDate}</h4>
                <figure className="blogPostImage">
                    <img src={this.state.image} alt="food"/>
                </figure>
                <div className="blogPostText" dangerouslySetInnerHTML={{__html: this.state.cleanPost}}/>
                <p className="blogPostCategories">Categories: {this.state.category}</p>
            </article>
        );
    }
};

export default BlogPost;