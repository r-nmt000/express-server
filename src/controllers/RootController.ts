import {NextFunction, Request, Response, Router} from "express";
import {controller, get, use} from "../decorators";

@controller('')
class RootController {

    @get('/')
    getRoot(req: Request, res: Response) {
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

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('welcome to protected page');
    }

}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}
