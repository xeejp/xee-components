import React from 'react'
import ReactDOM from 'react-dom'
import jsdom from 'mocha-jsdom'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { CardHeader } from 'material-ui/Card'

import { Expandable } from '../index'

describe('Expandable', () => {
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

  it('renders a text by default if initiallyExpanded is true', () => {
    const w = m(
      <Expandable title="title" initiallyExpanded={true}>
        <p>text</p>
      </Expandable>
    )
    expect(w.contains(<p>text</p>)).to.be.true
  })

  it('does not render a text by default if initiallyExpanded is false', () => {
    const w = m(
      <Expandable title="title" initiallyExpanded={false}>
        <p>text</p>
      </Expandable>
    )
    expect(w.contains(<p>text</p>)).to.be.false
  })

  it('does not render a text by default if initiallyExpanded is null', () => {
    const w = m(
      <Expandable title="title">
        <p>text</p>
      </Expandable>
    )
    expect(w.contains(<p>text</p>)).to.be.false
  })

  it('renders a header', () => {
    const w = m(
      <Expandable title="title">
        <p>text</p>
      </Expandable>
    )
    expect(w.find(CardHeader).prop('title')).to.be.equal('title')
  })

  it('uses the header as expander', () => {
    const w = m(
      <Expandable title="title">
        <p>text</p>
      </Expandable>
    )
    expect(w.contains(<p>text</p>)).to.be.false
    /* TODO
     * w.find(CardHeader).simulate('touchTap')
     * expect(w.contains(<p>text</p>)).to.be.true
     * w.find(CardHeader).simulate('touchTap')
     * expect(w.contains(<p>text</p>)).to.be.false
     */
  })
})
