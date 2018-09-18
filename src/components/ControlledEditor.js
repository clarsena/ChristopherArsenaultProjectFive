import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ControlledEditor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editorState: EditorState.createEmpty(),
			currentContent: ''
		};
	}
	onEditorStateChange = (editorState) => {
		this.props.getPostText(draftToHtml(convertToRaw(editorState.getCurrentContent())));
		this.setState({
			editorState,
		}), () => {};
	};
	render() {
		const { editorState } = this.state;
		return (
				<Editor
					editorState={editorState}
					wrapperClassName='demo-wrapper'
					editorClassName='demo-editor'
					onEditorStateChange={this.onEditorStateChange}
				/>
		)
	}
}

export default ControlledEditor;