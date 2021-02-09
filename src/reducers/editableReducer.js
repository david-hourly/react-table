const INITIAL_STATE = {
  editRowId: null,
  editedRow: null,
};

export const editableReducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "CONFIG":
      return { ...state, ...INITIAL_STATE };
    case "ROW_CLICK":
      return { ...state, editRowId: action.row.id, editedRow: action.row };
    case "EDIT_COLUMN":
      return { ...state, editedRow: { ...state.editedRow, ...action.change } };
    case "STOP_EDIT":
      return { ...state, editRowId: null, editedRow: null };
    default:
      return state;
  }
};
