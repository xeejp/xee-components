import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import jsdom from 'mocha-jsdom'
import { shallow, mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'chai'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import FloatingActionButton from 'material-ui/FloatingActionButton'

import { HostPage } from '../index'

// TODO injectTapEventPlugin()

describe('HostPage', () => {
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

  it('should render loading message', function() {
    const w = m(<HostPage
      page={'wait'} getPageName={page => '待機'} pages={['wait', '2']}
      changePage={() => {}} openSettingDialog={() => {}} openEditDialog={() => {}}
      settingButton={false} editButton={false} downloadButton={false}
      downloadFile={() => {}}
      children={<div>aaa</div>}
      loading={true}
    />)
    expect(w.contains(<div>aaa</div>)).to.equal(false)
    expect(w.text()).to.contain("サーバーに接続しています。")
  })

  it('should render children', function() {
    const w = m(<HostPage
      page={'wait'} getPageName={page => '待機'} pages={['wait', '2']}
      changePage={() => {}} openSettingDialog={() => {}} openEditDialog={() => {}}
      settingButton={false} editButton={false} downloadButton={false}
      downloadFile={() => {}}
      children={<div>aaa</div>}
      loading={false}
    />)
    expect(w.contains(<div>aaa</div>)).to.equal(true)
    expect(w.text()).not.to.contain("サーバーに接続しています。")
  })

  it('should disable buttons', function() {
    let w, buttons
    w = m(<HostPage
      children={<div>aaa</div>} page={'wait'} getPageName={page => '待機'}
      pages={['wait', '2']} changePage={() => {}} openSettingDialog={() => {}}
      openEditDialog={() => {}} downloadFile={() => {}} loading={false}
      settingButton={true}
      editButton={true}
      downloadButton={false}
    />)

    buttons = w.find(FloatingActionButton)
    expect(buttons.at(0).props().disabled).to.equal(false)
    expect(buttons.at(1).props().disabled).to.equal(false)
    expect(buttons.at(2).props().disabled).to.equal(true)

    w = m(<HostPage
      children={<div>aaa</div>} page={'wait'} getPageName={page => '待機'}
      pages={['wait', '2']} changePage={() => {}} openSettingDialog={() => {}}
      openEditDialog={() => {}} downloadFile={() => {}} loading={false}
      settingButton={false}
      editButton={true}
      downloadButton={true}
    />)

    buttons = w.find(FloatingActionButton)
    expect(buttons.at(0).props().disabled).to.equal(true)
    expect(buttons.at(1).props().disabled).to.equal(false)
    expect(buttons.at(2).props().disabled).to.equal(false)

    w = m(<HostPage
      children={<div>aaa</div>} page={'wait'} getPageName={page => '待機'}
      pages={['wait', '2']} changePage={() => {}} openSettingDialog={() => {}}
      openEditDialog={() => {}} downloadFile={() => {}} loading={false}
      settingButton={true}
      editButton={false}
      downloadButton={true}
    />)

    buttons = w.find(FloatingActionButton)
    expect(buttons.at(0).props().disabled).to.equal(false)
    expect(buttons.at(1).props().disabled).to.equal(true)
    expect(buttons.at(2).props().disabled).to.equal(false)
  })

  it('should call callbacks when one of action buttons is touched', function() {
    const openSettingDialog = sinon.spy(() => console.log('aaaafewafewaewafewa'))
    const openEditDialog = sinon.spy(() => console.log('aaaafewafewaewafewa'))
    const downloadFile = sinon.spy(() => console.log('aaaafewafewaewafewa'))
    const w = m(<HostPage
      children={<div>aaa</div>} page={'wait'} getPageName={page => '待機'}
      settingButton={true} editButton={true} downloadButton={true}
      loading={false} pages={['wait', '2']} changePage={() => {}}
      openSettingDialog={openSettingDialog}
      openEditDialog={openEditDialog}
      downloadFile={downloadFile}
    />)
    const buttons = w.find(FloatingActionButton)

    expect(openSettingDialog.callCount).to.equal(0)
    expect(openEditDialog.callCount).to.equal(0)
    expect(downloadFile.callCount).to.equal(0)

    /* TODO
    ReactTestUtils.Simulate.touchTap(buttons.at(0).node)
    expect(openSettingDialog.callCount).to.equal(1)
    expect(openEditDialog.callCount).to.equal(0)
    expect(downloadFile.callCount).to.equal(0)

    ReactTestUtils.Simulate.touchTap(buttons.at(1).node)
    expect(openSettingDialog.callCount).to.equal(1)
    expect(openEditDialog.callCount).to.equal(1)
    expect(downloadFile.callCount).to.equal(0)

    ReactTestUtils.Simulate.touchTap(buttons.at(2).node)
    expect(openSettingDialog.callCount).to.equal(1)
    expect(openEditDialog.callCount).to.equal(1)
    expect(downloadFile.callCount).to.equal(1)

    ReactTestUtils.Simulate.touchTap(buttons.at(1).node)
    expect(openSettingDialog.callCount).to.equal(1)
    expect(openEditDialog.callCount).to.equal(2)
    expect(downloadFile.callCount).to.equal(1)
    */
  })

  it('should call the changePage callback properly', function() {
    // TODO
  })
})
