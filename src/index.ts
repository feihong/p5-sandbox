import { Elysia } from 'elysia'

async function serveFile(path: string) {
  const file = Bun.file(`pages/${path}`)
  if (await file.exists()) {
    return file
  }

  const indexFile = Bun.file(`pages/${path}/index.html`)
  if (await indexFile.exists()) {
    const text = await indexFile.text()
    const index = text.indexOf('\n')
    if (index === -1) {
      return 'Invalid page'
    } else {
      const title = text.slice(0, index)
      const body = text.slice(index+1)
      return servePage(title, body)
    }
  }
  return 'Not found'
}

async function servePage(title: string, body: string) {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <link rel="stylesheet" href="/main.css">
  <script src="/custom-elements.js"></script>
</head>
<body>
  <main>
    <h1>${title}</h1>
    ${body}
  </main>
</body>
</html>`, { headers: { "Content-Type": "text/html" } })
}

new Elysia()
  .get('/custom-elements.js', () => Bun.file('public/custom-elements.js'))
  .get('/main.css', () => Bun.file('public/main.css'))
  .get('/p5.min.js', () => Bun.file('public/p5.min.js'))
  .get('/*', ({ params }) => serveFile(params['*']))
  .listen(8000)
