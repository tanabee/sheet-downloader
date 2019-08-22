import React from 'react';
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Code from '@material-ui/icons/Code';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import GoogleAuth from 'components/GoogleAuth';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  link: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.black, 0.15),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 300,
    },
  },
}));

export default function NavigationBar(props) {
  const classes = useStyles();

  return (
    <AppBar color="default">
      <Toolbar>
        <Typography>Sheet Downloader</Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Type Spreadsheet URL"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{'aria-label': 'Search'}}
            onChange={props.onChangeSearchBarValue}
          />
        </div>
        <div className={classes.grow} />
        <Tooltip title="GitHub">
          <Link
            href="https://github.com/tanabee/sheet-downloader"
            target="_blank"
            className={classes.link}
            color="inherit">
            <Code />
          </Link>
        </Tooltip>
        <GoogleAuth onSignedIn={() => props.onSignedIn()} />
      </Toolbar>
    </AppBar>
  );
}
