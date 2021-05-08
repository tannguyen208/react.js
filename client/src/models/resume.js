import { query } from "../services/resume";
import * as statusState from "../constants/statusState";

export const initialState = {
  status: statusState.INITIAL,
  message: null,
  contains: {},
};

export default {
  namespace: "resume",

  state: initialState,

  effects: {
    *get(_, { put }) {
      try {
        yield put({ type: "getLoading" });
        const payload = yield query();
        yield put({ type: "getSuccess", payload: payload.contains });
      } catch (exception) {
        yield put({ type: "getFailure", payload: exception });
      }
    },
  },

  reducers: {
    getLoading(state) {
      return {
        ...state,
        status: statusState.LOADING,
      };
    },
    getSuccess(state, { payload }) {
      return {
        ...state,
        message: null,
        status: statusState.SUCCESS,
        contains: payload,
      };
    },
    getFailure(state, { payload }) {
      return {
        ...state,
        status: statusState.FAILURE,
        message: payload,
      };
    },
  },
};
