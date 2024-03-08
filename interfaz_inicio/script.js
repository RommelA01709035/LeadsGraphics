function validarInicioSesion() {
    var usuario = document.getElementById("usuarioInput").value;
    var contrasena = document.getElementById("contrasenaInput").value;
    var mensajeElemento = document.getElementById("mensajeInicioSesion");

    if (contrasena == "lead") {
      mensajeElemento.innerHTML = "¡Bienvenido a LeadGraphs!";
      mensajeElemento.style.color = "green";
      return false; // Esta línea permite enviar el formulario (Se deja en false para que no se "regargue")
    } else {
      mensajeElemento.innerHTML = "Usuario o contraseña incorrectos.";
      mensajeElemento.style.color = "red";
      return false;
    }
  }
  
  