import express from 'express'
import { Router } from 'express'
import {registerUser,loginUser} from '../controllers/user.controllers.js'
const router =Router()
import upload from '../middlewares/multer.js'
router.route('/').post(upload.single('image'),registerUser).get(allUsers)
router.route('/login').post(loginUser)
export default router