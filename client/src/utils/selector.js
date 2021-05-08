import * as statusState from "../constants/statusState";

export const selector = (status, { initial, loading, success, failure }) => {
  if (
    !status ||
    !initial ||
    !loading ||
    !success ||
    !failure ||
    ![
      statusState.INITIAL,
      statusState.LOADING,
      statusState.SUCCESS,
      statusState.FAILURE,
    ].some((st) => st === status) ||
    typeof initial !== "function" ||
    typeof loading !== "function" ||
    typeof success !== "function" ||
    typeof failure !== "function"
  ) {
    throw new Error("Please input arguments correct!!!");
  }

  if (status === statusState.INITIAL) {
    return initial();
  }

  if (status === statusState.LOADING) {
    return loading();
  }

  if (status === statusState.SUCCESS) {
    return success();
  }

  if (status === statusState.FAILURE) {
    return failure();
  }
};
