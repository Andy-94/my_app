import React, { Component } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
  }
  setText = (HTML)=>{
    const contentBlock = htmlToDraft(HTML);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({editorState})
  }
}

  onGetEdiotr=()=>{
    let result = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    return result
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          // wrapperClassName="demo-wrapper"
          // editorClassName="demo-editor"
          editorStyle={{border:'1px solid black',minHeight:'200px',paddingLeft:'10px'}}
          onEditorStateChange={this.onEditorStateChange}
          placeholder="Please input the product detail"
        />
        
      </div>
    );
  }
}