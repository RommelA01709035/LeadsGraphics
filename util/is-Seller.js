/* Middlware que se ejecuta cuando el rol es de Seller */

module.exports = (request, response, next) => {
    let isSeller = false;
    for(let rol of request.session.roles){
        if(rol.Accion == 'Consultar grafica' || 
            rol.Accion == 'Autenticarse' || 
            rol.Accion == 'Descargar reporte' ||
            rol.Accion == 'Cargar CSV' || 
            rol.Accion == 'Cambiar contraseña' ||
            rol.Accion == 'Modificar Lead' ||
            rol.Accion == 'Recuperar contraseña' ||
            rol.Accion == 'Consultar Lead'
        ){
            isSeller = true;
            break;
        }
    }
    if (isSeller) {
        next();
    } else {
        return response.redirect('/logout');
    }
}