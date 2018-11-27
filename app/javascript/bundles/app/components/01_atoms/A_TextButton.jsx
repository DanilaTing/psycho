import PropTypes from 'prop-types';
import React from 'react';

export default class A_TextButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text } = this.props

    return (
      <div className="A_TextButton">
        { text }
      </div>
    );
  }
}
