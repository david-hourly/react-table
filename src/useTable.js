import { useReducer, useEffect } from "react";

const stack = (reducers) => (state, action) => {
  return reducers.reduce((stackedState, reducer) => {
    return reducer(stackedState, action);
  }, state);
};

const useTable = (data, columns, reducers) => {
  const reducer = stack(reducers);

  const [state, dispatch] = useReducer(reducer, {
    tableData: data,
    tableColumns: columns,
  });

  useEffect(() => {
    dispatch({ type: "UPDATE_DATA", data });
  }, [data]);

  useEffect(() => {
    dispatch({ type: "CONFIG" });
  }, []);

  return { state, dispatch };
};

export default useTable;
