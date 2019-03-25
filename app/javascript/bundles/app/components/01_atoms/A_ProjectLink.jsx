import PropTypes from 'prop-types';
import React from 'react';

export default class A_ProjectLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id } = this.props

    return (
      <a className="A_ProjectLink" href={ '../../react/projects/' + id }>
        <i className="fas fa-external-link-alt"></i>
      </a>
    )
  }
}
