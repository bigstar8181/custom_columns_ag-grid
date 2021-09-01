import React from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";

class OrsDateFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: null
    };
  }

  setDate = date => {
    console.log("setDate", moment(date).format("dd/MM/yyyy"));
    const selectedDate = date !== null ? moment(date).toDate() : date;
    this.setState({ selectedDate });
  };

  getDate = () => {
    return this.state.selectedDate;
  };

  onDateChanged = date => {
    const selectedDate = moment(date).toDate();
    console.log("handleChange", selectedDate);
    this.setState({ selectedDate }, this.props.onDateChanged);
  };

  render() {
    const { selectedDate } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          autoOk
          variant="inline"
          format="dd/MM/yyyy"
          value={selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={this.onDateChanged}
        />
      </MuiPickersUtilsProvider>
    );
  }
}

export default OrsDateFilter;
