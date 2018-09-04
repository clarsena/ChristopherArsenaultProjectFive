import React, { Component } from 'react';
import sanitizeHTML from 'sanitize-html';

//  PREVIEW COMPONENT TO PREVIEW WHAT A BLOG POST LOOKS LIKE WHILE ENTERING IT
class Preview extends Component {
    render() {
        return (
            <article className="blogPostListing">
                    <h3 className="blogPostTitle">{this.props.previewTitle}</h3>
                    <h4 className="blogPostAuthor">Written By: {this.props.previewAuthor}</h4>
                    <figure className="blogPostImage">
                        <img src={this.props.previewImage ? `${this.props.previewImage}` : "/assets/default.jpg"} alt="yummy food"/>
                    </figure>
                    <div className="blogPostText" dangerouslySetInnerHTML={{__html: sanitizeHTML(this.props.previewText, {
                        allowedTags: sanitizeHTML.defaults.allowedTags.concat([ 'img' ]),
                        allowedAttributes: {
                            '*': [ 'class' ],
                            
                          },
                        allowedClasses: {
                        '*': [ 'bold', '.underline', '.italic', '.center', '.right', '.left', '.big', '.small' ]
                        }
                      })}}/>
            </article>  
        );
    }
};

export default Preview;