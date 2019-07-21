import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  }
});

class DownLoadButton extends React.Component {

  downloadJSON = () => {
    let values = this.state.values.concat();

    if (values.length === 0) return;

    const keys = values.shift();
    const json = values.map(value => {
      var obj = {};
      value.forEach(function(element, i) {
        obj[keys[i]] = element;
      });
      return obj;
    });
    const jsonString = JSON.stringify(json);
    const file = new Blob([jsonString], {type: 'application/json'});
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "sheet.json";
    document.body.appendChild(element);
    element.click();
  }

  render() {
    const { classes } = this.props;

    return (
      <div align="center">
        <Button
          className={classes.button}
          variant="outlined"
          color="inherit"
          onClick={this.downloadJSON}
        >
          Download as JSON
        </Button>
      </div>
    );
  };
}

export default withStyles(styles)(DownLoadButton);
