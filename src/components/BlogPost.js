import React, { Component } from 'react';
import firebase from '../firebase';
import sanitizeHTML from 'sanitize-html';
import Comments from './Comments';

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
            commentArray: []
        }
    }
    componentDidMount() {
        const key = (this.props.match.params.key);
        const blogPostRef = firebase.database().ref(`/BlogPosts/${key}`);
        blogPostRef.on('value', (snapshot) => {
            if(snapshot.val().comments) {
                const allCommentsArray = Object.entries(snapshot.val().comments).map((comment) => {
                    return ({
                      key: comment[0],
                      commentAuthor: comment[1].author,
                      commentText: comment[1].commentText,
                      commentDate: comment[1].date
                    })
                })
                this.setState({
                    commentArray: allCommentsArray
                })
            }
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
                        allowedAttributes: {
                            '*': [ 'class' ],
                            
                          },
                        allowedClasses: {
                        '*': [ 'bold', '.underline', '.italic', '.center', '.right', '.left', '.big', '.small' ]
                        }
                  }),
            });
        })
    }
    addComment = (commentAuthor, commentText, commentDate) => {
        const key = (this.props.match.params.key);
        const blogPostRef = firebase.database().ref(`/BlogPosts/${key}/comments`);
        const commentToPush = {
            author: commentAuthor,
            commentText: commentText,
            date: commentDate
        }
        blogPostRef.push(commentToPush);
    }
    render() {
        console.log(this.state.cleanPost)
        return (
            <article className="blogPostListing" key={this.state.key}>
                <h3 className="blogPostTitle">{this.state.title}</h3>
                <h4 className="blogPostAuthor">Written By: {this.state.author}</h4>
                <h4 className="blogPostDate">Posted On: {this.state.postDate}</h4>
                <figure className="blogPostImage">
                    <img src={this.state.image ? `${this.state.image}` : "/assets/default.jpg"} alt="yummy food"/>
                </figure>
                <div className="blogPostText" dangerouslySetInnerHTML={{__html: this.state.cleanPost}}/>
                <p className="blogPostCategories">Categories: {this.state.category}</p>
                <Comments addComment={this.addComment} allComments={this.state.commentArray} />
            </article>
        );
    }
};

export default BlogPost;