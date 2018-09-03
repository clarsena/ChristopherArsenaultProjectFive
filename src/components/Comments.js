import React, { Component } from 'react';

class Comments extends Component {
    constructor() {
        super();
        this.state = {
            commentAuthor: '',
            commentText: '',
            commentArray: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const d = new Date().toString();
        this.props.addComment(this.state.commentAuthor, this.state.commentText, d);
        this.setState({
            commentAuthor: '',
            commentText: ''
        })

    }
    render() {
        return (
            <div className="blogPostComments">
                <h3>Comments</h3>
                <form className="commentForm" onSubmit={this.handleSubmit} id="commentForm">
                    <label className="commentLabel" htmlFor="commentAuthor">Name: </label>
                    <input onChange={this.handleChange} type="text" id="commentAuthor" value={this.state.commentAuthor} />
                    <label className="commentLabel" htmlFor="commentText">Write your comment here: </label>
                    <input onChange={this.handleChange} type="text" id="commentText" value={this.state.commentText} />
                    <input className="commentSubmit" type="submit" value="Add Comment"/>
                </form>

                <div className="commentArea">
                    {this.props.allComments.map((comment) => {
                        return (
                            <div className="singleComment">
                                <h4>Commentor: {comment.commentAuthor}</h4>
                                <h4>Date: {comment.commentDate}</h4>
                                <p>{comment.commentText}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
};

export default Comments;