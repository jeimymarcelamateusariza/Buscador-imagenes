
const resultado =document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacion = document.querySelector('#paginacion');

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario);
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;
    
    if(terminoBusqueda === '' ){
        imprimirAlerta('*Ingrese un termino de busqueda*');
        return;
    }

    
} 
