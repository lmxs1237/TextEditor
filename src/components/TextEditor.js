import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import { underline } from 'react-icons-kit/feather/underline';

import { BoldMark, ItalicMark, FormatToolbar } from './index';


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
            case 'c': {
                change.toggleMark('code');
                return true;
            }
            case 'l': {
                change.toggleMark('list');
                return true;
            }
            case 'u': {
                change.toggleMark('underline');
                return true;
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
            case 'code': 
                return <code {...props.attributes}>{props.children}</code>;          
            case 'list':
                return (
                    <ul {...props.attributes}>
                        <li>{props.children}</li>
                    </ul>
                );
            case 'underline':
                return <u {...props.attributes}>{props.children}</u>;
            default: {
                return;
            }
        }
    }

    ref = editor => {
        this.editor = editor
    }

    onMarkClick = (e, type) => {
        e.preventDefault();
        this.editor.toggleMark(type)
        /*const value  = this.state.value;
        const change = value.change().toggleMark(type);
        this.onChange(change);*/
    }

	render() {
		return (
            <Fragment>
                <FormatToolbar>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={bold} />
                    </button>

                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={italic} />
                    </button>

                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'code')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={code} />
                    </button>

                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'list')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={list} />
                    </button>

                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'underline')}
                        className='tooltip-icon-button'
                    >
                        <Icon icon={underline} />
                    </button>


                </FormatToolbar>
                <Editor 
                    value={this.state.value} 
                    ref={this.ref}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                    renderMark={this.renderMark} 
                />
            </Fragment>
		);
	}
}
