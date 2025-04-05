import express from 'express'
import { Router } from 'express'
import {registerUser,loginUser} from '../controllers/user.controller.js'
const router =Router()
import upload from '../middlewares/multer.js'
import chatBot from '../controllers/chatBot.js'
router.route('/').post(upload.single('image'),registerUser)
router.route('/login').post(loginUser)
router.route('/chatBot').post(chatBot)
export default router