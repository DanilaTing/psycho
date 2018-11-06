// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import MainPage from '../components/04_templates/T_MainPage'
import WebpackerReact from 'webpacker-react'
import Turbolinks from 'turbolinks'

Turbolinks.start()

WebpackerReact.setup({MainPage})

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Main />,
//     document.body.appendChild(document.createElement('section')),
//   )
// })
