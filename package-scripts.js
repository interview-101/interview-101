const npsUtils = require( 'nps-utils' )

module.exports = {
  scripts: {
    default: {
      script: npsUtils.concurrent.nps( 'data.watch', 'app.watch' ),
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

    app: {
      watch: {
        default: {
          script: 'npm run start --prefix ./app',
          description: 'Build website in development mode'
        }
      },
      build: {
        default: {
          script: 'npm run build --prefix ./app',
          description: 'Build website in production mode'
        }
      }
    },
    
    build: {
      default: {
        script: 'nps data.build && nps app.build',
        description: 'Build website'
      }
    },

    deploy: {
      default: {
        script: 'cp CNAME ./app/dist/CNAME && nps build && gh-pages -d ./app/dist',
        description: 'Build website and deploy to gh-pages'
      }
    }
  }
}
