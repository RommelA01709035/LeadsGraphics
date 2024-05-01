/* Middlware que se ejecuta cuando el rol es de Owner */

module.exports = (request, response, next) => {
    let isOwner = false;
    for(let rol of request.session.roles){
        if(rol.Descripcion_Rol == 'Owner'){
            isOwner = true;
        }
    }
    if (isOwner) {
        next();
    } else {
        return response.redirect('/logout');
    }
}