
import { obtenerFavoritos } from "./helpers/OtrasFunsiones.js";
import { obtenerCategorias } from "./ObtenerDatos/Categorias.js";


// Iniciar app
function iniciarApp() {
    obtenerCategorias();
    //solo mostrar en favoritos.html
    /* if( document.querySelector('.favoritos') ) {
        obtenerFavoritos();
    } */
}


document.addEventListener('DOMContentLoaded', iniciarApp);
