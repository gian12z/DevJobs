import { useState } from 'react'

import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { Pagination } from './components/Pagination.jsx'
import { SearchFormSection } from './components/SearchFormSection.jsx'
import { JobListings } from './components/JobListings.jsx'

import jobsData from './data.json'//importamos los datos de los trabajos desde data.json como jobsData

const RESULTS_PER_PAGE = 4//controla cuántos resultados mostrar por página.

function App() {
    //lo que hace es crear una variable de estado llamada filters, cuyo valor inicial es un objeto con tres propiedades
    //Eso significa que cuando el componente se renderiza por primera vez, ningún filtro está aplicado todavía,
    //porque todos están en blanco.
    //Luego, cuando el usuario selecciona filtros en el formulario, se llama a setFilters(...) y ese objeto se actualiza
const [filters, setFilters] = useState({
    technology: '',
    location: '',
    experienceLevel: ''
    })
const [textToFilter, setTextToFilter] = useState('')//incialmente no hay texto para filtrar
const [currentPage, setCurrentPage] = useState(1)//inicialmente estamos en la pagina 1

//toma jobsData y filtra por las condiciones en filters.
const jobsFilteredByFilters = jobsData.filter(job => {
    return (
        (filters.technology === '' || job.data.technology === filters.technology)
        //si la tecnologia del filtro es vacia o si la tecnologia del trabajo es igual a la del filtro lo muestra
    )
})
//el signo de pregunta es como si hariamos:
//Si (textToFilter === '') entonces usar jobsFilteredByFilters Sino usar jobsFilteredByFilters.filter(...) es como un if
//con esto filtramos los trabajos que contienen el texto que el usuario escribio en el input
const jobsWithTextFilter = textToFilter === ''
    ? jobsFilteredByFilters
    : jobsFilteredByFilters.filter(job => {
        return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    })

//Calcula cuántas páginas en total hacen falta: longitud total de resultados dividida por 4 (redondeando hacia arriba).
//Ejemplo: si hay 10 resultados → Math.ceil(10 / 4) = Math.ceil(2.5) = 3 páginas
const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE)
//math.ceil redondea hacia arriba siempre
const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE, // Página 1 -> 0, Página 2 -> 5, Página 3 -> 10
    currentPage * RESULTS_PER_PAGE    // Página 1 -> 5, Página 2 -> 10, Página 3 -> 15
)
//Cambia la página actual cuando se solicita (por ejemplo desde el componente Pagination).
const handlePageChange = (page) => {
    setCurrentPage(page)
}
//Actualiza los filtros (reemplaza filters con el nuevo objeto) y resetea la página a 1 para mostrar resultados 
//desde el inicio.
const handleSearch = (filters) => {
    setFilters(filters)
    setCurrentPage(1)
}
//Actualiza el texto del filtro y también resetea la página a 1.
const handleTextFilter = (newTextToFilter) => {
    setTextToFilter(newTextToFilter)
    setCurrentPage(1)
}

return(//El return define qué se muestra en pantalla:
    <>
    <Header />{/*cuando un contenedor se abre y se cierra sin nada dentro es como un fragmento y hacerlo asi es como 
    poner <Header></Header> pero mas corto. */}

        <main>
            <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

        <section>
            <JobListings jobs={pagedResults} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </section>
        </main>

        <Footer />
    </>
    )
}

export default App