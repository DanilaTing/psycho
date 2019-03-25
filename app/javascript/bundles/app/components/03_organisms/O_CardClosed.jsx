import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

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
    const { triggerCard, name, card, index, dragging, actions } = this.props
    const { type, id, fake } = card
    const { onDragStart, onDrag, onDragEnd } = actions
    const link = '../react/projects/' + id

    let classes = classnames(
      { 'card': true },
      { 'closed': true },
      { 'dragging': this.state.dragging },
      { 'fake': fake }
    )

    if (type == 'Project') {
      return (
        <a href={ link }>
          <div className={ classes }
            ref={ this.cardRef }
            onClick={ triggerCard }
            draggable
            onDragStart={ (e) => onDragStart(e, id) }
            onDragEnd={ onDragEnd }>
            <div className="content">
              <p>{ name }</p>
            </div>
          </div>
        </a>
      )
    } else if (type == 'Task') {
      return (
        <div className={ classes }
          ref={ this.cardRef }
          onClick={ triggerCard }
          draggable
          onDragStart={ (e) => this.onDragStart(e, id) }
          onDragEnd={ this.onDragEnd }>

          <div className="content">
            <p>{ name }</p>
          </div>
        </div>
      )
    }
  }
}
