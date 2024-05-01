/* Middlware que se ejecuta cuando el rol es de Admin */

module.exports = (request, response, next) => {
    let isAdmin = false;
    for(let rol of request.session.roles){
        if(rol.Descripcion_Rol == 'Admin'){
            isAdmin = true;
        }
    }
    if (isAdmin) {
        next();
    } else {
        return response.redirect('/logout');
    }
}