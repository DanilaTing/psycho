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
    const { project, user, columnId, pushNewTaskToTasks } = this.props
    const { name, description} = this.state
    const card_link = '../../cards'
    let self = this

    const data = {
      card: {
        type: 'Task',
        name: name,
        description: description,
        user_id: user.id
      },
      column_id: columnId
    }

    this.props.onSave(data)

    if (project) {
      data.card = {
        type: 'Task',
        name: name,
        description: description,
        user_id: user.id,
        project_id: project.id
      }
    }

    $.ajax({
      dataType: 'JSON',
      url: card_link,
      type: "POST",
      data: data,
      success: response => {
        console.log("card created: ", response);
        pushNewTaskToTasks(response)
      }
    })
    .done(function() {
      console.log( "success" );
      self.props.closeNewTask()
      // window.location.reload()
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
          <input autoFocus className="M_TextInput name" placeholder='New Task' value={ this.state.name } onChange={ this.changeCardName }></input>
          <textarea className="M_TextInput description" placeholder='Description' value={ this.state.description } onChange={ this.changeCardDescription }></textarea>
          <div className="close" onClick={ this.props.closeNewTask }></div>
          <div className="A_Button" onClick={ this.saveCard }>Create</div>
        </div>
      </div>
    )
  }
}
