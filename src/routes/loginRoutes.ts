import {NextFunction, Request, Response, Router} from "express";
import {AppRouter} from "../AppRouter";

const router = AppRouter.getInstance();

function requireAuth(req: Request, res: Response, next: NextFunction ): void {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send('Not permitted');
}

// router.get('/', (req: Request, res: Response) =>{
//     if (req.session && req.session.loggedIn) {
//         res.send(`
//           <div>
//             <div>Your are logged in</div>
//             <a href="/logout">Logout</a>
//           </div>
//         `);
//
//     } else {
//         res.send(`
//           <div>
//             <div>Your are not logged in</div>
//             <a href="/login">Login</a>
//           </div>
//         `);
//
//     }
// });

router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email && password && email === 'hi@gmail.com' && password === 'abc') {
        req.session = { loggedIn: true };
        res.redirect('/');

    } else {
        res.send('invalid email or password');
    }
});

router.get('/logout', (req: Request, res: Response) => {
    req.session = null;
    res.redirect('/');
});

router.get('/protected', requireAuth, (req: Request, res: Response) => {
    res.send('welcome to protected page');
});

export { router };