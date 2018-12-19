import PropTypes from 'prop-types';
import React from 'react';
import O_Column from '../03_organisms/O_Column';

export default class O_Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderColumns() {
    const { columns } = this.props
 
    const htmlElements = []

    columns.map((column, i) => {
      htmlElements.push(
        <O_Column column={ column } key={ 'column_' + i } />
      )
    })

    return (
      <div>
        { htmlElements }
      </div>
    )
  }

  render() {
    return (
      <div className="O_Board">
        { this.renderColumns( ) }
      </div>
    )
  }
}
