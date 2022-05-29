import express from 'express'
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../controllers/post.js'
import { verifyUser } from '../utils/verifyToken.js'
const router = express.Router()

//CREATE
router.post('/', verifyUser, createPost)

//UPDATE
router.put('/:id', verifyUser, updatePost)

//DELETE
router.delete('/:id', verifyUser, deletePost)

//GET
router.get('/:id', getPost)

//GET ALL
router.get('/', getPosts)

export default router
