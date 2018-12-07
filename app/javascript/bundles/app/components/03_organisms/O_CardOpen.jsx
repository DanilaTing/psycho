import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';
import Turbolinks from 'turbolinks';

export default class O_CardOpen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name
    }

    this.saveCard = this.saveCard.bind(this)
    this.changeCardName = this.changeCardName.bind(this)
  }

  changeCardName(e) {
    this.setState({
      name: e.target.value
    })

    this.saveCard(e.target.value)
  }

  updateCardName(name) {
    this.props.updateCardName(name)
  }

  saveCard(e) {
    const { card, triggerCard } = this.props
    const newCardName = e

    const card_link = '../cards/' + card.id

    let self = this

    $.ajax({
      dataType: 'JSON',
      url: card_link,
      type: "PATCH",
      data: { card: { name: newCardName  } },
      success: response => {
        console.log("it worked!", response);
        self.updateCardName(response.name)
      }
    })
    .done(function() {
      console.log( "success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  }

  render() {
    const { card, triggerCard } = this.props

    return (
      <div className="openCardWraper">
        <div className="card open">
          <input value={ this.state.name } onChange={ this.changeCardName }></input>
          <div className="close" onClick={ triggerCard }></div>
        </div>
      </div>
    )
  }
}
