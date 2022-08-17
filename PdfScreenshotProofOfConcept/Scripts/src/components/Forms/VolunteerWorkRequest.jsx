import React, { Component } from "react";
import { DateField, NumberField, TextField } from "../FormElements";

import "../../styles/form";
import "../../styles/utilities";
import { addError, checkString, submitForm } from "../../helpers";

const INPUT_HEIGHT = {
    'style': {
        'height': '20px',
    },
}

const SIGNATURE_STYLES = {
    'style': {
        'maxWidth': '350px',
        'width': '100%',
    },
};

export default class VolunteerWorkRequest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _requestDate: '',
            _employeeName: '',
            _eventName: '',
            _hoursWorked: '',
            _hoursRequested: '',
            _employeeSignature: '',
            _signatureDate: '',
            _marketingSignature: '',
            _marketingSignatureDate: '',
            _managerSignature: '',
            _managerSignatureDate: '',
            ...props,
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    changeHandler(e) {
        var target = e.target;
        console.log({ [target.name]: target.value });
        this.setState({ [target.name]: target.value });
    }

    getFormName() {
        return 'Volunteer Work Request';
    }

    clearErrors() {
        var elements = document.getElementsByTagName('input');

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            //if (el.classList.contains('has-error')) {
            el.classList.remove('has-error');
            //}
        }
    }

    validate() {
        if (!checkString(this.state.employeeName)) {
            addError('The employee name field is invalid.', '_employeeName')
            return false;
        }

        if ([1, 2, 2.5, 3, 3.5, 4].indexOf(this.state.hoursRequested)) {
            addError('Valid "Hours Requested" options are: 1, 2, 2.5, 3, 3.5, or 4', '_hoursRequested');
            return false;
        }

        // TODO: implement
        return true
    }

    submit() {
        this.clearErrors();

        if (!this.validate()) {
            return;
        }

        //var sigs = document.getElementsByClassName('signature');
        //var sigDates = document.getElementsByClassName('signatureDates');
        //for (var i = 0; i < sigs.length; i++) {
        //    sigs[i].style.paddingTop = '10px';
        //    sigDates[i].style.paddingTop = '10px';
        //}

        submitForm('form', 'Volunteer Work Request', 'dataForm');
    }

    render() {
        return (
            <div id='form'>
                <form id='dataForm' method='post' action='/Home/PostData' encType='multipart/form-data'>
                    
                    <input id='file' type='file' name='file' style={{ 'display': 'none' }}/>
                    <input type='text' name='requestDate' value={this.state._requestDate} hidden />
                    <input type='text' name='employeeName' value={this.state._employeeName} hidden />
                    <input type='text' name='eventName' value={this.state._eventName} hidden />
                    <input type='text' name='hoursWorked' value={this.state._hoursWorked} hidden />
                    <input type='text' name='hoursRequested' value={this.state._hoursRequested} hidden />
                    <input type='text' name='employeeSignature' value={this.state._employeeSignature} hidden />
                    <input type='text' name='signatureDate' value={this.state._signatureDate} hidden />
                    <input type='text' name='marketingSignature' value={this.state._marketingSignature} hidden />
                    <input type='text' name='marketingSignatureDate' value={this.state._marketingSignatureDate} hidden />
                    <input type='text' name='managerSignature' value={this.state._managerSignature} hidden />
                    <input type='text' name='managerSignatureDate' value={this.state._managerSignatureDate} hidden />
                </form>
                <div className='page'>
                    <h2 className="text-center">Volunteer Work Request Form</h2>

                    <p>
                        Employees must complete the voluneer work request form and submit to
                        his/her supervisor to request volunteer hours for participating in
                        an event organized or sponsored by RRCU. The supervisor should
                        consult with Human Resources with any questions or concerns before
                        approving or denying the request. Approval is at the discretion of
                        the employee's supervisor and HR.
                    </p>

                    <p>Examples of volunteer work:</p>
                    <ul>
                        <li>Marketing request volunteers to participate in a credit union event</li>
                        <li>Working the concession stand at a RRCU high school kiosk.</li>
                        <li>Branch participates in a community event</li>
                    </ul>

                    <hr />

                    <DateField
                        name='_requestDate'
                        text='Date of request'
                        inline={true}
                        className='ml-3'
                        attrs={{ 'value': new Date().toJSON().substring(0, 10), ...INPUT_HEIGHT }}
                        changeHandler={this.changeHandler} />

                    <TextField
                        name='_employeeName'
                        inline={true}
                        text='Employee name'
                        className='ml-3'
                        attrs={INPUT_HEIGHT}
                        value={this.state._employeeName}
                        changeHandler={this.changeHandler} />

                    <TextField
                        name='_eventName'
                        inline={true}
                        className='ml-3'
                        text='Name of Credit Union Event'
                        attrs={{ 'size': 50, ...INPUT_HEIGHT }}
                        changeHandler={this.changeHandler} />

                    <TextField
                        name='_hoursWorked'
                        inline={true}
                        className='ml-3'
                        text='Date and time (hours worked)'
                        attrs={{ 'size': 50, ...INPUT_HEIGHT }}
                        changeHandler={this.changeHandler} />

                    <NumberField
                        name='_hoursRequested'
                        inline={true}
                        className='ml-3'
                        text='Total number of hours requested'
                        changeHandler={this.changeHandler}
                        min={1}
                        max={4}
                        step={0.5}
                        attrs={INPUT_HEIGHT}>
                        <ul>
                            <li>Hours are earned by working 1 hour for 1 hour of personal leave</li>
                            <li>Leave may be earned in half hour increments after 2 hour minimum</li>
                            <li>You may earn up to 4 hours TOTAL of personal leave per quarter</li>
                        </ul>
                    </NumberField>

                    <p className='mt-5'>
                        I certify that the information provided is complete and correct to
                        the best of my knowledge. By signing below, I verify that the
                        volunteer efforts and recipient organization meet RREFCU's volunteer
                        work guildelines.
                    </p>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <TextField
                                    name="_employeeSignature"
                                    className='signature'
                                    value={this.state._employeeSignature}
                                    changeHandler={this.changeHandler}
                                    attrs={SIGNATURE_STYLES}>
                                    <span className='under-element ml-2'>Employee Signature</span>
                                </TextField>
                            </div>
                            <div className='col-md-2 col-md-offset-0'>
                                <DateField
                                    name='_signatureDate'
                                    className="signatureDates"
                                    value={this.state._signatureDate}
                                    changeHandler={this.changeHandler}
                                    attrs={{ 'style': { 'height': '37.8px', ...SIGNATURE_STYLES['style'] } }}>
                                    <span className='under-element ml-2'>Date</span>
                                </DateField>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <TextField
                                    name="_marketingSignature"
                                    className='signature'
                                    value={this.state._marketingSignature}
                                    changeHandler={this.changeHandler}
                                    attrs={SIGNATURE_STYLES}>
                                    <span className='under-element ml-2'>Marketing Rep. Signature <em>(if applicable)</em></span>
                                </TextField>
                            </div>
                            <div className='col-md-2 col-md-offset-0'>
                                <DateField
                                    name='_marketingSignatureDate'
                                    className="signatureDates"
                                    value={this.state._marketingSignatureDate}
                                    changeHandler={this.changeHandler}
                                    attrs={{ 'style': { 'height': '37.8px', ...SIGNATURE_STYLES['style'] } }}>
                                    <span className='under-element ml-2'>Date</span>
                                </DateField>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-4'>
                                <TextField
                                    name="_managerSignature"
                                    className='signature'
                                    value={this.state._managerSignature}
                                    changeHandler={this.changeHandler}
                                    attrs={SIGNATURE_STYLES}>
                                    <span className='under-element ml-2'>Manager (Supervisor) Signature</span>
                                </TextField>
                            </div>
                            <div className='col-md-2 col-md-offset-0'>
                                <DateField
                                    name='_managerSignatureDate'
                                    className="signatureDates"
                                    value={this.state._managerSignatureDate}
                                    changeHandler={this.changeHandler}
                                    attrs={{ 'style': { 'height': '37.8px', ...SIGNATURE_STYLES['style'] } }}>
                                    <span className='under-element ml-2'>Date</span>
                                </DateField>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <p>
                            Volunteer work may not be used for organizations that discriminate based
                            on race, color, age, gender, religious creed, veteran status, marital
                            status, sexual orientation, pregnancy, childbirth, national origin or
                            ancestry, physical or mental disability, medical condition or genetic
                            information, or political affiliation.
                        </p>
                    </div>

                </div>

                <button className='btn btn-success pull-right' onClick={this.submit}>Submit</button>
            </div>
        );
    }
}