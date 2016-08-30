import React, { PropTypes } from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'

const Expandable = ({title=null, children, initiallyExpanded=null}) => (
  <Card
    initiallyExpanded={initiallyExpanded}
  >
    <CardHeader
      title={title}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardText
      expandable={true}
    >
      {children}
    </CardText>
  </Card>
)

Expandable.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  initiallyExpanded: PropTypes.bool
}

export default Expandable
