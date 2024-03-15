import type { NextApiRequest, NextApiResponse } from 'next'
import Bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import User from '../../models/User'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const body = JSON.parse(req.body)
    const username = body.username
    const password = body.password
    const email = body.email

    if (username && password && email) {
      const hashedpass = await Bcrypt.hash(password, 10)
      await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/TheAffiliateBlogger?retryWrites=true&w=majority")
      console.log("Connected to database")

      const newuser = new User({
        username: username,
        email: email,
        password: hashedpass
      })

      const token = await newuser.generateAuthToken()
      console.log(token)

      await newuser.save().then(async (result:any) => {
        res.json({
          user: result,
          token: token,
          message: "User added succesfully"
        })
      }).catch((err:any) => {
        console.log(err)
        res.json({
          err: err,
          message: "Error in adding user"
        })
      })
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