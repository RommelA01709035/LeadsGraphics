/* Middlware que se ejecuta cuando el rol es de Seller */

module.exports = (request, response, next) => {
    let isSeller = false;
    for(let rol of request.session.roles){
        if(rol.Descripcion_Rol == 'Seller'){
            isSeller = true;
            break;
        }
    }
    if (isSeller) {
        console.log('Soy seller')
        next();
    } else {
        return response.redirect('/logout');
    }
}