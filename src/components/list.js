import React from 'react';

export default class List extends React.Component {
  render() {
    const list = this.props.values.map((row) => {
      const rowValues = row.join(', ');
      return (<li>{rowValues}</li>);
    });

    return (
      <ul className="list">{list}</ul>
    );
  }
}
