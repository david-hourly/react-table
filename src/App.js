import useTable from "./useTable";
import { v4 as uuid } from "uuid";
import {
  sortReducer,
  historyReducer,
  editableReducer,
  updateReducer,
} from "./reducers";
import "./App.css";

const data = [
  { id: uuid(), name: "david", lastname: "sttivend", age: 29 },
  { id: uuid(), name: "daniel", lastname: "estrada", age: 30 },
  { id: uuid(), name: "diego", lastname: "toro", age: 31 },
  { id: uuid(), name: "miguel", lastname: "obando", age: 60 },
];

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Last name", accessor: "lastname" },
  { header: "Age", accessor: "age" },
];

function App() {
  const {
    state: { tableData, tableColumns, editRowId, editedRow },
    dispatch,
  } = useTable(data, columns, [
    updateReducer,
    sortReducer,
    historyReducer,
    editableReducer,
  ]);

  const handleHeaderClick = (column) => () =>
    dispatch({ type: "SORT_HEADER", column });

  const handleRowClick = (row) => () => dispatch({ type: "ROW_CLICK", row });

  const handleRowChange = (accessor) => (event) => {
    const {
      target: { value },
    } = event;
    dispatch({ type: "EDIT_COLUMN", change: { [accessor]: value } });
  };

  const handleSaveEdit = (event) => {
    event.stopPropagation();
    const newData = data.map((row) => {
      if (row.id === editRowId) {
        return editedRow;
      }
      return row;
    });
    dispatch({ type: "UPDATE_DATA", data: newData });
    dispatch({ type: "STOP_EDIT" });
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            {tableColumns?.map((column) => (
              <th key={column.accessor} onClick={handleHeaderClick(column)}>
                {column.header}
              </th>
            ))}
            {editRowId && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => (
            <tr key={index} onClick={handleRowClick(row)}>
              {columns.map((column) => (
                <td key={row[column.accessor]}>
                  {row?.id === editRowId ? (
                    <input
                      type="text"
                      value={editedRow[column.accessor]}
                      onChange={handleRowChange(column.accessor)}
                      onClick={(event) => event.stopPropagation()}
                    />
                  ) : (
                    row[column.accessor]
                  )}
                </td>
              ))}
              {editRowId && editRowId === row.id && (
                <td>
                  <button onClick={handleSaveEdit}>Save</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
