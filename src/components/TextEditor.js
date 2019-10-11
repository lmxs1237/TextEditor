import React, { Component } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'


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

	render() {
		return (
			<Editor value={this.state.value} onChange={this.onChange} />
		)
	}
}
