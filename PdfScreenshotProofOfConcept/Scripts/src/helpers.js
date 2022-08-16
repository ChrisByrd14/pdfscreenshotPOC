import { jsPDF } from "jspdf";

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
     */
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
};

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

    var f = document.getElementById('file');
    f.files = container.files;
    if (f.files.length == 0) {
        return 'Unable to add the generated file to the file input.';
    }

    return null;
}