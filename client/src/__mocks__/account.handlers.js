import { rest } from 'msw'
import omit from 'lodash/omit'
import accountRepo from './data/accounts.json'

const _buildUrl = (endpoint) => '/api/v1/' + endpoint

export const accountHandlers = [
  // sign in
  rest.post(_buildUrl('signIn'), (req, res, ctx) => {
    const account = accountRepo.find((acc) => acc.username === req.body.username) || {}

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        account: omit(account, ['password']),
      })
    )
  }),

  // sign out
  rest.post(_buildUrl('signOut'), (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200)
    )
  }),

  // check sign in
  rest.post(_buildUrl('checkSignIn'), (req, res, ctx) => {
    // check user's authentication in the session
    const account = accountRepo.find((acc) => acc.token === req.headers.get('Authorization')) || {}
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        account: omit(account, ['password']),
      })
    )
  }),
]
