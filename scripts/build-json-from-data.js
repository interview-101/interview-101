const fs = require( 'mz/fs' )
const path = require( 'path' )
const marked = require( 'marked' )
const hash = require( 'hash-sum' )
const Prism = require( 'prismjs' )
require( 'prismjs/components/prism-yaml' )
require( 'prismjs/components/prism-bash' )
require( 'prismjs/components/prism-diff' )
require( 'prismjs/components/prism-docker' )
require( 'prismjs/components/prism-jsx' )
require( 'prismjs/components/prism-less' )
require( 'prismjs/components/prism-typescript' )
const pages = require( '../data/config.json' )

const cwd = process.cwd()

function escape(html, encode) {
  if (encode) {
    if (escape.escapeTest.test(html)) {
      return html.replace(escape.escapeReplace, function (ch) { return escape.replacements[ch]; });
    }
  } else {
    if (escape.escapeTestNoEncode.test(html)) {
      return html.replace(escape.escapeReplaceNoEncode, function (ch) { return escape.replacements[ch]; });
    }
  }

  return html;
}

escape.escapeTest = /[&<>"']/;
escape.escapeReplace = /[&<>"']/g;
escape.replacements = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

escape.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
escape.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;

function highlight( str, lang ) {
  let rendered = str
  if ( Prism.languages[ lang ] ) {
    rendered = Prism.highlight( str || '', Prism.languages[ lang ], lang )
  }

  return rendered
}

const renderer = new marked.Renderer()
renderer.code = function ( code, infostring, escaped ) {
  var lang = (infostring || '').match(/\S*/)[0]
  var out = highlight(code, lang)
  if (out != null && out !== code) {
    escaped = true
    code = out
  }

  if (!lang) {
    return '<pre class="language-unknown"><code>'
      + (escaped ? code : escape(code, true))
      + '</code></pre>';
  }

  const langClass = 'language-' + escape(lang, true)

  return '<pre class="' + langClass + '"><code class="' + langClass + '">'
    + (escaped ? code : escape(code, true))
    + '</code></pre>\n'
}

main()

async function main() {
  for ( let page of pages ) {
    page.id = hash( page.name )

    const categories = page.categories || []

    for ( let category of categories ) {
      category.id = hash( category.file )
      const realpath = path.join( cwd, 'data', category.file )
      const buffer = await readFile( realpath )
      const questions = await parseFile( buffer.toString() )
      category.questions = questions
    }
  }

  await fs.writeFile( path.join( cwd, 'client/src/data.json' ), JSON.stringify( pages, 0, 2 ) )
}

async function parseFile( content ) {
  const results = []

  const tokens = marked.lexer( content )

  const grouped = tokens.reduce( function ( total, current, index ) {
    if ( current.type === 'heading' && current.depth === 1 ) {
      total.push( [] )
    }

    const group = total[ total.length - 1 ]

    // if first element is not heading 1
    if ( group ) {
      group.push( current )
    }

    return total
  }, [] )

  for ( let g of grouped ) {
    // filter heading 1
    const q = g.find( v => v.type === 'heading' && v.depth === 1 )
    const rest = g.filter( v => v !== q )
    const hrIndex = rest.findIndex( function ( v ) {
      return v.type === 'hr'
    } )

    // exists hr, use it as question/answer sep
    let qbody, answer
    if ( ~hrIndex ) {
      qbody = rest.slice( 0, hrIndex )
      answer = rest.slice( hrIndex + 1 )
    } else {
      qbody = void 0
      answer = rest
    }

    if ( qbody ) {
      qbody.links = tokens.links
    }

    if ( answer ) {
      answer.links = tokens.links
    }

    results.push( {
      question: q.text,
      question_body: qbody ? marked.parser( qbody, { renderer } ) : '',
      answer: answer ? marked.parser( answer, { renderer } ) : '',
    } )
  }

  return results
}

async function readFile( filepath ) {
  return await fs.readFile( filepath )
}
