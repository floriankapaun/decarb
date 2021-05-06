import { Router } from 'express';

import UserService from '../services/UserService';
import asyncHandler from '../utils/asyncHandler';
import sendResponse from '../utils/sendResponse';

const router = Router();

export default (app) => {
    app.use('/users', router);

    // Create a user
    router.post('/', asyncHandler(async (req, res) => {
        const newUser = await UserService.create(req.body.email, req.body.telephone);
        // Make sure neither password nor verificationCode are leaked
        delete newUser.password;
        delete newUser.verificationCode;
        return sendResponse(res, newUser);
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
};