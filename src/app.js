
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registrosPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if (terminoBusqueda === '') {
        imprimirAlerta('*Ingrese un termino de busqueda*');
        return;
    }

    consultarAPI();
}

function imprimirAlerta(mensaje) {
    const alerta = document.querySelector('.alerta');

    if (!alerta) {
        const alerta = document.createElement('P');
        alerta.classList.add('alerta', 'my-1', 'text-pink-100', 'font-bold', 'mx-auto');
        alerta.textContent = mensaje;
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function consultarAPI() {
    const termino = document.querySelector('#termino').value;
    
    const key = '49152354-1895465467ed1789a345bd0b7';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registrosPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            totalPaginas = calcularPaginas(resultado.totalHits);
            mostrarImagenes(resultado.hits);
        })
}

//genearador que registra la cantidad de elementos de acuerdo a las paginas
function *crearPaginador(total){
    for(let i = 1; i <= total; i++){
        yield i;
    }
}

function calcularPaginas(total){
    return parseInt(Math.ceil(total/registrosPorPagina));
}

function mostrarImagenes(imagenes) {
    limpiarHTML();
    console.log(imagenes)
    //Iterar
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
        
            <div class="w-full md:w-1/3 lg:w-1/4 p-3 mb-2">
                <div class="p-3 rounded-lg bg-gradient-to-tr from-pink-950 to-gray-800 border border-pink-900 shadow-md shadow-gray-500/80 ">
                    <img src="${previewURL}" alt="imagen" class="h-56 rounded-xl">
                    <div class="flex justify-between my-5">
                        <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                        <p class="font-bold">${views} <span class="font-light">Vistas</span></p>
                    </div>
                    <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer"
                        class="py-2 block text-center text-white w-full bg-pink-600 hover:bg-pink-800 cursor-pointer font-bold rounded">Ver
                        foto
                    </a>
                </div>
            </div>
        `
    });

    //Limpiar el paginador previo
    while(paginacionDiv.firstChild){
        paginacionDiv.removeChild(paginacionDiv.firstChild);
    }
    imprimirPaginador();
    // Hacer scroll hasta el resultado
    resultado.scrollIntoView({ behavior: 'smooth' });
}

function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);
    
    while(true){
        const {value, done} = iterador.next();
        if(done) return;

        //Caso contrario, crea un boton por cada elemento en el generador, es decir por cada pagina
        const boton = document.createElement('A');
        boton.href = '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-pink-400', 'px-3', 'py-1', 'font-bold', 'mr-2', 'mb-3', 'rounded');

        boton.onclick = ()=>{
            paginaActual = value;
            consultarAPI();
        }

        paginacionDiv.appendChild(boton);
    }


}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}