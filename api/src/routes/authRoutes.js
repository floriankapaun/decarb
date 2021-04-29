import { Router } from 'express';
import { REFRESH_TOKEN_EXPIRES } from '../config';

import attachCurrentUser from '../middlewares/attachCurrentUser';
import isAuth from '../middlewares/isAuth';
import AuthService from '../services/AuthService';

const router = Router();

export default (app) => {
    app.use('/auth', router);

    // Login a user
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const auth = await AuthService.login(email, password);
        if (auth.error) return res.json(auth.error).status(401);
        // Return refreshToken cookie
        res.cookie('refreshToken', auth.refreshToken, {
            maxAge: REFRESH_TOKEN_EXPIRES * 60 * 1000, // convert from min to ms
            httpOnly: true,
        });
        // Return accessToken in JSON Object
        res.json({
            accessToken: auth.accessToken,
            accessTokenExpiry: auth.accessTokenExpiry,
        });
    });
    
    // Logout all users sessions
    // Grips after the last accessToken expires (15 mins)
    // TODO: Add authentication middleware to this route to prevent malicious logouts from others
    router.post('/logout', async (req, res) => {
        const { email } = req.body;
        const auth = await AuthService.logout(email);
        // Delete refreshToken cookie
        res.cookie('refreshToken', '', {
            httpOnly: true,
            expires: new Date(0),
        });
        res.send({message: auth}).status(200);
    });

    // Refresh a users access token
    router.post('/refresh-token', async (req, res) => {
        const { refreshToken } = req.cookies;
        const { email } = req.body;
        const refreshedToken = await AuthService.refreshToken(email, refreshToken);
        res.json(refreshedToken).status(200);
    });

    // Get the authenticated users profile
    router.get('/user', isAuth, attachCurrentUser, async (req, res) => {
        delete req.currentUser.createdAt;
        delete req.currentUser.deletedAt;
        delete req.currentUser.password;
        delete req.currentUser.refreshToken;
        delete req.currentUser.refreshTokenExpiry;
        delete req.currentUser.verificationCode;
        delete req.currentUser.verifiedAt;
        res.json(req.currentUser).status(200);
    })
}