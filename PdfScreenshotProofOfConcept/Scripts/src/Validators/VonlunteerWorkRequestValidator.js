import { checkString, getToday } from "../helpers";
import ValidationError from "./ValidationError";

export default class VolunteerWorkRequestValidator {
    constructor() {
        this.errors = [];
    }

    _addError(name, message) {
        this.errors.push(new ValidationError(name, message));
    }

    /**
     * Validate the given object state. Return true if valid, else false.
     * 
     * @param {object} data
     * @retuns {bool}
     */
    validate(data) {
        this.errors.length = 0;

        if (!checkString(data._employeeName, 5)) {
            this._addError('_employeeName', 'The employee name field is invalid.')
        }

        if (!checkString(data._eventName, 5)) {
            this._addError('_eventName', 'The event name field is invalid.')
        }

        if (!checkString(data._hoursWorked)) {
            this._addError('_hoursWorked', 'The hours worked field is invalid.')
        }

        if ([1, 2, 2.5, 3, 3.5, 4].indexOf(data._hoursRequested) == -1) {
            this._addError('_hoursRequested', 'Valid "Hours Requested" options are: 1, 2, 2.5, 3, 3.5, or 4.');
        }

        if (!checkString(data._employeeSignature, 5, 50)) {
            this._addError('_employeeSignature', 'The employee signature must be between 5 and 50 characters long.');
        }

        if (data._signatureDate != getToday()) {
            this._addError('_signatureDate', 'The employee signature date must be today.')
        }

        if ([undefined, null].indexOf(data._marketingSignature) == -1 &&
            data._marketingSignature.trim() != '' &&
            !checkString(data._marketingSignature, 5, 50)) {
            this._addError(
                '_marketingSignature',
                'The marketing signature must be between 5 and 50 characters long, if provided.'
            )
        }

        if (data._marketingSignature != '' &&
            data._marketingSignatureDate != getToday()) {
            this._addError('_marketingSignatureDate', 'The marketing signature date must be today.');
        }

        if (!checkString(data._managerSignature, 5, 50)) {
            this._addError('_managerSignature', 'The manager signature must be between 5 and 50 characters long.')
        }

        
        if (data._managerSignatureDate != getToday()) {
            this._addError('_managerSignatureDate', 'The manager signature date must be today.')
        }

        return this.errors.length == 0;
    }
}