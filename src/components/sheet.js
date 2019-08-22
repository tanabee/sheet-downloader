import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DownloadButton from 'components/DownloadButton'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles(theme => ({
  root: {
    margin: "80px 0",
  },
  tableContainer: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  tabs: {
    position: "fixed",
    bottom:"0",
    width:"100%",
    backgroundColor: theme.palette.common.white,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    borderTop: "1px solid #ddd"
  }
}));

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
      <TableCell key={value}>{value}</TableCell>
    );
  });

  const list = values.map(row => {
    const rowValues = row.map((value, index) => {
      return (
        <TableCell key={index}>{value}</TableCell>
      );
    });
    return <TableRow key={row[0]}>{rowValues}</TableRow>;
  });
  
  const tabs = props.tabs.map((tab) => {
    return (
      <Tab key={tab.name} label={tab.name} disabled />
    );
  });

  return (
    <div className={classes.root}>
      <Toolbar>
        <Typography variant="h6">
          {props.title}
        </Typography>
        <div className={classes.grow} />
        <DownloadButton
          className={classes.button}
          values={props.values}
        />
      </Toolbar>
      <Paper className={classes.tableContainer}>
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
      </Paper>
      <Tabs
        className={classes.tabs}
        value={selectedTab}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
      >
        {tabs}
      </Tabs>
    </div>
  );
}
