
/* import { modoActual, obtenerFavoritos } from "./helpers/OtrasFunsiones.js"; */
import { modoActual } from "./helpers/OtrasFunsiones.js";
import { obtenerCategorias } from "./ObtenerDatos/Categorias.js";


// Iniciar app
function iniciarApp() {
    modoActual();
    obtenerCategorias();
}


document.addEventListener('DOMContentLoaded', iniciarApp);
