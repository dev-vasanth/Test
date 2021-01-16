import Users from './model'
const bcrypt = require('bcryptjs');
import { sign, verify } from '../../services/jwt'
import { emailVerification } from '../../services/email/index'
import { registerValidation } from "../validation";
import { jwtSecret } from '../../config'
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { error } = registerValidation({ email: req.body.email });
    if (error) return res.status(400).send({ success: false, message: 'Invalid emailId..!' })
    const { userName, firstName, lastName, email, password } = req.body;
    if (!userName, !firstName, !lastName, !email, !password) {
      return res.status(400).send({ success: false, message: 'all fields are mandatory..!' })
    }
    const emailidExist = await Users.findOne({ email: req.body.email.replace(/^([\w-\.]\+\@([\w-]+\.)+[\w-]{2,4})?$/i) });
    if (emailidExist) return res.status(400).send({ success: false, message: 'Email already exist!' });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword
    const user = await Users.create(req.body);
    sign({ _id: user['_id'] }, (errSign, responseSign) => {
      if (!errSign) {
        user.token = responseSign;
        res.status(200).send({ success: true, message: 'Please check you email to verify your account..!' });
        emailVerification({ email: user.email, token: user.token })
      }
    });
  } catch (error) {
    return res.status(400).send({ success: false, message: 'Signup failed' })
  }
}

export const verifyEmail = async (req, res, next) => {
  try {
    const tokens = req.query.token;
    if (tokens) {
      jwt.verify(tokens, jwtSecret, async (err, decodedToken) => {
        if (err) {
          res.status(400).send({ success: false, message: "incorrect link" });
        }
        const { userName, firstName, lastName, email, password } = decodedToken
        req.body.isVerify = true
        const user = await Users.findByIdAndUpdate({ _id: decodedToken._id }, req.body)
        user ? res.status(200).send({ success: true, message: 'email verified successfully' }) : res.status(400).send({ success: false, message: "failed..!" });
      })
    }
  } catch (error) {
    return res.status(400).send({ success: false, message: 'EmailVerify  failed' })
  }
}

export const signin = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email.replace(/^([\w-\.]\+\@([\w-]+\.)+[\w-]{2,4})?$/i) })
    if (user) {
      if (user.isVerify) {
        const validatePassword = await bcrypt.compare(req.body.password, user.password);
        if (validatePassword) {
          sign({ _id: user['_id'] }, (errSign, responseSign) => {
            if (!errSign) {
              user.token = responseSign;
              res.status(200).send({ success: true, data: user.view(), message: 'Login success' });
            }
          });
        } else {
          res.status(400).send({ success: false, message: 'Email and password combination not match' })
        }
      } else {
        res.status(400).send({ success: false, message: 'Email not verified' })
      }
    } else {
      res.status(400).send({ success: false, message: 'Email not registered' })
    }
  } catch (error) {
    res.status(400).send({ success: false, message: 'Signin failed' })
  }
}

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "");
    res.status(200).send({ success: true, message: "Logout Successfully" });
  } catch (error) {
    res.status(400).send({ success: false, message: 'Signin failed' })
  }
}
