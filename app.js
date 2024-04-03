const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
  console.log('Middleware!');
  next(); 
});

const inicioRoutes = require('./routes/inicio.routes');
app.use('/', inicioRoutes);

// Te redirige a la página normal si hay error
app.use((request, response, next) => {
    response.redirect('/login');
});

app.listen(3000)