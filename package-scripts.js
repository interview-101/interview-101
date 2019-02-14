const npsUtils = require( 'nps-utils' )

module.exports = {
  scripts: {
    default: npsUtils.concurrent.nps( 'data.watch', 'client.watch' ),

    data: {
      watch: {
        default: {
          script: 'onchange -i -k "data/**/*.*" -- nps data.build',
          description: 'parse markdown files to json in watch mode'
        }
      },
      build: {
        default: {
          script: 'node scripts/build-json-from-data',
          description: 'parse markdown files to json'
        }
      },
    },

    client: {
      watch: {
        default: 'npm run dev --prefix ./client'
      },
      build: {
        default: 'npm run build --prefix ./client'
      }
    },

    ghpages: 'gh-pages -d ./client/dist',

    deploy: 'nps data.build && nps client.build && nps ghpages'
  }
}
