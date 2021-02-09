const INITIAL_SORT_STATE = { sort: {} };

export const sortReducer = (state, action) => {
  switch (action.type) {
    case "CONFIG":
      return { ...state, ...INITIAL_SORT_STATE };
    case "SORT_HEADER": {
      const { tableData, sort } = state;
      const { accessor } = action.column;
      const fieldSort = getColumnSort(sort, accessor);
      return {
        ...state,
        tableData: sortTable(tableData, accessor, fieldSort),
        sort: { [accessor]: fieldSort },
      };
    }
    default:
      return state;
  }
};

const getColumnSort = (sort, accessor) => {
  let fieldSort;
  if (!sort[accessor]) {
    fieldSort = "asc";
  } else {
    fieldSort = sort[accessor] === "asc" ? "desc" : "asc";
  }
  return fieldSort;
};

const sortTable = (data, accessor, fieldSort) => {
  return data.sort((a, b) => {
    if (a[accessor] < b[accessor]) {
      return fieldSort === "asc" ? -1 : 1;
    }

    if (a[accessor] > b[accessor]) {
      return fieldSort === "asc" ? 1 : -1;
    }

    return 0;
  });
};

export default sortReducer;
