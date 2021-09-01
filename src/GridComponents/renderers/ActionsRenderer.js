import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Delete from "@material-ui/icons/Delete";
import Create from "@material-ui/icons/Create";
import Autorenew from "@material-ui/icons/Autorenew";

const styles = theme => ({
  icon: {
    margin: theme.spacing(0.5)
  }
});

class ActionsRenderer extends Component {
  constructor(props) {
    super(props);
    this.openEditDialog = this.openEditDialog.bind(this);
  }

  openEditDialog() {
    this.props.context.componentParent.setCurrentRow(this.props.data);
  }

  showResetPassword = () => {
    this.props.context.componentParent.showResetPassword(this.props.data);
  };

  showDelete = () => {
    this.props.context.componentParent.showDelete(this.props.data);
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tooltip title="Edit">
          <IconButton
            aria-label="Edit"
            className={classes.icon}
            size="small"
            onClick={this.openEditDialog}
          >
            <Create />
          </IconButton>
        </Tooltip>
        <Tooltip title="Reset password">
          <IconButton
            aria-label="Reset password"
            className={classes.icon}
            size="small"
            onClick={this.showResetPassword}
          >
            <Autorenew />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            aria-label="Delete"
            className={classes.icon}
            size="small"
            onClick={this.showDelete}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default withStyles(styles)(ActionsRenderer);
