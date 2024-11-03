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
    this.title = this.getAttribute('title')
    const src = this.getAttribute('src')

    const response = await fetch(src)
    const code = await response.text()
    this.init(code)
  }

  init(code) {
    let width = 100
    let height = 100
    const match = code.match(/createCanvas\((\d+), (\d+)\)/)
    if (match !== null) {
      width = match[1]
      height = match[2]
    }

    const html = `<!DOCTYPE html>
      <html>
      <head>
      <script src="/p5.min.js"></script>
      <style>body { padding: 0; margin: 0; overflow: hidden; }</style>
      </head>
      <body>
      <script type="module">${code}</script>
      </body>
      </html>`

    this.shadowRoot.innerHTML = `
    ${P5Sketch.style}
    <div>
      <div class="title">${this.title}</div>
      <iframe width="${width}" height="${height}" srcdoc="${html.replace(/"/g, '&quot;')}"></iframe>
    </div>`
  }
}

customElements.define('p5-sketch', P5Sketch)
