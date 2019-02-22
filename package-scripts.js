const npsUtils = require( 'nps-utils' )

module.exports = {
  scripts: {
    default: {
      script: npsUtils.concurrent.nps( 'data.watch', 'client.watch' ),
      description: 'Command for local development'
    },

    data: {
      watch: {
        default: {
          script: 'onchange -i -k "data/**/*.*" -- nps data.build',
          description: 'Parse markdown files to json in watch mode'
        }
      },
      build: {
        default: {
          script: 'node scripts/build-json-from-data',
          description: 'Parse markdown files to json'
        }
      },
    },

    client: {
      watch: {
        default: {
          script: 'npm run dev --prefix ./client',
          description: 'Build website in development mode'
        }
      },
      build: {
        default: {
          script: 'npm run build --prefix ./client',
          description: 'Build website in production mode'
        }
      }
    },

    deploy: {
      default: {
        script: 'cp CNAME ./client/dist/CNAME && nps data.build && nps client.build && gh-pages -d ./client/dist',
        description: 'Build website and deploy to gh-pages'
      }
    }
  }
}
