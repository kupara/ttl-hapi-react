const dir = require('node-dir')

const contactRoutes = {
  name: 'contact-api',
  version: '0.0.1',
  register: (server, options) => {
    dir.files(__dirname, (err, files) => {
      if (err) console.log(err)

      files.forEach(file => {
        if (!file.endsWith('index.js')) {
          const route = require(`${file}`)
          server.route(route)
        }
      })
    })
  },
}

module.exports = {
  contactRoutes,
}
