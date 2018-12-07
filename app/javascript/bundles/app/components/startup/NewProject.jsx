import PropTypes from 'prop-types';
import React from 'react';
import O_Menubar from '../03_organisms/O_Menubar';
import O_Column from '../03_organisms/O_Column';

export default class NewProject extends React.Component {
  static propTypes = {
  };

  /**
   * @param props - Comes from your rails view.
   */
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <O_Menubar activeTab="none"/>
        <div className="board">
        </div>
      </section>
    );
  }
}
