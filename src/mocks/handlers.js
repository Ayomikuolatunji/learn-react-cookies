import { rest } from 'msw'


function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 50; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


export const Loginhandlers = [
  rest.post('/login', (req, res, ctx) => {
    const { password, email } = req.body

    return res(
      ctx.json({
        token: makeid(),
        password,
        email,

      })
    )
  }),
]