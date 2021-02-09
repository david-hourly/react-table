export const updateReducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, tableData: action.data };
    default:
      return state;
  }
};
