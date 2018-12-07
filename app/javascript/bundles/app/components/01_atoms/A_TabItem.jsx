import PropTypes from 'prop-types';
import React from 'react';

export default class A_TabItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { text, link, activeTab } = this.props.tab

    if (activeTab == text) {
      return (
        <a href={ link }>
          <div className="A_TabItem active">
            { text }
          </div>
        </a>
      )
    } else {
      return (
        <a href={ link }>
          <div className="A_TabItem">
            { text }
          </div>
        </a>
      )
    }
  }
}
