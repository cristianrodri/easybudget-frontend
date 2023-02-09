import { DefaultRequestBody, rest } from 'msw'

const handlers = [
  rest.post<DefaultRequestBody, { success: boolean }>(
    '/api/register',
    (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json({ success: true }))
    }
  ),
  rest.post<DefaultRequestBody, { success: boolean }>(
    '/api/login',
    (req, res, ctx) => {
      return res(ctx.delay(100), ctx.json({ success: true }))
    }
  ),
  rest.get('/api/user/get', null),
  rest.get('/api/avatar/get', null),
  rest.get('/api/budget/get', null)
]

export { handlers }
