import PropTypes from 'prop-types';
import React from 'react';

export default class A_TextButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, link, action, inboxId } = this.props

    return (
      <div className="A_TextButton" onClick={ () => action(inboxId) }>
        <a href={ link }>{ text }</a>
      </div>
    );
  }
}
