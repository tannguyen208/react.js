import {setupWorker} from 'msw'
// handlers
import {accountHandlers} from './account.handlers'
import {todoHandlers} from './todo.handlers'

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...accountHandlers, ...todoHandlers)
