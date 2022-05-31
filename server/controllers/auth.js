import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { createError } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import Token from '../models/Token.js'
import { SendMail } from '../utils/SendMail.js'

export const register = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username })
    user && next(createError(401, 'Username already exists!'))

    user = await User.findOne({ email: req.body.email })
    user && next(createError(401, 'Email already exists!'))

    user = await new User(req.body).save()

    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save()
    const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`
    await SendMail(user.email, 'Verified Email', url)

    res.status(200).send({ message: 'Admin Only Can Register!' })
  } catch (err) {
    next(createError(500, "Internet Connection Fail!"))
  }
}
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return next(createError(404, 'Email Not Found!'))

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password,
    )
    if (!isPasswordCorrect) return next(createError(400, 'Wrong Password!'))

    if (!user.verified) {
      let token = await Token.findOne({ userId: user._id })
      if (!token) {
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString('hex'),
        }).save()
        const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`
        await SendMail(user.email, 'Verify Email', url)
      }
      return res.status(400).send({ message: 'Admin Only Can Login!' })
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
        profile: user.profile,
        isAdmin: user.isAdmin,
      },
      process.env.JWT,
      { expiresIn: '7d' },
    )

    const { password, verified, ...others } = user._doc
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ data: token })
  } catch (err) {
    next(createError(500, "Internet Connection Fail!"))
  }
}
