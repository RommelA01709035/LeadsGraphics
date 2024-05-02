/* Middlware que se ejecuta cuando el rol es de Admin */

module.exports = (request, response, next) => {
    let isAdmin = false;
    for(let rol of request.session.roles){
        if(rol.Accion == 'Admin'){
            isAdmin = true;
            break;
        }
    }
    if (isAdmin) {
        console.log('Soy admin');
        next();
    } else {
        return response.redirect('/logout');
    }
}