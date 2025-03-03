
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacion = document.querySelector('#paginacion');

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

    consultarAPI(terminoBusqueda);
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

function consultarAPI(terminoBusqueda) {
    const key = '49152354-1895465467ed1789a345bd0b7';
    const url = `https://pixabay.com/api/?key=${key}&q=${terminoBusqueda}&image_type=photo`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarImagenes(resultado.hits);
        })
}

function mostrarImagenes(imagenes) {
    console.log(imagenes);
    limpiarHTML();

    //Iterar
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-2">
                <div class="p-3 rounded-lg bg-gradient-to-tr from-pink-950 to-gray-800 border shadow-lg shadow-cyan-500/80 ">
                    <img src="${previewURL}" alt="imagen" class="h-56">
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

}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}