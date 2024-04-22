const fs = require('fs'); 
const puppeteer = require('puppeteer');
const ejs = require('ejs');

exports.post_reporte = async (req, res) => {
  try {
    const { data, opcion, caso, titulo, average, maximo, minimo, registers } = req.body;

    // Renderizar la plantilla EJS con los datos
    const html = ejs.render(fs.readFileSync(__dirname + '/../views/reporte.ejs', 'utf8'), {
      data,
      opcion,
      caso,
      titulo,
      average,
      maximo,
      minimo,
      registers
    });
    

    // Lanzar una instancia de Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Establecer el contenido HTML en la página
    await page.setContent(html);

    // Generar el PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    // Cerrar el navegador
    await browser.close();

    // Establecer encabezados para descargar el PDF
    const filename = 'reporte.pdf';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Enviar el PDF como respuesta
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Error al generar el reporte en PDF:', error);
    res.status(500).send('Error al generar el reporte en PDF');
  }
};
