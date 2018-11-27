import PropTypes from 'prop-types';
import React from 'react';
import Turbolinks from 'turbolinks';
Turbolinks.start();

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);

    this.triggerCard = this.triggerCard.bind(this)
    this.updateCardName = this.updateCardName.bind(this)

    this.state = {
      open: this.props.open,
      name: this.props.card.name
    }
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

  renderCard() {
    const { open, name } = this.state
    const { card } = this.props

    if (open == false) {
      return (
        <div className="card closed" onClick={ this.triggerCard }>
          { name }
        </div>
      )
    } else {
      return (
        <div>
          <div className="card">
            { name }
          </div>
          <O_CardOpen card={ card } triggerCard={ this.triggerCard } updateCardName={ this.updateCardName } />
        </div>
      )
    }
  }

  render() {
    return (
      this.renderCard()
    )
  }
}
