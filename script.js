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

const filter = document.querySelector('#filter-ubicacion');

filter.addEventListener('change', () => {//escucha el evento change que es cuando se cambia el valor del select
    const trabajos = document.querySelectorAll('.card');
    const selectedValue = filter.value;//obtengo el valor seleccionado y lo almaceno en selectedValue
    
    trabajos.forEach(trabajo => {//recorro todos los trabajos
        const modalidad = trabajo.dataset.modalidad;//obtengo el valor del atributo data-modalidad
        if (selectedValue === '' || selectedValue === modalidad) {//si el valor seleccionado es vacio o es 
        // igual al valor del atributo data-modalidad aparece el trabajo
            trabajo.style.display = 'flex';//muestro el o los trabajos
        }
        else {
            trabajo.style.display = 'none';//oculto el trabajo si no cumple la condicion
        }
    })
})

const container = document.querySelector('.lista-empleos');
fetch('data.json')// me traigo los datos del archivo data.json
    .then((response ) => {//cuando la promesa se cumple o sea cuando se traen los datos
        return response.json();// los convierto a json
    })
    .then((trabajos) => {//cuando ya tengo los datos en formato json
        trabajos.forEach(trabajo => {//recorro cada trabajo
            const div = document.createElement('div');//creo un div para cada trabajo
            div.className = 'card';//le asigno la clase card
            //a continuacion asigno los atributos data- a cada tarjeta para poder filtrar despues
            div.dataset.modalidad = trabajo.modalidad;//asigno el valor de modalidad al atributo data-modalidad
            div.dataset.nivel = trabajo.nivel;//asigno el valor de nivel al atributo data-nivel
            div.dataset.technology = trabajo.technology; //asigno el valor de technology al atributo data-technology
            //a continuacion agrego el contenido html a cada tarjeta
            div.innerHTML = `
                <button class="button-apply">Aplicar</button>
                <p>${trabajo.titulo}</p>
                <p>${trabajo.empresa} | ${trabajo.modalidad}</p>
                <p>${trabajo.descripcion}</p>
            `;
            container.appendChild(div);//agrego la tarjeta al contenedor
        })
    })
