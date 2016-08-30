import React, { Component } from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {
  Expandable,
  Stepper
} from '../../lib/index'

const Example = () => (
  <MuiThemeProvider>
    <div>
      <h1>Xee Components</h1>
      <Expandable title="Expandable" initiallyExpanded={true}>
        <Expandable title="title">
          <p>Contents</p>
        </Expandable>
        <Expandable title="title" initiallyExpanded={true}>
          <p>Contents</p>
        </Expandable>
      </Expandable>
    </div>
  </MuiThemeProvider>
)

export default Example
