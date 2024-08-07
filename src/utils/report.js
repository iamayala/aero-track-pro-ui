/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import fontRegular from '../assets/fonts/sofia/sofia-pro-regular-az.otf';

export const reportHtmlForm = (bodyRowData, tableHeaders, docInfo) => {
  console.log();
  return `
  <html>
  <head>
    <style>
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        font-family: Arial, Helvetica, sans-serif;
      }
      @page {
        size: A4;
        margin: 0;
      }
      @font-face {
        font-family: 'Sofia-Pro';
        font-weight: normal;
        src: url(${fontRegular}) format('opentype');
      }
      body {
        width: 210mm;
        height: 297mm;
        margin: 0;
        padding: 20mm;
        background-color: #ffffff;
        font-family: 'Sofia-Pro';
      }
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 40px;
      }
      .logo {
        height: 100px;
        width: 250px;
        align-self: flex-end;
        background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/RwandAir_Logotype.png/1200px-RwandAir_Logotype.png");
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
     
      .table td {
        padding: 3px 10px 3px 30px;
        font-size: 10px;
      }
      .content {
        align-items: center;
        height: 80%;
      }
      .content h1 {
        font-size: 18px;
        text-align: center;
      }
      .page-details {
        justify-content: space-between;
        display: flex;
      }
      .page-details span {
        font-size: 10px;
      }
      .warning {
        text-align: center;
        font-size: 10px;
        color: #555;
      }
      .data-table {
        margin-bottom: 20px;
        width: 100%;
        border: none;
      }
      .data-table td {
        padding: 5px 10px;
        font-size: 10px;
        border-collapse: collapse;
      }
      .data-table,
      .data-table th,
      .data-table td {
        border-bottom: 0.1px solid #000;
        border-collapse: collapse;
      }
    </style>
  </head>

  <body>
    <div class="header">
      <div class="logo"></div>
      <div class="details">
        <table class="table">
          <tr>
            <td>Generated By</td>
            <td>${docInfo.generatedBy}</td>
          </tr>
          <tr>
            <td>Report Name</td>
            <td>${docInfo.title}</td>
          </tr>
          <tr>
            <td>Date</td>
            <td>${new Date().toISOString()}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="content">
      <h1>${docInfo.title}</h1>
      <table class="data-table">
        <thead>
          <tr>
            ${tableHeaders.map((column, index) => `<td style="font-weight: bold" key="${index}">${column.toUpperCase()}</td>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${bodyRowData
            .map(
              (item, index) => `
                <tr key="${index}">
                    ${Object.entries(item)
                      .map(([key, value]) => `<td key="${key + value}">${value ?? '-'}</td>`)
                      .join('')}
                </tr>`
            )
            .join('')}
        </tbody>
      </table>
    </div>
    <div class="footer">
      <div class="page-details">
        <span>Generated on ${new Date().toISOString()}</span>
      </div>
      <p class="warning">
        **Confidentiality Warning:** This document contains confidential information intended solely
        for the recipient(s) mentioned above. If you are not the intended recipient, please notify
        us immediately and delete this document from your system. Unauthorized access, distribution,
        or copying of this document is strictly prohibited. The views and opinions expressed within
        this document are those of the author and do not necessarily reflect the views of the
        organization. Thank you for your understanding and cooperation in maintaining the
        confidentiality of this information.
      </p>
    </div>
  </body>
</html>  
`;
};
