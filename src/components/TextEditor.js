import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import BoldMark from './BoldMark';
import ItalicMark from './ItalicMark';


const initialValue = Value.fromJSON({
	document: {
		nodes: [
			{
				object: 'block',
				type: 'paragraph',
				nodes: [
					{
						object: 'text',
						leaves: [
							{
								text: 'My first paragraph!',
							}
						]
					}
				]
			}
		]
	}
})


// creating JavaScript modules to export functions, objects, or primitive values from the module 
export default class TextEditor extends Component {

	state = {
		value: initialValue,
	}

	// On change, update the app's React state with the new editor value.
	onChange = ({ value }) => {
		this.setState({ value })
    }
    
    onKeyDown = (e, change) => {
        console.log(e.key)
        // all action start from ctrl, if not, cancel this action
        if (!e.ctrlKey) {return}
        e.preventDefault()

        switch (e.key) {
            // if ctrl+b, add a "bold" mark to the text
            case 'b': {
                change.toggleMark('bold') // pass in bold prop in BoldMark.js
                return true
            }
            case 'i': {
                change.toggleMark('italic')
                return true
            }

            default: {
                return;
            }
        }
    }

    renderMark = props => {
        switch (props.mark.type) {
            case 'bold':  // if mark type is "bold", wrap our text inside BoldMark component
                return <BoldMark {...props} />
            case 'italic':
                return <ItalicMark {...props} />
        }
    }

	render() {
		return (
            <Editor 
                value={this.state.value} 
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                renderMark={this.renderMark} />
		)
	}
}
