import React, { Component } from 'react';

import html2canvas from 'html2canvas';
import { toPdf } from '../helpers';
import Field from './Field';


export default class Foo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            foo: '',
            foo2: '',
            foo3: '',
            foo4: '',
            fileName: '',
            showButton: true,
            file: '',
            ...props,
        };

        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.takeSnapshot = this.takeSnapshot.bind(this);
    }

    handleChange(e) {
        var x = {};
        x[e.target.name] = e.target.value;
        this.setState(x);
    }

    async submitForm(e) {
        let self = this;
        document.getElementById('buttonContainer').hidden = true;
        await this.takeSnapshot(self);
        document.getElementById('buttonContainer').hidden = false;
    }

    async takeSnapshot(s) {
        html2canvas(document.getElementById('app'))
            .then(function (canvas) {
                var result = toPdf(canvas, s.state.fileName);
                if (result != null) {
                    throw new Error(result);
                }
            })
            .then((e) => {
                console.log('then e', e);
                setTimeout(() => document.getElementById('theForm').submit(), 250);
            })
            .catch((e) => {
                console.log('catch e', e);
            });
    }

    render() {
        return (
            <>
                <h1>This is the main header</h1>
                <form id='theForm' method='post' action='/Home/PostData' encType='multipart/form-data'>
                    <input id='file' type='file' name='file' style={{ 'display': 'none' }} />
                    <input type='text' name='fooValue' value={this.state.foo} hidden />
                    <input type='text' name='foo2Value' value={this.state.foo2} hidden />
                    <input type='text' name='foo3Value' value={this.state.foo3} hidden />
                    <input type='text' name='foo4Value' value={this.state.foo4} hidden />
                </form>

                <div id='theForm' className=''>
                    <Field name="fileName" text="File Name" changeHandler={this.handleChange} />
                    <Field name="foo" text="Field 1" changeHandler={this.handleChange} />
                    <Field name="foo2" text="Field 2" changeHandler={this.handleChange} />
                    <Field name="foo3" text="Field 3" changeHandler={this.handleChange} />
                    <Field name="foo4" text="Field 4" changeHandler={this.handleChange} />

                    {/*<div className='form-group'>*/}
                    {/*    <label htmlFor='fileName'>File Name:</label>*/}
                    {/*    <input type='text' name='fileName' className='form-control' onChange={this.handleChange} />*/}
                    {/*</div>*/}

                    {/*<div className='form-group'>*/}
                    {/*    <label htmlFor='foo'>Foo:</label>*/}
                    {/*    <input type='text' name='foo' className='form-control' onChange={this.handleChange} />*/}
                    {/*</div>*/}

                    {/*<div className='form-group'>*/}
                    {/*    <label htmlFor='foo2'>Foo 2:</label>*/}
                    {/*    <input type='text' name='foo2' className='form-control' onChange={this.handleChange} />*/}
                    {/*</div>*/}

                    {/*<div className='form-group'>*/}
                    {/*    <label htmlFor='foo3'>Foo 3:</label>*/}
                    {/*    <input type='text' name='foo3' className='form-control' onChange={this.handleChange} />*/}
                    {/*</div>*/}

                    {/*<div className='form-group'>*/}
                    {/*    <label htmlFor='foo4'>Foo 4:</label>*/}
                    {/*    <input type='text' name='foo4' className='form-control' onChange={ this.handleChange } />*/}
                    {/*</div>*/}
                </div>

                <div id='buttonContainer' className="container">
                    {this.props.showButton &&
                        <button className="btn btn-success" onClick={this.submitForm}>Submit</button>
                    }

                    {/*{this.state.downloadLink &&*/}
                    {/*    <a href={this.state.downloadLink} className="btn btn-primary">Download Image</a>*/}
                    {/*}*/}
                </div>
            </>
        )
    }
}