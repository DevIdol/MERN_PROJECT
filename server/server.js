import dotenv from 'dotenv'
import express from 'express'
import bodyparser from 'body-parser'
import multer from 'multer'
import path from 'path'
import cors from 'cors'
import { connect, disconnection } from './db.js'
import authRoute from './routes/auth.js'
import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import cookieParser from 'cookie-parser'
import passwordResetRoute from './routes/password_reset.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
dotenv.config()

//middleware
app.use(cookieParser())
app.use(bodyparser.json())
app.use(cors())

//mongodb
disconnection

//image
app.use('/images', express.static(path.join(__dirname, '/images')))
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name)
  },
})

const upload = multer({ storage: fileStorage })
app.post('/api/v1/upload', upload.single('file'), (req, res) => {
  res.status(200).send({ message: 'File has been uploaded!' })
})

//routes
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/password-reset', passwordResetRoute)
app.use('/api/v1/posts', postRouter)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'
  return res.status(errorStatus).send({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  })
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  connect()
  console.log(`Server running on port ${PORT}`)
})
