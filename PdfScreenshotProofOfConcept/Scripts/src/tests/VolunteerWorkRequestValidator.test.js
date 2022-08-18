import VolunteerWorkRequestValidator from "../Validators/VonlunteerWorkRequestValidator";

function getData(data={}) {
    data = {
        _employeeName: 'Some Employee',
        _eventName: 'Some Football Game',
        _hoursWorked: '8/20 7pm to 8/20 9:30pm',
        _hoursRequested: 3.5,
        _employeeSignature: 'Some Employee',
        _signatureDate: '2022-08-18',
        _marketingSignature: 'Marketing Employee',
        _marketingSignatureDate: '2022-08-18',
        _managerSignature: 'Manager',
        _managerSignatureDate: '2022-08-19',
        ...data,
    }

    return data;
}

const EMPTY_STRINGS = [undefined, null, '', '  '];

describe('VolunteerWorkRequestValidator returns', () => {
    var val = new VolunteerWorkRequestValidator();

    test.each([...EMPTY_STRINGS, 'abcd'])('false if given empty employee name', (_employeeName) => {
        expect(val.validate(getData({ _employeeName }))).toBe(false);
        expect(val.errors[0].name).toBe('_employeeName');
        expect(val.errors[0].message).toBe('The employee name field is invalid.');
    });

    test.each([...EMPTY_STRINGS, 'abcd'])('false if given empty event name', (_eventName) => {
        expect(val.validate(getData({ _eventName }))).toBe(false);
        expect(val.errors[0].name).toBe('_eventName');
        expect(val.errors[0].message).toBe('The event name field is invalid.');
    });

    test.each([...EMPTY_STRINGS, 'abcd'])('false if given empty event name', (_eventName) => {
        expect(val.validate(getData({ _eventName }))).toBe(false);
        expect(val.errors[0].name).toBe('_eventName');
        expect(val.errors[0].message).toBe('The event name field is invalid.');
    });

    test.each(EMPTY_STRINGS)('false if given hours worked is empty', (_hoursWorked) => {
        expect(val.validate(getData({ _hoursWorked }))).toBe(false);
        expect(val.errors[0].name).toBe('_hoursWorked');
        expect(val.errors[0].message).toBe('The hours worked field is invalid.');
    });

    test.each([...EMPTY_STRINGS, 0.5, 1.5, 0.25, 4.5, 10])('false if hours requested is invalid', (_hoursRequested) => {
        expect(val.validate(getData({ _hoursRequested }))).toBe(false);
        expect(val.errors[0].name).toBe('_hoursRequested');
        expect(val.errors[0].message).toBe('Valid "Hours Requested" options are: 1, 2, 2.5, 3, 3.5, or 4.');
    });

    test.each([...EMPTY_STRINGS, 'abcd'])('false if employee signature is invalid', (_employeeSignature) => {
        expect(val.validate(getData({ _employeeSignature }))).toBe(false);
        expect(val.errors[0].name).toBe('_employeeSignature');
        expect(val.errors[0].message).toBe('The employee signature must be between 5 and 50 characters long.');
    });

    test.each(['2022-01-01', '2099-01-01'])('false if employee signature date is not today', (_signatureDate) => {
        expect(val.validate(getData({ _signatureDate }))).toBe(false);
        expect(val.errors[0].name).toBe('_signatureDate');
        expect(val.errors[0].message).toBe('The employee signature date must be today.');
    });

    test('false if marketing signature is invalid.', () => {
        expect(val.validate(getData({ _marketingSignature: 'abcd' }))).toBe(false);
        expect(val.errors[0].name).toBe('_marketingSignature');
        expect(val.errors[0].message)
            .toBe('The marketing signature must be between 5 and 50 characters long, if provided.');
    });

    test('false if marketing signature date is not today.', () => {
        expect(val.validate(getData({ _marketingSignatureDate: '2022-01-01' }))).toBe(false);
        expect(val.errors[0].name).toBe('_marketingSignatureDate');
        expect(val.errors[0].message)
            .toBe('The marketing signature date must be today.');
    });
});