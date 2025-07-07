import express from 'express'
import { loginUser, logoutUser, registerUser } from '../controllers/authController'

const router = express.Router()

router.post('/register', registerUser)
router.post ('/login', loginUser)
router.post('/logout', logoutUser)

export {router as authRoute}