import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import multer from 'multer'
import mongoose from 'mongoose'
import Subscribe from '../../models/Subscribe'

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const body = JSON.parse(req.body)
  const email = body.email

  if (req.body) {
    await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/TheAffiliateBlogger?retryWrites=true&w=majority")
    console.log("Connected to database")

    const newmember = new Subscribe({
      email:email
    })

    await newmember.save().then((result:any) => {
      res.json({
        message: "Subscribed successfully",
        result: result
      })
    }).catch((err:any) => {
      console.log(err)
      res.json({
        message: "Error occured in subscribing"
      })
    })
  } else {
    res.json({
      message: "Please fill all the fields"
    })
  }
}) 

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.json({
      message: "Error in Subscribing"
    })
  },
});

