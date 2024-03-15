import type { NextApiRequest, NextApiResponse } from 'next'
import Bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../../models/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    const password = body.password
    const email = body.email

    if (password && email) {
      await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/TheAffiliateBlogger?retryWrites=true&w=majority")
      console.log("Connected to database")

      const user = await User.findOne({ email: email })

      if(user!= null || 'undefined') {
        const passcompare = await Bcrypt.compare(password, user.password)

        if (passcompare) {

          const token = await user.generateAuthToken()
          console.log(token)
          res.json({
            user: user,
            token: token,
            message: "User logged In"
          })
        } else {
          res.json({
            message: "Password is incorrect"
          })
        }
      } else {
        res.json({
          message: "Cannot Find User"
        })
      }
     
    } else {
      res.json({
        message: "Please fill all the fields"
      })
    }
  } else {
    res.json({
      message: "Only POST method is allowed"
    })
  }
}