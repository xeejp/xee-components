import React from 'react'
import jsdom from 'mocha-jsdom'
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { StepButton } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'

import { Stepper } from '../index'

describe('Slider', () => {
  jsdom()

  function m(element) {
    return mount(
      <MuiThemeProvider>
        {element}
      </MuiThemeProvider>
    )
  }

  it('renders page buttons', () => {
    const w = m(
      <Stepper
        page={'a'}
        pages={['a', 'b', 'c']}
        pageNames={['Page A', 'Page B', 'Page C']}
        changePage={() => {}}
      />
    )
    const stepButtons = w.find(StepButton)
    expect(stepButtons).to.have.length(3)
  })

  it('render proper names of pages when pageNames is an array', () => {
    const w = m(
      <Stepper
        page={'a'}
        pages={['a', 'b', 'c']}
        pageNames={['Page A', 'Page B', 'Page C']}
        changePage={() => {}}
      />
    )
    const stepButtons = w.find(StepButton)
    expect(stepButtons.at(0).children().text()).to.contain('Page A')
    expect(stepButtons.at(1).children().text()).to.contain('Page B')
    expect(stepButtons.at(2).children().text()).to.contain('Page C')
  })

  it('render proper names of pages when pageNames is a function', () => {
    const w = m(
      <Stepper
        page={'a'}
        pages={['a', 'b', 'c']}
        pageNames={(page) => {
          switch (page) {
            case 'a':
              return 'Page A'
            case 'b':
              return 'Page B'
            case 'c':
              return 'Page C'
          }
        }}
        changePage={() => {}}
      />
    )
    const stepButtons = w.find(StepButton)
    expect(stepButtons.at(0).children().text()).to.contain('Page A')
    expect(stepButtons.at(1).children().text()).to.contain('Page B')
    expect(stepButtons.at(2).children().text()).to.contain('Page C')
  })

  it('render proper names of pages when pageNames is a object', () => {
    const w = m(
      <Stepper
        page={'a'}
        pages={['a', 'b', 'c']}
        pageNames={{'a': 'Page A', 'b': 'Page B', 'c': 'Page C'}}
        changePage={() => {}}
      />
    )
    const stepButtons = w.find(StepButton)
    expect(stepButtons.at(0).children().text()).to.contain('Page A')
    expect(stepButtons.at(1).children().text()).to.contain('Page B')
    expect(stepButtons.at(2).children().text()).to.contain('Page C')
  })

  it('calls updatePage correctly', () => {
    const spy = sinon.spy()
    const w = m(
      <Stepper
        page={'a'}
        pages={['a', 'b', 'c']}
        pageNames={['Page A', 'Page B', 'Page C']}
        changePage={spy}
      />
    )
    const stepButtons = w.find(StepButton)
    stepButtons.at(0).simulate('click')
    expect(spy.calledWith('a'))
    stepButtons.at(1).simulate('click')
    expect(spy.calledWith('b'))
    stepButtons.at(2).simulate('click')
    expect(spy.calledWith('c'))

    const raisedButtons = w.find(RaisedButton)
    raisedButtons.at(0).simulate('click')
    expect(spy.calledWith('c'))
    raisedButtons.at(1).simulate('click')
    expect(spy.calledWith('b'))
  })
})
