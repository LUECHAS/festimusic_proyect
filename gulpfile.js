// Importamos las funciones 'src', 'dest', 'watch' y 'parallel' de Gulp.
// 'src' se utiliza para especificar los archivos de origen para una tarea.
// 'dest' se utiliza para especificar el directorio de destino para los archivos de salida.
// 'watch' se utiliza para observar cambios en los archivos y ejecutar tareas cuando se modifican.
// 'parallel' se utiliza para ejecutar varias tareas en paralelo.
const { src, dest, watch, parallel } = require('gulp');

// Importamos y configuramos el plugin 'gulp-sass' con 'sass' como motor de compilación.
// 'gulp-sass' se utiliza para compilar archivos SCSS a CSS.
const sass = require('gulp-sass')(require('sass'));

// Importamos 'gulp-plumber' que previene que los errores de Gulp detengan la ejecución de la tarea.
const plumber = require('gulp-plumber');

// Importamos 'autoprefixer' que es un plugin de PostCSS para añadir automáticamente prefijos de navegador a las reglas CSS.
const autoprefixer = require('autoprefixer');

// Importamos 'cssnano' que es un plugin de PostCSS para optimizar y minimizar el CSS.
const cssnano = require('cssnano');

// Importamos 'gulp-postcss' que se utiliza para aplicar transformaciones de PostCSS a los archivos CSS.
const postcss = require('gulp-postcss');

// Importamos 'gulp-sourcemaps' que se utiliza para generar mapas de fuente para los archivos CSS.
const sourcemaps = require('gulp-sourcemaps');

// Importamos 'gulp-cache' que se utiliza para almacenar en caché las imágenes procesadas.
const cache = require('gulp-cache');

// Importamos 'gulp-imagemin' que se utiliza para optimizar las imágenes.
const imagemin = require('gulp-imagemin');

// Importamos 'gulp-webp' que se utiliza para convertir imágenes a formato WebP.
const webp = require('gulp-webp');

// Importamos 'gulp-avif' que se utiliza para convertir imágenes a formato AVIF.
const avif = require('gulp-avif');

// Importamos 'gulp-terser-js' que se utiliza para minificar archivos JavaScript.
const terser = require('gulp-terser-js');


