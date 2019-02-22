const hash = require( 'hash-sum' )
const path = require( 'path' )
const fs = require( 'mz/fs' )

;( async () => {
  const pages = require( '../data/config.json' )

  let output = ``

  for ( let page of pages ) {
    page.id = hash( page.name )
    output = output + `- [${ page.name }](https://interview.js.org)\n`

    const categories = page.categories || []

    for ( let category of categories ) {
      category.id = hash( category.file )
      output = output + `  - [${ category.name }](https://interview.js.org/#/questions/${ page.id }/${ category.id })\n`
    }
  }

  const buffer = await fs.readFile( path.join( __dirname, '../README.md' ) )
  const content = buffer.toString()
  const result = content.replace(
    /<!-- TOC START -->([\s\S]*)<!-- TOC END -->/,
    `<!-- TOC START -->\n${ output }<!-- TOC END -->`
  )

  await fs.writeFile( path.join( __dirname, '../README.md' ), result )
} )()
