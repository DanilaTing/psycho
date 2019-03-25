import PropTypes from 'prop-types';
import React from 'react';

import O_CardClosed from '../03_organisms/O_CardClosed';
import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_Card extends React.Component {
  constructor(props) {
    super(props);

    this.triggerCard = this.triggerCard.bind(this)
    this.updateCardName = this.updateCardName.bind(this)
    this.updateCardDescprition = this.updateCardDescprition.bind(this)

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
    this.setState(
      prevState => ({ open: !prevState.open}),
      () => {
        if (!this.state.open) {
          this.props.onSave()
        }
      }
    )
  }

  updateCardName(name) {
    this.setState({
      name: name
    })
  }

  updateCardDescprition(description) {
    this.setState({
      description: description
    })
  }

  render() {
    const { boards, card, index, toggleDragging, ghostDragRef, dragging, project, priority } = this.props
    const { open, name, description } = this.state

    if (open == false) {
      return (
        <O_CardClosed
          index          = { index }
          name           = { name }
          card           = { card }
          triggerCard    = { this.triggerCard }
          ghostDragRef   = { ghostDragRef }
          dragging       = { dragging }
          boards         = { boards }
          priority    = { priority }
          actions        = { this.props.actions }
        />
      )
    } else {
      return (
        <div>
          <O_CardClosed
            index          = { index }
            triggerCard    = { this.triggerCard }
            name           = { this.state.name }
            card           = { card }
            dragging       = { dragging }
            boards         = { boards }
            priority    = { priority }
            actions        = { this.props.actions }
          />
          <O_CardOpen
            boards                = { boards }
            card                  = { card }
            name                  = { name }
            description           = { description }
            boards                = { boards }
            updateCardName        = { this.updateCardName }
            updateCardDescprition = { this.updateCardDescprition }
            triggerCard           = { this.triggerCard }
          />
        </div>
      )
    }
  }
}
