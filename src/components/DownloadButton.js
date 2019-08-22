import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import yaml from 'js-yaml';

const useStyles = makeStyles(theme => ({
}));

export default function DownLoadButton(props) {

  const classes = useStyles();
  const buttons = [
    {
      label: 'DOWNLOAD AS JSON',
      contentType: 'application/json',
      extension: 'json'
    },
    {
      label: 'DOWNLOAD AS YAML',
      contentType: 'application/yaml',
      extension: 'yml'
    }
  ];
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const anchorRef = React.useRef(null);

  function handleMenuItemClick(event, index) {
    setSelectedIndex(index);
    setOpen(false);
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleClose(event) {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  }

  function convertObjectToBlob(object, contentType) {
    switch(contentType) {
      case 'application/json': {
        const string = JSON.stringify(object, null, '\t');
        return new Blob([string], {type: contentType});
      }
      case 'application/yaml': {
        const string = yaml.dump(object, null, '\t');
        return new Blob([string], {type: contentType});
      }
      default: {
        return null; 
      }
    }
  }

  const download = () => {
    let values = props.values.concat();
    if (values.length === 0) return;
    const keys = values.shift();
    const object = values.map(value => {
      var obj = {};
      value.forEach(function(element, i) {
        obj[keys[i]] = element;
      });
      return obj;
    });
    
    const file = convertObjectToBlob(object, buttons[selectedIndex].contentType);
    if (!file) return;

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = 'sheet.' + buttons[selectedIndex].extension;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Grid item xs={12} align="right">
      <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
        <Button onClick={download}>{buttons[selectedIndex].label}</Button>
        <Button
          color="primary"
          size="small"
          aria-owns={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper id="menu-list-grow">
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  {buttons.map((button, index) => (
                    <MenuItem
                      key={button.label}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {button.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Grid>
  );
}
