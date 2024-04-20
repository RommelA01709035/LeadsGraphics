const PDFDocument = require('pdfkit');

exports.downloadPDF = (request, response, next) => {
    const doc = new PDFDocument();
    
    response.setHeader('Content-Disposition', 'attachment; filename="reporte.pdf"');
    
    doc.pipe(response);
    doc.fontSize(20).text('Reporte PDF', { align: 'center' });
    doc.fontSize(12).text('Contenido del PDF aquí...', { align: 'left' });

    doc.end();
};