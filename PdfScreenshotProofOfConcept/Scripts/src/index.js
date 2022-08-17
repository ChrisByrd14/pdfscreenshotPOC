import React from 'react';
import ReactDOM from 'react-dom';

import VolunteerWorkRequest from './components/Forms/VolunteerWorkRequest';


const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});


var data = {
    _employeeSignature: "Employee",
    _signatureDate: "2022-08-18",
    _marketingSignature: "Marketing Representative Signature",
    _marketingSignatureDate: "2022-08-19",
    _managerSignature: "Manager/Supervisor Signature",
    _managerSignatureDate: "2022-08-20",
};

switch (params.form) {
    //case 'form2':
    //    ReactDOM.render(<Form2 showButton={true} />, document.getElementById('app'));
    //    break;
    default:
        ReactDOM.render(<VolunteerWorkRequest showButton={true} {...data} />, document.getElementById('app'));
        break;
}

