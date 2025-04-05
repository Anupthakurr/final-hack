import express from 'express'
import { Router } from 'express'
import {registerUser,loginUser} from '../controllers/user.controller.js'
const router =Router()
import upload from '../middlewares/multer.js'
import chatBot from '../controllers/chatBot.js'
import dashboard from '../controllers/dashboard.controller.js'
router.route('/').post(upload.single('image'),registerUser)
router.route('/login').post(loginUser)
router.route('/chatBot').post(chatBot)
router.route('/dashboard').get(dashboard)
export default router