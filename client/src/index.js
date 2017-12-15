import React from 'react'
import ReactDOM from 'react-dom'
import WebFontLoader from 'webfontloader'

import 'react-md/dist/react-md.blue-red.min.css'

import App from './App'

WebFontLoader.load({
  google: {
    families: ['Poppins:300,400,500,700', 'Material Icons'],
  },
})

ReactDOM.render(<App />, document.getElementById('root'))
