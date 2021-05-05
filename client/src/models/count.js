export default {
  namespace: "count",

  state: 0,

  subscriptions: {
    setup({ dispatch, history }) {
      console.log("♎ ~ setup ~ dispatch", dispatch);
      console.log("♎ ~ setup ~ history", history);
    },
  },

  effects: {
    *add(_, { put }) {
      yield put({ type: "addOne" });
    },
    *minus(_, { put }) {
      yield put({ type: "minusOne" });
    },
  },

  reducers: {
    addOne(state, _) {
      return (state += 1);
    },
    minusOne(state, _) {
      return (state -= 1);
    },
  },
};
