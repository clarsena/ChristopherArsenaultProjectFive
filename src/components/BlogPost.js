import React, { Component } from 'react';
import firebase from '../firebase';
import Comments from './Comments';

class BlogPost extends Component {
    constructor() {
        super();
        //  SETTING THE INITIAL STATE
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
    //  GRABBING THE SPECIFIC POST MATCHING THE PASSED KEY FROM FIREBASE 
    componentDidMount() {
        const key = (this.props.match.params.key);
        const blogPostRef = firebase.database().ref(`/BlogPosts/${key}`);
        blogPostRef.on('value', (snapshot) => {
            //  CHECKING IF THERE ARE ANY COMMENTS FOR THE SPECIFIC POST AND SETTING THE STATE IF THERE ARE
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
            //  GRABBING ALL THE INFO FOR THE POST AND SETTING THE STATE. SANITIZEHTML CLEANS THE TEXT OF THE POST OF ANY UNWANTED HTML TAGS
            this.setState({
                key: snapshot.val().key,
                title: snapshot.val().title,
                author: snapshot.val().author,
                image: snapshot.val().image,
                text: snapshot.val().text,
                category: snapshot.val().category.join(', '),
                postDate: snapshot.val().postDate,
                cleanPost: snapshot.val().text
            });
        })
    }
    //  GRABS A NEWLY ENTERED COMMENT AND PUSHES IT TO FIREBASE
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
        // TAKES THE INFORMATION FROM THE SPECIFIED POST AND RENDERS IT TO THE PAGE
        return (
            <article className='blogPostListing' key={this.state.key}>
                <h3 className='blogPostTitle'>{this.state.title}</h3>
                <h4 className='blogPostAuthor'>Written By: {this.state.author}</h4>
                <h4 className='blogPostDate'>Posted On: {this.state.postDate}</h4>
                <figure className='blogPostImage'>
                    <img src={this.state.image ? `${this.state.image}` : '/assets/default.jpg'} alt='yummy food'/>
                </figure>
                <div className='blogPostText' dangerouslySetInnerHTML={{__html: this.state.cleanPost}}/>
                <p className='blogPostCategories'>Categories: {this.state.category}</p>
                {/* AREA TO LEAVE COMMENTS ON THE POST */}
                <Comments addComment={this.addComment} allComments={this.state.commentArray} />
            </article>
        );
    }
};

export default BlogPost;