import Token from '../models/Token.js'
import User from '../models/User.js'
import crypto from 'crypto'
import { createError } from '../utils/error.js'
import { SendMail } from '../utils/SendMail.js'
/*==================
   Forgot Password
==================== */
export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    !user && next(createError(404, 'Email Not Found!'))

    let token = await Token.findOne({
      userId: user._id,
    })
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex'),
      }).save()
    }
    const url = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`
    await SendMail(user.email, 'Password Reset', url)
    res.status(200).send({ message: 'Password reset link sent successfully!' })
  } catch (error) {
    next(createError(500, "Internet Connection Fail!"))
  }
}

/*==================
    Password  Verify Url 
  ==================== */

export const passwordVerifyURL = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    !user && next(createError(404, 'Email Not Found!'))

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })
    !token && next(createError(404, 'Token Not Found!'))

    res.status(200).send({ message: 'Valid URL' })
  } catch (error) {
    next(createError(500, "Internet Connection Fail!"))
  }
}

/*==================
      Password Reset
  ==================== */
export const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    !user && next(createError(404, 'User Not Found!'))

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    })
    !token && next(createError(400, 'Invalid Token!'))

    if (!user.verified) {
      return next(createError(400, 'You are not allowed!'))
    }

    user.password = req.body.password
    await user.save()
    await token.remove()

    res.status(200).json({ message: 'password reset successfully' })
  } catch (error) {
    next(createError(500, "Internet Connection Fail!"))
  }
}