// Definimos una función llamada 'css' que toma un argumento 'done'.
// 'done' es una función de callback que se invoca cuando la tarea de compilación de CSS se ha completado.
function css(done) {
    // 'src' es una función que toma una ruta de archivo o patrones de archivos como argumento.
    // En este caso, estamos buscando todos los archivos .scss en el directorio 'src/scss' y sus subdirectorios.
    src('src/scss/**/*.scss')
        // 'pipe' es una función que toma un stream y lo pasa a través de una serie de transformaciones.
        // 'sourcemaps.init()' inicializa la creación de mapas de fuente para el archivo .scss.
        .pipe(sourcemaps.init())
        // 'plumber()' es un middleware que evita que los errores de gulp detengan la ejecución de la tarea.
        .pipe(plumber())
        // 'sass()' es una transformación que compila archivos .scss a .css.
        .pipe(sass())
        // 'postcss' es una herramienta para transformar CSS con plugins.
        // 'autoprefixer()' es un plugin que añade automáticamente prefijos de navegador a las reglas CSS.
        // 'cssnano()' es un plugin que optimiza y minimiza el CSS.
        .pipe(postcss([autoprefixer(), cssnano()]))
        // 'sourcemaps.write()' escribe los mapas de fuente en el directorio especificado.
        .pipe(sourcemaps.write('.'))
        // 'dest' es una función que toma una ruta de directorio y escribe los archivos transformados allí.
        // En este caso, los archivos CSS compilados y optimizados se escriben en el directorio 'build/css'.
        .pipe(dest('build/css'))
    // Una vez que todos los archivos han sido procesados y escritos, se invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}

// Función 'imagenes' para optimizar imágenes PNG y JPG.
function imagenes(done) {
    // Opciones de optimización para 'imagemin'.
    const opciones = {
        optimizationLevel:  3
    }
    // Busca todas las imágenes PNG y JPG en el directorio 'src/img' y sus subdirectorios.
    src('src/img/**/*.{png,jpg}')
        // Aplica 'imagemin' con las opciones especificadas para optimizar las imágenes.
        .pipe(cache(imagemin(opciones)))
        // Escribe las imágenes optimizadas en el directorio 'build/img'.
        .pipe(dest('build/img'))
    // Invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}

// Función 'versionWebp' para convertir imágenes PNG y JPG a formato WebP.
function versionWebp(done) {
    // Opciones de calidad para 'gulp-webp'.
    const opciones = {
        quality:  50
    };
    // Busca todas las imágenes PNG y JPG en el directorio 'src/img' y sus subdirectorios.
    src('src/img/**/*.{png,jpg}')
        // Convierte las imágenes a formato WebP con la calidad especificada.
        .pipe(webp(opciones))
        // Escribe las imágenes WebP en el directorio 'build/img'.
        .pipe(dest('build/img'))
    // Invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}

// Función 'versionAvif' para convertir imágenes PNG y JPG a formato AVIF.
function versionAvif(done) {
    // Opciones de calidad para 'gulp-avif'.
    const opciones = {
        quality:  50
    };
    // Busca todas las imágenes PNG y JPG en el directorio 'src/img' y sus subdirectorios.
    src('src/img/**/*.{png,jpg}')
        // Convierte las imágenes a formato AVIF con la calidad especificada.
        .pipe(avif(opciones))
        // Escribe las imágenes AVIF en el directorio 'build/img'.
        .pipe(dest('build/img'))
    // Invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}

// Función 'javascript' para minificar archivos JavaScript.
function javascript(done) {
    // Busca todos los archivos JavaScript en el directorio 'src/js' y sus subdirectorios.
    src('src/js/**/*.js')
        // Inicializa la creación de mapas de fuente para los archivos JavaScript.
        .pipe(sourcemaps.init())
        // Minifica los archivos JavaScript.
        .pipe(terser())
        // Escribe los mapas de fuente en el directorio especificado.
        .pipe(sourcemaps.write('.'))
        // Escribe los archivos JavaScript minificados en el directorio 'build/js'.
        .pipe(dest('build/js'))
    // Invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}

// Función 'dev' para observar cambios en los archivos SCSS y JS y ejecutar las tareas correspondientes.
function dev(done) {
    // Observa los cambios en los archivos SCSS y ejecuta la tarea 'css' cuando se modifican.
    watch('src/scss/**/*.scss', css);
    // Observa los cambios en los archivos JS y ejecuta la tarea 'javascript' cuando se modifican.
    watch('src/js/**/*.js', javascript);
    // Invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}

// Función 'tarea' para mostrar un mensaje en la consola.
function tarea(done) {
    // Muestra un mensaje en la consola.
    console.log('Desde la primera tarea');
    // Invoca la función 'done' para indicar que la tarea ha terminado.
    done();
}
// Exporta la función 'tarea' para que pueda ser utilizada por Gulp.
exports.tarea = tarea;

// Exporta la función 'css' para que pueda ser utilizada por Gulp.
exports.css = css;

// Exporta la función 'javascript' como 'js' para que pueda ser utilizada por Gulp.
exports.js = javascript;

// Exporta la función 'imagenes' para que pueda ser utilizada por Gulp.
exports.imagenes = imagenes;

// Exporta la función 'versionWebp' para que pueda ser utilizada por Gulp.
exports.versionWebp = versionWebp;

// Exporta la función 'versionAvif' para que pueda ser utilizada por Gulp.
exports.versionAvif = versionAvif;

// Exporta la función 'dev' como una tarea paralela que ejecuta varias tareas al mismo tiempo.
// Las tareas 'imagenes', 'versionWebp', 'versionAvif', 'javascript' y 'dev' se ejecutan en paralelo.
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
