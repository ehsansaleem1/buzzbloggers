import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import mongoose from 'mongoose'
import Blog from '../../models/Blog'

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const body = JSON.parse(req.body)
  const author = body.author
    await mongoose.connect("mongodb+srv://ehsan:ehsan2024@cluster0.vqrb8yl.mongodb.net/TheAffiliateBlogger?retryWrites=true&w=majority")
    console.log("Connected to database")

    const blogs = await Blog.find({author: author}).sort({postedon: -1})

    res.json({
      message: "Blogs fetched successfully",
      blogs: blogs
    })
}) 

export default router.handler({
  onError: (err, req, res) => {
    console.error(err);
    res.json({
      message: "Error in fetching"
    })
  },
});

