import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import { body, validationResult } from 'express-validator'
const userController = new UserController()
const userRouter = express.Router()

userRouter.post('/signup', [ body('email', 'Enter a valid email').isEmail(),
body('password', 'Your password should have at least 6 characters').isLength({min:6})],
 (req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }else{
        next();
    }
  },
(req, res)=>{
    userController.signUp(req, res)
}
)

userRouter.post('/signin', (req, res)=>{
    userController.loginUser(req, res)
}
)

userRouter.get('/logout', userController.signOut)

userRouter.post('/search', jwtAuth, (req, res)=>{
    userController.searchUsers(req, res)})

userRouter.get('/all', (req, res)=>{
    userController.getAll(req, res)
})

userRouter.get('/userprofile', jwtAuth, (req, res)=>{
    userController.sendUserProfile(req, res)}
    )






export default userRouter


