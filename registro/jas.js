let modoLogin = true;

  function cambiarModo() {
    modoLogin = !modoLogin;

    document.getElementById("titulo").textContent = 
      modoLogin ? "Iniciar Sesión" : "Crear Cuenta";

    document.querySelector("button").textContent = 
      modoLogin ? "Entrar" : "Registrarse";

    document.getElementById("extra").style.display = 
      modoLogin ? "none" : "block";

    document.querySelector(".toggle").textContent = 
      modoLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión";
  }

  function accion() {
    if (modoLogin) {
      alert("Intentando iniciar sesión...");
    } else {
      alert("Registrando usuario...");
    }
  }