class P5Sketch extends HTMLElement {
  static style = `
  <style>
    .title {
      font-weight: 600;
      font-size: 1.1em;
    }
  </style>
  `

  constructor() {
    super()
    this.attachShadow({mode: 'open'})
  }

  async connectedCallback() {
    const title = this.getAttribute('title')
    const width = this.getAttribute('width') ?? '100'
    const height = this.getAttribute('height') ?? '100'
    const src = location.pathname + '/' + this.getAttribute('src')

    const response = await fetch(src)
    const code = await response.text()
    this.init(title, code, width, height)
  }

  init(title, code, width, height) {
    const html = `<!DOCTYPE html>
      <html>
      <head>
      <script src="/p5.min.js"></script>
      <style>body { padding: 0; margin: 0; overflow: hidden; }</style>
      </head>
      <body>
      <script>
      const width = ${width};
      const height = ${height};

      ${code}
      </script>
      </body>
      </html>`

    this.shadowRoot.innerHTML = `
    ${P5Sketch.style}
    <div>
      <div class="title">${title}</div>
      <iframe width="${width}" height="${height}" srcdoc="${html.replace(/"/g, '&quot;')}"></iframe>
    </div>`
  }
}

customElements.define('p5-sketch', P5Sketch)
