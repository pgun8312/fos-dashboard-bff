const express = require('express');
const authService = require('../services/authService');
const router = express.Router();

router.post('/signUp',authService.signUp);
router.post('/resend-confirmation-code', authService.resendConfirmationCode);
router.post('/confirm-signUp',authService.confirmSignUp)
router.post('/login', authService.login);
router.post('/reset-password-request',authService.resetPasswordRequest);
router.post('/reset-password', authService.resetPassword);

module.exports = router;