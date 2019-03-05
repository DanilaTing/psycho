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

  render() {
    const { open, name } = this.state
    const { card } = this.props

    if (open == false) {
      return (
        <O_CardClosed
          triggerCard={ this.triggerCard }
          name={ this.state.name }
          card={ card }
        />
      )
    } else {
      return (
        <div>
<<<<<<< HEAD
          <O_CardClosed
            triggerCard={ this.triggerCard }
            name={ this.state.name }
            card={ card }
          />
          <O_CardOpen
            triggerCard={ this.triggerCard }
            card={ card }
            name={ this.state.name }
            description={ this.state.description }
            updateCardName={ this.updateCardName }
            updateCardDescprition={ this.updateCardDescprition }
          />
=======
          <O_CardClosed triggerCard={ this.triggerCard } name={ this.state.name }/>
          <O_CardOpen triggerCard={ this.triggerCard } card={ card } name={ this.state.name } updateCardName={ this.updateCardName } />
>>>>>>> psycho/addingUsers
        </div>
      )
    }
  }
}
