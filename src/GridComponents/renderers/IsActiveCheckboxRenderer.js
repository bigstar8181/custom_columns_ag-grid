import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const useStyles = makeStyles(() => ({
  root: {
    padding: 3
  }
}));

function IsActiveCheckboxCellRenderer(props) {
  const classes = useStyles();
  const handleChange = event =>
    props.onCheckedChange(Object.assign({}, event, { params: props }));

  return props.value === undefined ? (
    <div />
  ) : (
    <Checkbox
      checked={props.value}
      onChange={handleChange}
      className={classes.root}
    />
  );
}

IsActiveCheckboxCellRenderer.propTypes = {
  value: PropTypes.bool,
  onCheckedChange: PropTypes.func.isRequired
};

export default IsActiveCheckboxCellRenderer;
