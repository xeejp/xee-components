import React, { Component, PropTypes } from 'react'

import RaisedButton from 'material-ui/RaisedButton'
import { Step, Stepper, StepButton, StepContent } from 'material-ui/Stepper'

class Stepper_ extends Component {
  constructor(props, context) {
    super(props, context)

    this.changePage = this.changePage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
  }

  changePage(page) {
    const { changePage } = this.props
    changePage(page)
  }

  previousPage(page) {
    const { page: currentPage, pages, pageNames } = this.props
    changePage((pages.indexOf(page) + page.length - 1) % pages.length)
  }

  nextPage(page) {
    const { page: currentPage, pages, pageNames } = this.props
    changePage((pages.indexOf(page) + 1) % pages.length)
  }

  getPageName(pageNames, pages, page) {
    if (Array.isArray(pageNames)) {
      return pageNames[pages.indexOf(page)]
    } else if (typeof pageNames === 'function') {
      return pageNames(page)
    } else {
      return pageNames[page]
    }
  }

  render() {
    const { page, pages, pageNames } = this.props
    return (
      <Stepper activeStep={pages.indexOf(page)} linear={true}>
        {
          pages.map((page, i) => (
            <Step key={i}>
              <StepButton
                onClick={() => this.changePage(pages[i])}
              >{this.getPageName(pageNames, pages, pages[i])}</StepButton>
            </Step>
          ))
        }
        <RaisedButton onClick={this.previousPage}>前に戻る</RaisedButton>
        <RaisedButton onClick={this.nextPage} primary={true}>次へ進む</RaisedButton>
      </Stepper>
    )
  }
}

Stepper_.propTypes = {
  page: PropTypes.any.isRequired,
  pages: PropTypes.array.isRequired,
  pageNames: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
    PropTypes.object
  ]).isRequired,
  changePage: PropTypes.func.isRequired,
}

export default Stepper_
