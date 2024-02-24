// Agregamos un event listener al objeto 'document' para escuchar 
//el evento 'DOMContentLoaded'.
// Este evento se dispara cuando el documento HTML ha sido 
//completamente cargado y analizado, sin esperar a que las hojas de estilo, 
//imágenes y subframes terminen de cargar.
document.addEventListener('DOMContentLoaded', function(){
     // Una vez que el DOM está completamente cargado, llamamos a la función 'iniciarApp'.
    iniciarApp();
});
// Definimos una función llamada 'iniciarApp'.
function iniciarApp() {
    // Dentro de 'iniciarApp', llamamos a tres funciones: 'navegacionFija', 
    //'crearGaleria' y 'scrollNav'.
    // Estas funciones probablemente inicializan diferentes partes de la 
    //aplicación web.
    navegacionFija();
    crearGaleria();
    scrollNav();
}
// Definimos una función llamada 'navegacionFija'.
function navegacionFija() {
    // Seleccionamos el elemento con la clase 'header' y lo almacenamos en la variable 'barra'.
    const barra = document.querySelector('.header');
      // Seleccionamos el elemento con la clase 'sobre-festival' y lo almacenamos en la variable 'sobreFestival'.
    const sobreFestival = document.querySelector('.sobre-festival');
    // Seleccionamos el elemento 'body' y lo almacenamos en la variable 'body'.
    const body = document.querySelector('body');

// Agregamos un event listener al objeto 'window' para escuchar el evento 'scroll'.
    window.addEventListener('scroll', function() {
        // Usamos 'getBoundingClientRect().bottom' para obtener la posición del borde inferior del elemento 'sobreFestival'
        // en relación con la parte superior de la ventana del navegador.
        if( sobreFestival.getBoundingClientRect().bottom < 0  ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

// Definición de la función scrollNav
function scrollNav() {
    // Selecciona todos los elementos <a> dentro de la clase "navegacion-principal"
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    // Itera sobre cada enlace
    enlaces.forEach( enlace => {
        // Agrega un evento de escucha para cuando se haga clic en cada enlace
        enlace.addEventListener('click', function(e) {
            // Previene el comportamiento predeterminado del evento de clic (navegación a una nueva página)
            e.preventDefault();

            // Obtiene el valor del atributo "href" del enlace sobre el que se hizo clic
            const seccionScroll = e.target.attributes.href.value;
            
            // Selecciona la sección del documento correspondiente al valor del atributo "href"
            const seccion = document.querySelector(seccionScroll);
            
            // Desplaza suavemente la ventana del navegador para que la sección seleccionada sea visible
            seccion.scrollIntoView({ behavior: "smooth"});
        });
    });
}

// Función para crear la galería de imágenes
function crearGaleria() {
     // Obtener el contenedor de la galería
    const galeria = document.querySelector('.galeria-imagenes');
// Bucle para generar las imágenes
    for(let i = 1; i <= 12; i++ ) {
         // Crear elemento "picture"
        const imagen = document.createElement('picture');
         // Establecer contenido HTML de la imagen
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        // Función para mostrar la imagen a tamaño completo
        imagen.onclick = function() {
            mostrarImagen(i);
        }
        // Agregar la imagen al contenedor de la galería
        galeria.appendChild(imagen);
    }
}  


function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    // Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Boton para cerrar el Modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}