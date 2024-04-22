// Middelware para proteger las rutas

module.exports = (request, response, next) => {

    // Si la variable isLoggedIn no se encuentra
    if (!request.session.isLoggedIn) { 
        return response.redirect('/login');
    }
    next();
}