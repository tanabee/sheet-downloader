import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default class List extends React.Component {
  render() {
    let values = this.props.values.concat();

    if (values.length === 0) return <></>;

    const headerValues = values.shift();
    const header = headerValues.map(value => {
      return (
        <TableCell>{value}</TableCell>
      );
    });

    const list = values.map(row => {
      const rowValues = row.map(value => {
        return (
          <TableCell>{value}</TableCell>
        );
      });
      return <TableRow>{rowValues}</TableRow>;
    });

    return (
      <Table>
        <TableHead>
          <TableRow>
            {header}
          </TableRow>
        </TableHead>
        <TableBody>
          {list}
        </TableBody>
      </Table>
    );
  }
}
