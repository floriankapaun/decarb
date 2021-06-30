import { Router } from 'express';

import attachCurrentUser from '../middlewares/attachCurrentUser.js';
import isAuth from '../middlewares/isAuth.js';
import PrismaService from '../services/PrismaService.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/AppError.js';
import asyncHandler from '../utils/asyncHandler.js';
import sendResponse from '../utils/sendResponse.js';

const router = Router();

export default (app) => {
    app.use('/users', router);

    // Create a User
    router.post('/', asyncHandler(async (req, res) => {
        const newUser = await UserService.create(req.body.email);
        // Make sure neither password nor verificationCode are leaked
        delete newUser.createdAt;
        delete newUser.deletedAt;
        delete newUser.password;
        delete newUser.refreshToken;
        delete newUser.refreshTokenExpiry;
        delete newUser.verificationCode;
        delete newUser.verifiedAt;
        return sendResponse(res, newUser);
    }));

    // Get a Users registration state
    // For more data check '/auth/user'
    // TODO: Refactor into UserService
    router.get('/:id/registration-state', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const user = await PrismaService.findUnique('user', { id });
        return sendResponse(res, {
            exists: user.id ? true : false,
            hasPassword: user.password ? true : false,
            isVerified: user.verifiedAt? true: false,
        });
    }));

    // Reset verificationCode: Create new verificationCode and send Mail with new code
    router.post('/:id/reset-verification', asyncHandler(async (req, res) => {
        const { id } = req.params;
        // NOTE: This is currently not returning an updatedUser but the nodemail response
        const updatedUser = await UserService.resendVerificationCode(id);
        return sendResponse(res, updatedUser);
    }));

    // Verify user email
    // TODO: Make verification code expire after 30 Minutes
    router.post('/:id/verification', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { verificationCode } = req.body;
        const verification = await UserService.verify(id, verificationCode);
        return sendResponse(res, verification);
    }));

    // Set user password
    // FIXME: This route is currently working forever and without authentication
    router.post('/:id/password', asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
        const set = await UserService.setUserPassword(id, password);
        return sendResponse(res, set);
    }));

    /**
     * User -> Domain
     */

    // Get all domains a user has access to
    router.get('/:id/domains', isAuth, attachCurrentUser, asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.currentUser.id;
        if (id !== userId) throw new AppError(`User ID "${id}" not matching API Token User`, 400);
        // Seems like this the right way to do this... 
        // See: https://github.com/prisma/prisma/discussions/2429#discussioncomment-14132
        const options = { where: { users: { some: { userId: { equals: userId }}}}};
        const domains = await PrismaService.findMany('domain', options);
        return sendResponse(res, domains);
    }));
};