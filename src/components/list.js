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

    // TODO: key に index 指定してる部分の修正
    const headerValues = values.shift();
    const header = headerValues.map((value, index) => {
      return (
        <TableCell key={index}>{value}</TableCell>
      );
    });

    const list = values.map((row, index) => {
      const rowValues = row.map((value, index) => {
        return (
          <TableCell key={index}>{value}</TableCell>
        );
      });
      return <TableRow key={row}>{rowValues}</TableRow>;
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
