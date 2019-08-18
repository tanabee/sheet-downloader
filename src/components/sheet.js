import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  tabs: {
    position: "fixed",
    bottom:"0",
    width:"100%"
  }
});

export default function Sheet(props) {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const classes = useStyles();

  function handleChange(event, newValue) {
    setSelectedTab(newValue);
  }

  let values = props.values.concat();

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
  
  const tabs = props.tabs.map((tab) => {
    return (
      <Tab label={tab.name} disabled />
    );
  });

  return (
    <>
      <Typography>
        {props.title}
      </Typography>
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
      <Paper square>
        <Tabs
          className={classes.tabs}
          value={selectedTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
        >
          {tabs}
        </Tabs>
      </Paper>
    </>
  );
}
