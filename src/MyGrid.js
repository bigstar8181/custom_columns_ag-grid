import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { AgGridReact } from "@ag-grid-community/react";
import { AllModules } from "@ag-grid-enterprise/all-modules";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-enterprise/all-modules/dist/styles/ag-theme-material.css";
import ActionsRenderer from "./GridComponents/renderers/ActionsRenderer";
import IsActiveCheckboxRenderer from "./GridComponents/renderers/IsActiveCheckboxRenderer";
import OrsDateFilter from "./GridComponents/filters/OrsDateFilter";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  paper: {
    marginTop: 10
  },
  addIcon: {
    marginRight: 5
  }
});

class MyGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agGridOptions: {
        defaultColDef: {
          sortable: true
        },
        columnDefs: [
          {
            field: "active",
            headerName: "Active",
            cellRenderer: "isActiveCheckboxCellRenderer",
            cellRendererParams: {
              onCheckedChange: ({ params, ...event }) => {
                var updated = Object.assign({}, params.node.data);
                updated.active = event.target.checked;
                params.node.setData(updated);
              }
            },
            maxWidth: 120,
            sortable: false
          },
          {
            field: "name",
            headerName: "Username",
            filter: "agTextColumnFilter",
            filterParams: {
              clearButton: true
            }
          },
          {
            field: "mail",
            headerName: "Email",
            filter: "agTextColumnFilter",
            filterParams: {
              clearButton: true
            }
          },
          {
            field: "dateStart",
            headerName: "Start Date",
            filter: "agDateColumnFilter",
            filterParams: {
              comparator: function(filterLocalDateAtMidnight, cellValue) {
                if (cellValue == null) return 0;

                var cellDate = new Date(cellValue);

                // Now that both parameters are Date objects, we can compare
                if (cellDate < filterLocalDateAtMidnight) {
                  return -1;
                } else if (cellDate > filterLocalDateAtMidnight) {
                  return 1;
                } else {
                  return 0;
                }
              },
              clearButton: true
            },
            valueFormatter: params => {
              return new Date(params.value);
            }
          }
          // {
          //   headerName: "Actions",
          //   cellRenderer: "actionsRenderer",
          //   maxWidth: 180,
          //   suppressMenu: true,
          //   sortable: false
          // }
        ],
        rowData: [
          {
            id: "1ea8b575-7887-4617-83a8-1e09dcda6ec5",
            name: "t111",
            mail: "test@test.it",
            active: true,
            roles: " Application User",
            dateStart: "2019-05-16T00:00:00",
            validPassword: false
          },
         
        ],
        frameworkComponents: {
          isActiveCheckboxCellRenderer: IsActiveCheckboxRenderer,
          actionsRenderer: ActionsRenderer,
          agDateInput: OrsDateFilter
        },
        domLayout: "autoHeight",
        floatingFilter: true,
        context: { componentParent: this },
        reactNext: true,
        popupParent: document.querySelector("body")
      }
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  setCurrentRow = rowData => {
    const user = !rowData ? undefined : { ...rowData, roles: [] };
    this.setState({ user });
  };

  showDelete = user => {
    this.handleActions("delete", user);
  };

  showResetPassword = user => {
    this.handleActions("reset", user);
  };

  handleActions = (action, user) => {
    this.setState({ action, user });
  };

  render() {
    const { classes } = this.props;
    const { agGridOptions } = this.state;

    return (
      <div>
        <Paper className={classes.paper} square={true}>
          <div
            id="myGrid"
            style={{
              height: "100%",
              width: "100%"
            }}
            className="ag-theme-material"
          >
            <AgGridReact
              modules={AllModules}
              {...agGridOptions}
              onGridReady={this.onGridReady}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(MyGrid);
