import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';
import Turbolinks from 'turbolinks';

export default class O_NewTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: ''
    }

    this.saveCard = this.saveCard.bind(this)
    this.changeCardName = this.changeCardName.bind(this)
    this.changeCardDescription = this.changeCardDescription.bind(this)
  }

  changeCardName(e) {
    this.setState({
      name: e.target.value
    })
  }

  changeCardDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  updateCardName(name) {
    this.props.updateCardName(name)
  }

  saveCard(e) {
    const newCardName = this.state.name
    const newCardDescription = this.state.description
    const card_link = '../cards'
    let self = this

    $.ajax({
      dataType: 'JSON',
      url: card_link,
      type: "POST",
      data: { card:
        {
          name: newCardName,
          description: newCardDescription,
          type: 'Task'
        },
      },
      success: response => {
        console.log("it worked!", response);
      }
    })
    .done(function() {
      console.log( "success" );
      self.props.closeNewTask()
      window.location.reload()
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  }

  render() {
    return (
      <div className="openCardWraper">
        <div className="card open">
          <input placeholder='New Task' value={ this.state.name } onChange={ this.changeCardName }></input>
          <input placeholder='Description' value={ this.state.description } onChange={ this.changeCardDescription }></input>
          <div className="close" onClick={ this.props.closeNewTask }></div>
          <div className="submit" onClick={ this.saveCard }>Create</div>
        </div>
      </div>
    )
  }
}
