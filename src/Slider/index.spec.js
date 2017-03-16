import React from 'react'
import ReactDOM from 'react-dom'
import jsdom from 'mocha-jsdom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { blue400, pink400 } from 'material-ui/styles/colors'

import { Slider } from '../index'

describe('Slider', () => {
  jsdom()

  function s(element) {
    return shallow(
      <MuiThemeProvider>
        {element}
      </MuiThemeProvider>
    )
  }

  function m(element) {
    return mount(
      <MuiThemeProvider>
        {element}
      </MuiThemeProvider>
    )
  }

  it('renders boxes by the given number', () => {
    const w = m(
      <Slider min={0} max={100} divisor={20} value={0} onChange={() => {}} />
    )
    const boxes = w.find('Panel')
    expect(boxes).to.have.length(20)
  })

  it('changes the value by clicking', () => {
    const spy = sinon.spy()
    const w = m(
      <Slider min={0} max={100} divisor={20} value={0} onChange={spy} />
    )
    w.find('Panel').at(0).simulate('click')
    expect(spy.firstCall.args[1]).to.equal(5)
  })

  it('resets the value to 0 by clicking current selection', () => {
    const spy = sinon.spy()
    const w = m(
      <Slider min={0} max={100} divisor={20} value={5} onChange={spy} />
    )
    w.find('Panel').at(0).simulate('click')
    expect(spy.firstCall.args[1]).to.equal(0)
  })
})
