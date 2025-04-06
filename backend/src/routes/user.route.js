// import express from 'express'
// import { Router } from 'express'
// import {registerUser,loginUser} from '../controllers/user.controller.js'
// const router =Router()
// import upload from '../middlewares/multer.js'
// import chatBot from '../controllers/chatBot.js'
// import dashboard from '../controllers/dashboard.controller.js'
// import protect from '../middlewares/auth.middleware.js'
// router.route('/').post(upload.single('image'),registerUser)
// router.route('/login').post(loginUser)
// router.route('/chatBot').post(chatBot)
// router.route('/dashboard').get(dashboard)
// //router.route('/profile').get(protect,getUserProfile )
// export default router
import express from 'express'
import { Router } from 'express'
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
} from '../controllers/user.controller.js'
const router = Router()
import upload from '../middlewares/multer.js'
import chatBot from '../controllers/chatBot.js'
import dashboard from '../controllers/dashboard.controller.js'
import protect from '../middlewares/auth.middleware.js'

router.route('/').post(upload.single('image'), registerUser)
router.route('/login').post(loginUser)
router.route('/chatBot').post(chatBot)
router.route('/dashboard').get(dashboard)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile/update').put(protect, upload.single('image'), updateUserProfile)

export default router