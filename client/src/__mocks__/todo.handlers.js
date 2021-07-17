import {rest} from 'msw'
import {buildUrl} from './endpoint'
// @ts-ignore
// SKIP: using development mode
import todoRepo from './data/todos.json'

export const todoHandlers = [
  // Get Todo List
  rest.get(buildUrl('todos'), (_, res, ctx) => res(
    ctx.status(200),
    ctx.json({
      todos: todoRepo,
    })
  )),
]
