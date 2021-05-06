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
        sendResponse(res, newUser);
    }));

    // Reset verificationCode: Create new verificationCode and send Mail with new code
    router.post('/:id/reset-verification', async (req, res) => {
        const { id } = req.params;
        // NOTE: This is currently not returning an updatedUser but the nodemail response
        const updatedUser = await UserService.resendVerificationCode(id);
        res.json(updatedUser).status(200);
    });

    // Verify user email
    router.post('/:id/verification', async (req, res) => {
        const { id } = req.params;
        const { verificationCode } = req.body;
        const verification = await UserService.verify(id, verificationCode);
        res.json(verification).status(200);
    });

    // Set user password
    router.post('/:id/password', async (req, res) => {
        const { id } = req.params;
        const { password } = req.body;
        const set = await UserService.setUserPassword(id, password);
        res.json(set).status(200);
    });
};