const INITIAL_HISTORY_STATE = { history: [] };

export const historyReducer = (state, action) => {
  switch (action.type) {
    case "CONFIG":
      return { ...state, ...INITIAL_HISTORY_STATE };
    case "ROW_CLICK":
      return { ...state, history: [...state.history, action.row] };
    default:
      return state;
  }
};

