import {rest} from 'msw'
import omit from 'lodash/omit'
import {buildUrl} from './endpoint'
// @ts-ignore
// SKIP: using development mode
import accountRepo from './data/accounts.json'

export const accountHandlers = [
  // sign in
  rest.post(buildUrl('signIn'), (req, res, ctx) => {
    // @ts-ignore
    const {username} = req.body
    const account = accountRepo.find((acc) => acc.username === username) || {}

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        account: omit(account, ['password']),
      })
    )
  }),

  // sign out
  rest.post(buildUrl('signOut'), (req, res, ctx) => res(
    // Respond with a 200 status code
    ctx.status(200)
  )),

  // check sign in
  rest.post(buildUrl('checkSignIn'), (req, res, ctx) => {
    // check user's authentication in the session
    const account =
      accountRepo.find(
        (acc) => acc.token === req.headers.get('Authorization')
      ) || {}
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        account: omit(account, ['password']),
      })
    )
  }),
]
