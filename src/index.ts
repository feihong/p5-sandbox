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

function servePage(title: string, body: string) {
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

function serveCanvas(path: string) {
  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path}</title>
  <style>body { padding: 0; margin: 0; overflow: hidden; }</style>
  <script src="/p5.min.js"></script>
  <script>
  // Get width and height from query string params
  function getDimensions() {
    const params = new URLSearchParams(location.search)
    const w = params.get('w') || '640'
    const h = params.get('h') || '240'
    return [parseInt(w), parseInt(h)]
  }
  </script>
  <script src="${path}"></script>
</head>
<body>
</body>
</html>`, { headers: { "Content-Type": "text/html" } })
}


new Elysia()
  .get('/custom-elements.js', () => Bun.file('public/custom-elements.js'))
  .get('/main.css', () => Bun.file('public/main.css'))
  .get('/p5.min.js', () => Bun.file('public/p5.min.js'))
  .get('/canvas/*', ({ params }) => serveCanvas('/' + params['*']))
  .get('/*', ({ params }) => serveFile(params['*']))
  .listen(8000)
