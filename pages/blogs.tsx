import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useAuth0 } from "@auth0/auth0-react";
import Cookies from 'universal-cookie';
import {useState, useEffect} from 'react'
import { CldImage } from 'next-cloudinary';
import { CldOgImage } from 'next-cloudinary';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import Link from 'next/link'

const Blogs: NextPage = () => {
  const cookies = new Cookies();
  const isUser = cookies.get('session')
  console.log(isUser)
  if (!isUser) {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  const[loading, setLoading] = useState(true)
  const[blogs, setBlogs] = useState<any[]>([])

  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState("");

  const[style, setStyle] = useState({
    left: "-50"
  })

  function openfunc() {
      setStyle({left: "0"})
  }

  function closefunc() {
      setStyle({left: "-50rem"})
  }

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  async function addSub() {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      body: JSON.stringify({
        email: sub,
        message: "Add Subscription"
      })
    })
    const data = await res.json()
    setSub("")
    setOpen(false)
  }

  async function getBlogs() {
    setTimeout(async () => {
      const res = await fetch('/api/getblogs')
      const data = await res.json()
      console.log(data.message)
      setBlogs(data.blogs)
      setLoading(false)
    }, 3000)
  }

  useEffect(() => {
    getBlogs()
  }, [])

  if (loading) {
    return(
      <div className={styles.loader}>
        <Head>
          <title>Loading...</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Image src="/spinner.gif" alt="Replit Logo" width={200} height={200} />
      </div>
    )
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>All Blogs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
      <div className={styles.navContain}>
        <h1 onClick={closefunc}>BuzzBloggers <Image src="/replit.svg" alt="Replit Logo" width={20} height={20}/></h1>
        <ul>
          <Link href="/home"><li>Home</li></Link>
          <Link href="/blogs"><li>Blogs</li></Link>
          <Link href="/write"><li>Write</li></Link>
          <Link href="/about"><li>Our Story</li></Link>
          <Link href="/account"><li>Account</li></Link>
        </ul>
        <div>
          <button onClick={onOpenModal}>Subscribe us!</button>
        </div>
        <button onClick={openfunc}>&#9776;</button>
        <Modal open={open} onClose={onCloseModal} center>
          <h2>Enter your email to subscribe!</h2>
          <input value={sub} onChange={(e:any) => {setSub(e.target.value)}} type="email" className={styles.modalinp} placeholder='Enter your email'/>
          <button onClick={addSub} className={styles.modBtn}>Subscribe!</button>
        </Modal>
      </div>

      <div style={style} className={styles.mobileNav}>
        <h1 onClick={closefunc}>X</h1>
        <ul>
          <Link href="/home"><li>Home</li></Link>
          <Link href="/blogs"><li>Blogs</li></Link>
          <Link href="/write"><li>Write</li></Link>
          <Link href="/about"><li>Our Story</li></Link>
          <Link href="/account"><li>Account</li></Link>
        </ul>
        <div>
          <button onClick={onOpenModal}>Subscribe us!</button>
        </div>
      </div>
    </div>

      <div className={styles.blogContain}>
        <h1 className={styles.logoHead}>All Blogs</h1>
        {blogs.map((blog) => {
          const parsedimg = JSON.parse(blog.image)
        console.log(parsedimg)
          return(
            <div key={blog._id} className={styles.blogCard}>
              <CldImage
                width="350"
                height="300"
                src={parsedimg.public_id}
                sizes="100vw"
                alt="Description of my image"
              />
              <div>
                <Link href={"blog/" + blog._id }>
                <h1>{blog.title}</h1>
                <h2>{blog.description.slice(0, 150)+ "..."}</h2>
                <h4>{blog.postedon}</h4>
                  </Link>
              </div>
            </div>
          )
        })}
      </div>
   
      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copyright © 2022 Buzzbloggers
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
           - All Rights Reserved. Made by Ehsan Saleem
        </a>
      </footer>
    </div>
  )
}

export default Blogs
