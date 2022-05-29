import express from 'express'
import {
  forgotPassword,
  passwordVerifyURL,
  resetPassword,
} from '../controllers/password_reset.js'
const router = express.Router()

//Forgot Password
router.post('/', forgotPassword)

//Password Verify URL
router.get('/:id/:token', passwordVerifyURL)

//Reset Password
router.post('/:id/:token', resetPassword)

export default router;
