const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');



app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 

  //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  resave: false,

  //Asegura que no se guarde una sesión para una petición que no lo necesita
  saveUninitialized: false,
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Instalar paquete multer para manejar archivos desde node
const multer = require('multer');

// Middleware para manejar subida de archivos
const fileStorage = multer.diskStorage({
  destination: (request, file, callback) => {

    // Directorio donde se suben los archivos
    callback(null, 'public/uploads');
  },
  filename: (request, file, callback) => {

    // Nombre del archivo al subirse al servidor, evitar que el nombre se repita
    callback(null, Date.now() + file.originalname);
  },
});


// Limitar el tipo de archivos que se pueden subir
const csvFilter = (request, file, callback) => {
  if(file.mimetype == 'text/csv'){

    // Aceptar el archivo
    callback(null, true);
  } else {

    // Rechazar archivo y almacenar el error
    callback(null, false);
  }
};

// Middleware para manejar subida de archivos con filtro para archivos .csv
app.use(multer({ storage: fileStorage, fileFilter: csvFilter }).single('csvFile')); 

const Swal = require('sweetalert2');

//Agregar protección contra ataques de CSRF
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');

  //Le permite a la petición avanzar hacia el siguiente middleware
  next();
});

// Importar rutas
const rutaLogin = require('./routes/login.routes');
const rutaInicio = require('./routes/inicio.routes');
const rutaGrafica = require('./routes/grafica.routes');
const rutaLeads = require('./routes/leads.routes');
const rutaUsuarios = require('./routes/usuario.routes');
const rutaHistorial = require('./routes/historial.routes');

// Usar las rutas
app.use('/', rutaLogin);
app.use('/homepage', rutaInicio);
app.use('/', rutaGrafica);
app.use('/importar', rutaLeads);
app.use('/usuarios', rutaUsuarios);
app.use('/historial', rutaHistorial);


app.listen(8081);
