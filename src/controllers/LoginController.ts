import {NextFunction, Request, Response} from "express";
import {get, controller, use, post, bodyValidator} from "../decorators";

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made!!!');
    next();
}

@controller('/auth')
class LoginController {

    @get('/')
    index(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
          <div>
            <div>Your are logged in</div>
            <a href="/auth/logout">Logout</a>
          </div>
        `);

        } else {
            res.send(`
          <div>
            <div>Your are not logged in</div>
            <a href="/auth/login">Login</a>
          </div>
        `);

        }
    }

    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response):void {
        res.send(`
      <form method="POST">
        <div>
          <label>Email</label>
          <input name="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <button>Submit</button>
    `);
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const {email, password} = req.body;
        if (email === 'hi@gmail.com' && password === 'abc') {
            req.session = {loggedIn: true};
            res.redirect('/auth');
        } else {
            res.send('invalid email or password');
        }
    }
}