import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import A_ProjectLabel from '../01_atoms/A_ProjectLabel';
import A_TasksCounter from '../01_atoms/A_TasksCounter';
import A_ProjectLink from '../01_atoms/A_ProjectLink';
import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dragging: false
    }
  }

  onDragStart = (e, id) => {
    const { onDragStart } = this.props.actions
    this.setState({
      dragging: true
    })
    onDragStart(e, id)
  }

  onDragEnd = () => {
    const { onDragEnd } = this.props.actions
    this.setState({
      dragging: false
    })
    onDragEnd()
  }

  render() {
    const { triggerCard, name, card, index, dragging, boards, actions } = this.props
    const { type, id, fake, project_id } = card
    const { onDragStart, onDrag, onDragEnd } = actions
    const link = '../react/projects/' + id

    let classes = classnames(
      { 'card': true },
      { 'closed': true },
      { 'dragging': this.state.dragging },
      { 'fake': fake }
    )

    return (
      <div className={ classes }
        ref={ this.cardRef }
        onClick={ triggerCard }
        draggable
        onDragStart={ (e) => this.onDragStart(e, id) }
        onDragEnd={ this.onDragEnd }>

        <div className="content">
          <p>{ name }</p>
          <div className="labels">
            { project_id ? (<A_ProjectLabel projectId={ project_id } boards={ boards } />) : '' }
            { type == 'Project' ? (<A_TasksCounter id={ id } boards={ boards }/>) : '' }
          </div>
          { type == 'Project' ? (<A_ProjectLink id={ id }/>) : '' }
        </div>
      </div>
    )
  }
}
