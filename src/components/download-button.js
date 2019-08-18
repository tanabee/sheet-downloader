import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  }
}));

export default function DownLoadButton(props) {

  const classes = useStyles();

  const downloadJSON = () => {
    let values = props.values.concat();

    if (values.length === 0) return;

    const keys = values.shift();
    const json = values.map(value => {
      var obj = {};
      value.forEach(function(element, i) {
        obj[keys[i]] = element;
      });
      return obj;
    });
    const jsonString = JSON.stringify(json, null, '\t');
    const file = new Blob([jsonString], {type: 'application/json'});
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "sheet.json";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div align="center">
      <Button
        className={classes.button}
        variant="outlined"
        color="inherit"
        onClick={downloadJSON}
      >
        Download as JSON
      </Button>
    </div>
  );
}
