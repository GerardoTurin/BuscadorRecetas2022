import { eliminarFavorito, existeFavorito, guardarFavorito, limpiarHTML, mostrarToast } from "../helpers/OtrasFunsiones.js";




// Selecionamos el select por su id
const selectCategorias = document.querySelector('#categorias');

// Div donde se mostrarán las recetas
const recetasDiv = document.querySelector('#resultado');

// Modal Receta
const modal = new bootstrap.Modal('#modal', {});




// Obtener Categorias fetch
const obtenerCategorias =  () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
    fetch(url)
    .then( respuesta => respuesta.json() )
    .then( resultado => mostrarCategorias( resultado.categories ) )
}

// Mostar Categorias
const mostrarCategorias = ( categorias = [] ) => {
    categorias.forEach( categoria => {
        // Crear option
        const option = document.createElement('option');
        
        // Desestructuring
        const { strCategory } = categoria;
        
        // Agregar el valor y texto del option
        option.value = strCategory;
        option.textContent = strCategory;

        if( selectCategorias ){
            // Agregar al select en el HTML
            selectCategorias.appendChild(option);
        }
    })
}

// Seleccionar Categoria
if( selectCategorias ){
    selectCategorias.addEventListener('change', evt => {
        const categoria = evt.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        
        fetch(url)
            .then( respuesta => respuesta.json() )
            .then( resultado => mostrarRecetas(resultado.meals) )
    });
}



// Mostrar Recetas
const mostrarRecetas = ( recetas = [] ) => {

    // Limpiar HTML antes de mostrar los resultados
    limpiarHTML(recetasDiv);

    // Si no hay recetas
    const noResultados = document.createElement('h2');
    noResultados.classList.add('text-center', 'text-black', 'my-5');
    noResultados.textContent = recetas.length ? 'Resultados' : 'No hay recetas encontradas';
    
    // si No estamos en index.html no mostrar el titulo
    if( !window.location.pathname.includes('index.html') ) {
        noResultados.classList.add('d-none');
    }
    recetasDiv.appendChild(noResultados);


    // Iterar sobre los resultados - scripting
    recetas.forEach( receta => {
        // Destructuring
        const { strMeal, strMealThumb, idMeal } = receta;
        
        // Crear el div
        const recetaContenedor = document.createElement('div');
        recetaContenedor.classList.add('col-md-4');
        
        // Receta Card
        const recetaCard = document.createElement('div');
        recetaCard.classList.add('card', 'mb-4', 'shadow-sm');

        // Receta Imagen
        const recetaImagen = document.createElement('img');
        recetaImagen.classList.add('card-img-top');
        recetaImagen.src = strMealThumb ?? receta.imagen;
        recetaImagen.alt = `Imagen de la receta ${strMeal ?? receta.nombre}`;

        
        // Receta Body
        const recetaBody = document.createElement('div');
        recetaBody.classList.add('card-body');

        // Receta Titulo
        const recetaTitulo = document.createElement('h3');
        recetaTitulo.classList.add('card-title', 'mb-3');
        recetaTitulo.textContent = strMeal ?? receta.nombre;

        // Receta Boton
        const recetaBoton = document.createElement('button');
        recetaBoton.classList.add('btn', 'btn-primary', 'w-100');
        recetaBoton.textContent = 'Ver Receta';
        
        recetaBoton.onclick = () => {
            seleccionarReceta(idMeal ?? receta.id);
        }


        // Agregar al HTML
        recetaBody.appendChild(recetaTitulo);
        recetaBody.appendChild(recetaBoton);
        recetaCard.appendChild(recetaImagen);
        recetaCard.appendChild(recetaBody);
        recetaContenedor.appendChild(recetaCard);

        recetasDiv.appendChild(recetaContenedor);
    });
}




// Seleccionar Receta
const seleccionarReceta = ( id ) => {
    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( resultado => mostrarRecetaModal(resultado.meals[0]) )
}






// Mostrar Receta
const mostrarRecetaModal = ( receta ) => {
    const { idMeal, strMealThumb, strInstructions, strMeal } = receta;

    // Añadimos Contenido al Modal
    const modalTitulo = document.querySelector('.modal .modal-title');
    const modalBody = document.querySelector('.modal .modal-body');
    
    modalTitulo.textContent = strMeal;
    
    // Limpiar HTML previo
    limpiarHTML(modalBody);
    
    
    // Crear Imagen
    const modalImagen = document.createElement('img');
    modalImagen.classList.add('img-fluid');
    modalImagen.src = strMealThumb;
    modalImagen.alt = `Imagen de la receta ${strMeal}`;
    
    // Crear h3 y parrafo
    const modalInstruccion = document.createElement('h3');
    modalInstruccion.classList.add('my-3');
    modalInstruccion.textContent = 'Instrucciones';
    
    const modalParrafo = document.createElement('p');
    modalParrafo.textContent = strInstructions;

    const modalIngredientes = document.createElement('h4');
    modalIngredientes.classList.add('my-3');
    modalIngredientes.textContent = 'Ingredientes y Cantidades';



    // Añadimos imagen y el parrafo al modal
    modalBody.appendChild(modalImagen);
    modalBody.appendChild(modalInstruccion);
    modalBody.appendChild(modalParrafo);
    modalBody.appendChild(modalIngredientes);


    const listaGrupo = document.createElement('ul');
    listaGrupo.classList.add('list-group');
    
    
    // Mostrar Cantidad de Ingredientes
    for( let i = 1; i <= 20; i++ ) {
        if( receta[`strIngredient${i}`] ) {
            const ingrediente = receta[`strIngredient${i}`];
            const cantidad = receta[`strMeasure${i}`];

            // Mostar en el HTML
            const ingredienteLista = document.createElement('li');
            ingredienteLista.classList.add('list-group-item', 'fw-semibold', 'text-capitalize');
            ingredienteLista.textContent = `${ingrediente}  -  ${cantidad}`;

            listaGrupo.appendChild(ingredienteLista);
        }
    }

    // Añadir al Modal
    modalBody.appendChild(listaGrupo);


    // Modal Footer
    const modalFooter = document.querySelector('.modal-footer');
    
    // Limpiar HTML previo
    limpiarHTML(modalFooter);

    // Crear Boton de Cerrar y Favoritos
    const btnFavoritos = document.createElement('button');
    btnFavoritos.classList.add('btn', 'btn-primary', 'col');
    btnFavoritos.textContent = existeFavorito(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';

    // LocalStorage
    btnFavoritos.onclick = () => {

        // Si ya existe en favoritos, lo eliminamos
        if( existeFavorito(idMeal) ) {
            eliminarFavorito(idMeal);
            btnFavoritos.textContent = 'Guardar Favorito';
            mostrarToast('Eliminado Correctamente', 'bg-danger');
            return;
        }

        // Guardar
        guardarFavorito({
            id: idMeal,
            nombre: strMeal,
            imagen: strMealThumb
        });
        btnFavoritos.textContent = 'Eliminar Favorito';
        mostrarToast('Agregado Correctamente', 'bg-primary');
    };

    const btnCerrar = document.createElement('button');
    btnCerrar.classList.add('btn', 'btn-secondary', 'col');
    btnCerrar.textContent = 'Cerrar';
    btnCerrar.onclick = () => {
        modal.hide();
    };

    modalFooter.appendChild(btnFavoritos);
    modalFooter.appendChild(btnCerrar);

    // Muestra el modal
    modal.show();
}




export {
    obtenerCategorias,
    mostrarRecetas
}