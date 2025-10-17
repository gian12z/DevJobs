class DevJobsAvatarElement extends HTMLElement {
    constructor() {
        super();//Llama al constructor de la clase padre HTMLElement
        this.attachShadow({ mode: 'open' });//Crea un shadow DOM para encapsular el estilo y la estructura 
        // del componente esto permite que los estilos no se afecten al documento principal ni viceversa
    }
    createUrl(service, username) {//metodo para crear la url de la imagen del avatar
    return `https://unavatar.io/${service}/${username}`//retorna la url con el servicio y el nombre de usuario
    }
    render() {
        const service = this.getAttribute('service') ?? 'github';//obtengo el atributo service o por defecto github
        //el ?? significa que si service es null o undefined se asigna 'github'
        const username = this.getAttribute('username') ?? 'gian12a';//obtengo el atributo username o por defecto gian12a
        const size = this.getAttribute('size') ?? '24';//obtengo el atributo size o por defecto 24

        const url = this.createUrl(service, username);//llamo al metodo createUrl para obtener la url de la 
        // imagen
        //a continuacion agrego el estilo y la estructura html del componente a el dom del componente
        this.shadowRoot.innerHTML = `
    <style>
    img {
        width: ${size}px;
        height: ${size}px;
        border-radius: 9999px;
    }
    </style>

<img 
    src="${url}" 
    alt="Avatar de ${username}" 
    class="avatar"
/>
`
}

connectedCallback() {
        this.render()
    }
}

customElements.define('devjobs-avatar', DevJobsAvatarElement);