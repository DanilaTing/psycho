import PropTypes from 'prop-types';
import React from 'react';
import $ from 'jquery';
import Turbolinks from 'turbolinks';

export default class O_ProjectBar extends React.Component {
  constructor(props) {
    super(props);

    this.nameChange = this.nameChange.bind(this)
    this.createProject = this.createProject.bind(this)

    this.state = {
      name: ''
    }
  }

  nameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  createProject() {
    let self = this
    const { user, columnId } = this.props

    $.ajax({
      dataType: 'JSON',
      url: '../../cards',
      type: "POST",
      data: { card:
        {
          name: self.state.name,
          type: 'Project',
          user_id: user.id
        },
        column_id: columnId
      },
      success: response => {
        console.log("it worked!", response);
      }
    })
    .done(function() {
      console.log( "success" );
      window.location = "../../react/projects";
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
  }

  renderButton() {
    if (this.state.name == '') {
      return (
        <div className="A_Button inactive">Create project</div>
      )
    } else {
      return (
        <div className="A_Button" onClick={ this.createProject }>Create project</div>
      )
    }
  }

  render() {
    return (
      <section className="O_ProjectBar">
        <input autoFocus placeholder="Project Name" value={this.state.name} onChange={ this.nameChange }/>
        { this.renderButton() }
      </section>
    );
  }
}
