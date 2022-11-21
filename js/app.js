
/* import { modoActual, obtenerFavoritos } from "./helpers/OtrasFunsiones.js"; */
import { modoActual } from "./helpers/OtrasFunsiones.js";
import { obtenerCategorias } from "./ObtenerDatos/Categorias.js";


// Iniciar app
function iniciarApp() {
    obtenerCategorias();
    modoActual();
    //solo mostrar en favoritos.html
    /* if( document.querySelector('.favoritos') ) {
        obtenerFavoritos();
    } */
}


document.addEventListener('DOMContentLoaded', iniciarApp);
