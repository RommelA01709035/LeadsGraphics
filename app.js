const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const session = require('express-session');

app.use(session({
  secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
  resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
  saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const Swal = require('sweetalert2')

//Agregar protección contra ataques de CSRF
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection);

//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

const rutaLogin = require('./routes/login.routes');
app.use('/', rutaLogin);

const rutaInicio = require('./routes/inicio.routes');
app.use('/homepage', rutaInicio);

const rutaGrafica = require('./routes/grafica.routes');
app.use('/', rutaGrafica);

const rutaLeads = require('./routes/leads.routes');
app.use('/', rutaLeads);

const rutaUsuarios = require('./routes/usuario.routes');
app.use('/', rutaUsuarios);

const rutaRegistro = require('./routes/registro.routes');
app.use('/', rutaRegistro);

app.listen(3000);