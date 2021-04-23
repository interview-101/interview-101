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
          script: 'node scripts/data-to-json',
          description: 'Parse markdown files to json'
        }
      },

      sync2readme: {
        default: {
          script: 'node scripts/sync-category.js',
          description: 'Sync categories to README.md'
        }
      }
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
    
    build: {
      default: {
        script: 'nps data.build && nps client.build',
        description: 'Build website'
      }
    },

    deploy: {
      default: {
        script: 'cp CNAME ./client/dist/CNAME && nps build && gh-pages -d ./client/dist',
        description: 'Build website and deploy to gh-pages'
      }
    }
  }
}
