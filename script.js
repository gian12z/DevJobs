// forma antigua de hacerlo
// const boton = document.querySelectorAll('.button-apply');

// boton.forEach(boton => {//recorro todos los botones para que podamos aplicar a todos
//     boton.addEventListener('click', () => {
//         boton.textContent = 'Aplicado';
//         boton.classList.add('is-applied');//es la clase que esta en el css
//         boton.disabled = true;
//     });
// });
// de esta forma es mas eficiente
// ya que solo se agrega un event listener a un elemento padre
// y no a cada boton
// asi que si en el futuro se agregan mas botones no hace falta agregarles
// un event listener a cada uno
const lista_empleos = document.querySelector('.lista-empleos');

lista_empleos.addEventListener('click', (e) => {//(e) escucha el evento y lo guarda en e
    const elemento = e.target;
    if (elemento.classList.contains('button-apply')) {//si el elemento que se clickeo tiene la clase 
    // button-apply se aplican los cambios que estan adentro del if
        elemento.textContent = 'Aplicado';
        elemento.classList.add('is-applied');//es la clase que esta en el css
        elemento.disabled = true;
    }
})