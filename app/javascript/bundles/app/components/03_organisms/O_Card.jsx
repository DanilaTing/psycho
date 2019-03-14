import PropTypes from 'prop-types';
import React from 'react';

import O_CardClosed from '../03_organisms/O_CardClosed';
import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_Card extends React.Component {
  constructor(props) {
    super(props);

    this.triggerCard = this.triggerCard.bind(this)
    this.updateCardName = this.updateCardName.bind(this)

    this.state = {
      open: this.props.open,
      name: this.props.card.name,
      description: this.props.card.description
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      open: this.props.open,
      name: this.props.card.name,
      description: this.props.card.description
    })
  }

  triggerCard() {
    this.setState({
      open: !this.state.open
    })
  }

  updateCardName(name) {
    this.setState({
      name: name
    })
  }

  render() {
    const { boards, card } = this.props
    const { open, name, description } = this.state

    if (open == false) {
      return (
        <O_CardClosed
          name        = { name }
          card        = { card }
          triggerCard = { this.triggerCard }
        />
      )
    } else {
      return (
        <div>
          <O_CardClosed
            triggerCard = { this.triggerCard }
            name        = { this.state.name }
            card        = { card }
          />
          <O_CardOpen
            boards                = { boards }
            card                  = { card }
            name                  = { name }
            description           = { description }
            updateCardName        = { this.updateCardName }
            updateCardDescprition = { this.updateCardDescprition }
            triggerCard           = { this.triggerCard }
          />
        </div>
      )
    }
  }
}
