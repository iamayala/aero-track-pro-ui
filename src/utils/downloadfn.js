import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const downloadPdfDocument = (html_string, fileName) => {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  setTimeout(function () {
    var iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    iframedoc.body.innerHTML = html_string;
    html2canvas(iframedoc.body).then((canvas) => {
      const imageData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const pdfWidth = 210;
      const pdfHeight = 297;
      pdf.addImage(imageData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(fileName ? fileName + '.pdf' : 'document.pdf');
    });
  }, 10);
};
