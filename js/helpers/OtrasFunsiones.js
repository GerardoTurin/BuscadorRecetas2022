import { mostrarRecetas } from "../ObtenerDatos/Categorias.js";

// Variable para controlar la transicion 
let first = true;

// Div donde se mostrarán los favoritos
const favoritosDiv = document.querySelector('.favoritos');

// Dark Mode
const btnSwitch = document.querySelector('#switch');

// nav bg.secondary -> bg-dark
const nav = document.querySelector('.navbar');

const slider = document.querySelector('.slider');

//const footer = document.querySelector('footer');


btnSwitch.addEventListener('click', () => {
    //si first es false, establecemos la transición a 0.4s
    //establecemos first a true para que no vuelva a entrar a la
    //condicion
    !first ?
    [document.body.style.transition="0.4s",
    nav.style.transition="0.4s",first=true]:null;

    document.body.style.transition="0.4s";
    nav.style.transition="0.4s";


    document.body.classList.toggle('dark');
    nav.classList.toggle('dark-mode');
    
    
    // Guardamos el modo en localstorage
    if( document.body.classList.contains('dark') ) {
        localStorage.setItem('dark-mode', 'true');
    } else {
        localStorage.setItem('dark-mode', 'false');
    }
});


// Obtenemos el modo actual funcion
const modoActual = () => {
    if( localStorage.getItem('dark-mode') === 'true' ) {
        btnSwitch.checked = true;
        nav.classList.add('dark-mode');
        document.body.classList.add('dark');
        slider.style.transition="0s";
        slider.style.setProperty('--transition-slider', '0s');
        
        
    } else {
        nav.classList.remove('dark-mode');
        document.body.classList.remove('dark');
    }
    

    // si se recarga la pagina, se establece la transicion a 0s
    // para que no se vea la transicion
    setTimeout(() => {
        slider.style.setProperty('--transition-slider', '0.4s');
        slider.style.transition="0.4s";
    }, 1000);


    //hacemos visible el cuerpo del documento inmediatamente despues
    //de establecer el modo obscuro o claro;
    document.body.style.opacity="1";
}



/*   Socials Items - Hover  */
const socials = document.querySelectorAll('.socials-item');




// Limpiar HTML
const limpiarHTML = (selector) => {
    while(selector.firstChild) {
        selector.removeChild(selector.firstChild);
    }
}


// Mostrar Toast
const mostrarToast = ( mensaje, clase ) => {
    const toastDiv = document.querySelector('#toast');
    const toastBody = document.querySelector('.toast-body');
    const toastHeader = document.querySelector('#toastHeader');
    toastBody.classList.add('fw-semibold');
    toastHeader.classList.add(clase);

    if( toastHeader.classList.contains('bg-priamry') ) {
        toastHeader.classList.remove('bg-priamry');
        toastHeader.classList.add(clase);

    } else if( toastHeader.classList.contains('bg-danger') ) {
        toastHeader.classList.remove('bg-danger');
        toastHeader.classList.add(clase);
    }

    
    const toast = new bootstrap.Toast(toastDiv);    // Creamos una instancia de Toast
    toastBody.classList.add('text-dark');
    toastBody.textContent = mensaje;

    toast.show();   // Mostramos el Toast
}





// Guardar Favorito
const guardarFavorito = ( receta ) => {
    const favoritos = JSON.parse( localStorage.getItem('favoritos') ) || [];
    localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta])); // Tomamos una copia del arreglo de favoritos y le agregamos la nueva receta

    if(favoritosDiv) {
        const nuevosFavoritos = JSON.parse( localStorage.getItem('favoritos') );

        limpiarHTML(favoritosDiv);
        mostrarRecetas(nuevosFavoritos);
    }
}



// Existe en Favoritos
const existeFavorito = ( id ) => {
    const favoritos = JSON.parse( localStorage.getItem('favoritos') ) || [];
    return favoritos.some( favorito => favorito.id === id ); // Si existe alguno que tenga el mismo id, regresa true.
}


// Eliminar Favorito
const eliminarFavorito = ( id ) => {
    const favoritos = JSON.parse( localStorage.getItem('favoritos') ) || [];
    const nuevosFavoritos = favoritos.filter( favorito => favorito.id !== id );  // Filtramos el arreglo de favoritos y regresamos todos los que no tengan el mismo id.

    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    
    if( favoritosDiv ) {
        limpiarHTML(favoritosDiv);
        mostrarRecetas(nuevosFavoritos);
        obtenerFavoritos(favoritos);
    }
}



// Obtenemos Favoritos
const obtenerFavoritos = () => {
    const favoritos = JSON.parse( localStorage.getItem('favoritos') ) ?? [];
    if( favoritos.length ) {
        mostrarRecetas(favoritos);
    } else {
        const nullFavoritos = document.createElement('p');
        nullFavoritos.classList.add('text-center', 'fw-bold', 'fs-4', 'mt-5');
        nullFavoritos.textContent = 'No hay favoritos';
        favoritosDiv.appendChild(nullFavoritos);
    }
}


if( favoritosDiv ) {
    obtenerFavoritos();
}









export {
    limpiarHTML,
    guardarFavorito,
    existeFavorito,
    eliminarFavorito,
    mostrarToast,
    obtenerFavoritos,
    modoActual
}