/* Middlware que se ejecuta cuando el rol es de Owner */

module.exports = (request, response, next) => {
    let isOwner = false;
    for(let rol of request.session.roles){
        if(rol.Accion == 'Owner'){
            isOwner = true;
            break;
        }
    }
    if (isOwner) {
        next();
    } else {
        return response.redirect('/logout');
    }
}