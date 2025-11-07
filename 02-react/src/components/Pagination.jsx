import styles from './Pagination.module.css'//importamos los estilos del css module

export function Pagination ({ currentPage = 1, totalPages = 10, onPageChange }) {//Lo que hacemos aca es 
  //crear un componente de paginacion que recibe 3 props: la pagina actual, el total de paginas y una funcion
  // a continuacion creamos un array con el total de paginas
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  const stylePrevButton = isFirstPage ? { pointerEvents: 'none', opacity: 0.5 } : {}
  const styleNextButton = isLastPage ? { pointerEvents: 'none', opacity: 0.5 } : {}

  const handlePrevClick = (event) => {//lo que hacemos aca es decirle que si no estamos en la primera pagina
    // podemos ir a la pagina anterior
    event.preventDefault()
    if (isFirstPage === false) {
      onPageChange(currentPage - 1)
    }
  }
  //lo mismo para la siguiente pagina
  const handleNextClick = (event) => {
    event.preventDefault()
    if (isLastPage === false) {
      onPageChange(currentPage + 1)
    }
  }
  //lo que hacemos aca es manejar el cambio de pagina cuando se hace click en un numero de pagina
  const handleChangePage = (event) => {
    event.preventDefault()
    const page = Number(event.target.dataset.page)

    if (page !== currentPage) {
      onPageChange(page)
    }
  }

  return (
    <nav className={styles.pagination}>{/*le aplicamos los estilos del css module, en este caso el estilo de pagination*/}
      
      <a href="#" style={stylePrevButton} onClick={handlePrevClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>
      
      {/* lo que hace pages.map es recorrer el array de paginas y crear un enlace para cada una
      es como un for pero en una sola linea y la diferencia es que devuelve un array nuevo con los elementos modificados
      y le agregamos un key para que react pueda identificar cada elemento */}
      {pages.map((page) => (
        <a
          key={page}//le damos una key unica a cada pagina para que React pueda identificar cada elemento de manera unica
          //en este caso la key va a ser el numero de pagina porque la pagina 1 siemrpe va a ser la pagina 1.
          data-page={page}
          href="#"
          className={currentPage === page ? styles.isActive : ''}
          onClick={handleChangePage}
        >
          {page}
        </a>
      ))}

      <a href="#" style={styleNextButton} onClick={handleNextClick}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>

      
    </nav>
  )
}