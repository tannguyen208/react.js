import {rest} from 'msw'
import todoRepo from './data/todos.json'

const _buildUrl = (endpoint) => '/api/v1/' + endpoint

export const todoHandlers = [
  // Get Todo List
  rest.get(_buildUrl('todos'), (_, res, ctx) => {
    // return a mocked todos
    return res(
      ctx.status(200),
      ctx.json({
        todos: todoRepo,
      })
    )
  }),
]
