const fs = require( 'mz/fs' )
const path = require( 'path' )
const hash = require( 'hash-sum' )
const parseFile = require( './shared/parse-file' )

;( async () => {
  const cwd = process.cwd()
  const pages = require( '../data/config.json' )

  for ( let page of pages ) {
    page.id = hash( page.name )

    const categories = page.categories || []

    for ( let category of categories ) {
      category.id = hash( category.file )
      const realpath = path.join( cwd, 'data', category.file )
      const buffer = await fs.readFile( realpath )
      const questions = await parseFile( buffer.toString() )
      category.questions = questions
    }
  }

  await fs.writeFile( path.join( cwd, 'app/src/data.json' ), JSON.stringify( pages, 0, 2 ) )
} )()
