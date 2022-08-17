import React, { Component } from "react";

class FormElement extends Component {
    static defaultProps = {
        inline: false,
        attrs: {},
        className: '',
    }

    constructor(props) {
        super(props);

        this.state = { ...props };
    }
}

export class TextField extends FormElement {
    static defaultProps = {
        placeholder: '',
        inline: false,
        attrs: {},
        className: '',
        value: '',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.inline ? 'form-inline' : 'form-group'}>

                {[undefined, null].indexOf(this.props.text) == -1 &&
                    <label htmlFor={this.props.name}>{this.props.text}:</label>
                }

                <input
                    type='text'
                    name={this.state.name}
                    className={'form-control1 ' + this.props.className}
                    placeholder={this.props.placeholder}
                    onChange={this.props.changeHandler}
                    value={this.props.value}
                    {...this.props.attrs} />

                {[undefined, null].indexOf(this.props.children) == -1 &&
                    this.props.children
                }
            </div>
        );
    }
}

export class DateField extends FormElement {
    static defaultProps = {
        inline: false,
        attrs: {},
        className: '',
        value: '',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.inline ? 'form-inline' : 'form-group'}>

                {[undefined, null].indexOf(this.props.text) == -1 &&
                    <label htmlFor={this.props.name}>{this.props.text}:</label>
                }

                <input
                    type='date'
                    autoComplete='off'
                    name={this.props.name}
                    className={'form-control1 ' + this.props.className}
                    onChange={this.props.changeHandler}
                    value={this.props.value}
                    {...this.props.attrs} />

                {[undefined, null].indexOf(this.props.children) == -1 &&
                    this.props.children
                }
            </div>
        );
    }
}

export class NumberField extends FormElement {
    static defaultProps = {
        inline: false,
        attrs: {},
        className: '',
        value: '',
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={this.props.inline ? 'form-inline' : 'form-group'}>
                <label htmlFor={this.props.name}>{this.props.text}:</label>

                <input
                    type='number'
                    autoComplete='off'
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    name={this.props.name}
                    value={this.props.value}
                    className={'form-control1 ' + this.props.className}
                    placeholder={this.props.placeholder}
                    onChange={this.props.changeHandler}
                    {...this.props.attrs} />

                {[undefined, null].indexOf(this.props.children) == -1 &&
                    this.props.children
                }
            </div>
        );
    }
}