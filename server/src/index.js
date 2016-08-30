import React from 'react'
import { render } from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import Example from './Example'

render(
  <Example />,
  document.getElementById('root')
)
