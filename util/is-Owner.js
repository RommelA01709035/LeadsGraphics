/* Middlware que se ejecuta cuando el rol es de Owner */

module.exports = (request, response, next) => {
    let isOwner = false;
    for(let rol of request.session.roles){
        if(rol.Accion == 'Consultar grafica' || 
            rol.Accion == 'Consultar reportes' || 
            rol.Accion == 'Autenticarse' || 
            rol.Accion == 'Descargar reporte' ||
            rol.Accion == 'Cargar CSV' || 
            rol.Accion == 'Registrar usuario' ||
            rol.Accion == 'Eliminar usuarios' ||
            rol.Accion == 'Asigna seller' ||
            rol.Accion == 'Asigna roles' ||
            rol.Accion == 'Consultar historial' ||
            rol.Accion == 'Editar usuario' ||
            rol.Accion == 'Consultar usuario' ||
            rol.Accion == 'Cambiar contraseña' ||
            rol.Accion == 'Modificar Lead' ||
            rol.Accion == 'Recuperar contraseña' ||
            rol.Accion == 'Eliminar Lead' ||
            rol.Accion == 'Crear Lead' ||
            rol.Accion == 'Consultar Lead'
        ){
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