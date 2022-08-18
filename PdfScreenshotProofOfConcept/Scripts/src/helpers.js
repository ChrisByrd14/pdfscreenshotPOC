import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const DEBUG = true;


function log(message) {
    if (DEBUG) {
        console.log(message);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
export function base64toPDF(data) {
    var bufferArray = base64ToArrayBuffer(data);
    var blobStore = new Blob([bufferArray], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobStore);
        return;
    }
    var data = window.URL.createObjectURL(blobStore);
    return data;

    /*
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = data;
    link.download = "file.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
     *
}

export function base64ToArrayBuffer(data) {
    var bString = window.atob(data);
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
        var ascii = bString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
* /

/**
 * Generate a PDF file from the given canvas and save it to a file input element.
 * 
 * Returns a string error message on operation failure, else returns null.
 * @param {Canvas} canvas
 * @param {string} fileName
 * @returns {string}
 */
export function toPdf(canvas, fileName) {
    if (fileName.trim() == '') {
        alert('You must enter a filename.');
        return 'No file name provided.';
    }

    // only jpeg is supported by jsPDF
    var imgData = canvas.toDataURL("image/jpeg", 1.0);
    var pdf = new jsPDF();

    pdf.addImage(imgData, 'JPEG', 0, 0);
    //pdf.save("download.pdf"); // saves directly to browser
    var blob = pdf.output('blob');

    // creates File object and saves binary file to a file input
    let file = new File([blob], fileName + ".pdf", { type: "application/pdf", lastModified: new Date().getTime() });
    let container = new DataTransfer();
    container.items.add(file);

    var f = document.getElementsByName('file')[0];
    f.files = container.files;
    if (f.files.length == 0) {
        return 'Unable to add the generated file to the file input.';
    }

    return null;
}

export function submitForm(formId='form', formName='new-form', dataFormId='dataForm') {
    html2canvas(document.getElementById(formId))
        .then(function (canvas) {
            console.log('converting');
            var result = toPdf(canvas, formName);
            console.log('result', result);
            if (result != null) {
                throw new Error(result);
            }
        })
        .then((e) => {
            var fileElement = document.getElementsByName('file')[0];

            var count = 0;

            do {
                if (count == 5) break; // break potential endles loop
                sleep(250);
                count += 1;
            } while (fileElement.files.length == 0);

            document.getElementById(dataFormId).submit();
            //setTimeout(() => document.getElementById(dataFormId).submit(), 250);
        })
        .catch((e) => {
            alert('An error occurred ' + e);
        });
}

/*
 * Validation helpers
 */

/**
 * Check that the given string is not empty undefined/null and its length is within the length parameters.
 * @param {any} subject
 * @param {any} minLength
 * @param {any} maxLength
 * @returns {boolean}
 */
export function checkString(subject, minLength = 1, maxLength = 999) {
    if ([undefined, null].indexOf(subject) != -1) {
        return false;
    }

    var trimmed = subject.trim();

    if (minLength > 0 && trimmed == '') {
        return false;
    }

    return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Returns true if the given date is valid and in the future.
 * @param {any} date
 * @returns {boolean}
 */
export function futureDate(date) {
    try {
        return new Date() < new Date(date);
    }
    catch {
        return false;
    }
}

/**
 * Returns true if the given date is valid and in the past.
 * @param {any} date
 * @returns {boolean}
 */
export function pastDate(date) {
    try {
        return new Date() > new Date(date);
    }
    catch {
        return false;
    }
}

export function addError(message, element) {
    alert(message);
    var e = document.getElementsByName(element)[0];
    e.classList.add("has-error");
}

export function getToday() {
    return new Date().toJSON().substring(0, 10);
}