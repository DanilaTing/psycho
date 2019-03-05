import PropTypes from 'prop-types';
import React from 'react';

export default class A_Avatar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="A_Avatar">
        <img src="https://avatars3.githubusercontent.com/u/815596?s=40&v=4" alt="AVATAR"/>
      </div>
    );
  }
}
