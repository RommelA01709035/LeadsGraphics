const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));


//Middleware
app.use((request, response, next) => {
  console.log('Middleware!');
  next(); 
});

app.get('/', (req, res) => {
  res.render('EliminarUsuarios'); 
});


const rutasUsuarios = require('./routes/users.routes');
app.use('/delete', rutasUsuarios);

app.listen(3000);