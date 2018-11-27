import PropTypes from 'prop-types';
import React from 'react';

export default class A_TabItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, link, active } = this.props.tab

    if (active == true) {
      return (
        <div className="A_TabItem active">
          { text }
        </div>
      )
    } else {
      return (
        <div className="A_TabItem">
          { text }
        </div>
      )
    }
  }
}
