import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import mongoose from 'mongoose'
import Blog from '../../models/Blog'

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const body = JSON.parse(req.body)
  const title = body.title
  const description = body.description
  const file = body.image
  const content = body.content
  const author = body.author

  if (req.body) {
    await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/TheAffiliateBlogger?retryWrites=true&w=majority")
    console.log("Connected to database")

    const newBlog = new Blog({
      title: title,
      description: description,
      image: file,
      content: content,
      author: author
    })

    await newBlog.save().then((result:any) => {
      res.json({
        message: "Blog added successfully",
        result: result
      })
    }).catch((err:any) => {
      console.log(err)
      res.json({
        message: "Error occured in saving blog"
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
      message: "Error in uploading"
    })
  },
});

