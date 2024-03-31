const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection); 

app.use((request, response, next) => {
  console.log('Middleware!');
  next();
});

// Ruta para la página que muestra la lista de usuarios
const usuariosController = require('./controllers/usuariosController'); // Asumiendo que tienes un controlador para la gestión de usuarios
app.get('/usuarios', usuariosController.mostrarUsuarios);

// Ruta para manejar la eliminación de usuarios
app.post('/eliminar-usuario', usuariosController.eliminarUsuario);

app.use((request, response, next) => {
  response.status(404);
  response.sendFile(
    path.join(__dirname, 'views', '404.html')
  );
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});