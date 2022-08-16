import React, { Component } from 'react';


export default class Field extends Component {

    static defaultProps = {
        type: 'text',
    };

    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    render() {
        return (
            <div className='form-group'>
                <label htmlFor={this.props.name}>{this.props.text}:</label>
                <input
                    type={this.state.type}
                    name={this.props.name}
                    className='form-control'
                    onChange={this.state.changeHandler} />
            </div>
        )
    }
}
