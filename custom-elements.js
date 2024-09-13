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
    this.onMutation = this.onMutation.bind(this)
  }

  connectedCallback() {
    this.observer = new MutationObserver(this.onMutation);
    this.observer.observe(this, {childList: true})

    this.title = this.getAttribute('title')
  }

  onMutation(_mutations) {
    this.observer.disconnect();
    if (this.firstChild.nodeType === Node.TEXT_NODE) {
      this.init(this.firstChild.nodeValue)
    }
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
      <script>${code}</script>
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
