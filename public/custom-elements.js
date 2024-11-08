class P5Sketch extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  async connectedCallback() {
    const title = this.getAttribute('title')
    const width = this.getAttribute('width') ?? '640'
    const height = this.getAttribute('height') ?? '240'
    const src = '/canvas' + location.pathname + '/' + this.getAttribute('src')

    this.shadowRoot.innerHTML = `
    <div>
      <h3>${title}</h3>
      <iframe width="${width}" height="${height}" src="${src}"></iframe>
    </div>`
  }
}

customElements.define('p5-sketch', P5Sketch)
