import PropTypes from 'prop-types';
import React from 'react';
import O_Menubar from '../03_organisms/O_Menubar';
import O_Column from '../03_organisms/O_Column';

export default class Projects extends React.Component {
  static propTypes = {
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  renderGeneralBoard() {
    const { columns, cards, cardInColumns } = this.props
    let boardColumns = []

    columns.map((column, i) => {
      boardColumns.push (
        <O_Column
          column={ column }
          cards={ cards }
          key={ i }
          cardInColumns={ cardInColumns }
        />
      )
    })

    return boardColumns
  }

  render() {
    const { board } = this.props

    return (
      <section>
        <O_Menubar activeTab="Projects"/>
        <div className="O_Board">
          <div className="columns">
            { this.renderGeneralBoard() }
          </div>
        </div>
      </section>
    );
  }
}
