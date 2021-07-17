import 'react'
import 'babel-plugin-jsx-control-statements'

declare module 'react' {
  function useReducer<R extends Reducer<any, any>>(
    reducer: R,
    initialState: ReducerState<R>,
    initializer?: undefined
  ): [ReducerState<R>, Dispatch<ReducerAction<R>>]
}

declare module '*.json' {
  const value: any
  export default value
}
