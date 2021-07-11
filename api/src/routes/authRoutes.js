import { Router } from 'express';
import cookieParser from 'cookie-parser';

import { CLIENT_ENTRYPOINT, MODE } from '../config/index.js';
import attachCurrentUser from '../middlewares/attachCurrentUser.js';
import isAuth from '../middlewares/isAuth.js';
import AuthService from '../services/AuthService.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = Router();

export default (app) => {
    app.use('/auth', router);

    // Login a user
    router.post('/login', asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const auth = await AuthService.login(email, password);
        // Add refreshToken cookie to response
        res.cookie('refreshToken', auth.refreshToken, {
            expires: auth.accessTokenExpiry,
            httpOnly: true,
            secure: MODE === 'development' ? false : true,
            sameSite: 'Strict',
            domain: CLIENT_ENTRYPOINT,
        });
        // Return accessToken in JSON Object
        return sendResponse(res, {
            accessToken: auth.accessToken,
            accessTokenExpiry: auth.accessTokenExpiry,
        });
    }));
    
    // Logout all users sessions
    // Grips after the last accessToken expires (15 mins)
    router.post(
        '/logout', 
        isAuth, 
        asyncHandler(async (req, res) => {
            const { email } = req.body;
            const auth = await AuthService.logout(email);
            // Delete refreshToken cookie
            res.cookie('refreshToken', '', {
                httpOnly: true,
                expires: new Date(0),
            });
            return sendResponse(res, {message: auth});
        })
    );

    // Refresh a users access token
    router.post(
        '/refresh-token',
        cookieParser(),
        isAuth,
        asyncHandler(async (req, res) => {
            // Nuxt SSR Requests send the 'refreshToken' cookie received from the client in the 'req.body'
            const refreshToken = req.cookies.refreshToken ?? req.body.refreshToken;
            const { email } = req.body;
            const refreshedToken = await AuthService.refreshToken(email, refreshToken);
            return sendResponse(res, refreshedToken);
        })
    );

    // Get the authenticated users profile
    router.get(
        '/user', 
        isAuth, 
        attachCurrentUser, 
        asyncHandler(async (req, res) => {
            return sendResponse(res, {
                id: req.currentUser.id,
                email: req.currentUser.email,
                isVerified: req.currentUser.verifiedAt ? true : false,
                hasPassword: req.currentUser.password ? true : false,
                hasDomain: req.currentUser.domains?.length ? true : false,
            });
        })
    );
}