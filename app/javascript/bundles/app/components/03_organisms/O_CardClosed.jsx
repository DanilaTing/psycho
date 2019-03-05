import PropTypes from 'prop-types';
import React from 'react';

import O_CardOpen from '../03_organisms/O_CardOpen';

export default class O_CardClosed extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { triggerCard, name, card } = this.props
    const { type, id } = card
    const link = '../react/projects/' + id
    console.log(link);

<<<<<<< HEAD
    if (type == 'Project') {
      return (
        <a href={ link }>
          <div className="card closed" onClick={ triggerCard } draggable={true}>
            <div className="content">
              <p>{ name }</p>
            </div>
          </div>
        </a>
      )
    } else if (type == 'Task') {
      return (
        <div className="card closed" onClick={ triggerCard } draggable={true}>
          <div className="content">
            <p>{ name }</p>
          </div>
=======
    return (
      <div className="card closed" onClick={ triggerCard }>
        <div className="content">
          <p>{ name }</p>
>>>>>>> psycho/addingUsers
        </div>
      )
    }
  }
}
