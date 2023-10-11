import React from 'react'
import { Paper } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Top from '../components/Top'
import SignUpForm from '../components/Auth/SignUpForm'
import SignInForm from '../components/Auth/SignInForm'
import CreatePost from '../components/Post/CreatePost'
import PostByUser from '../components/Post/PostByUser'



const Content = () => {
  return (
    <>
      <Routes>
        <Route index element={<Top />} />
        <Route path='/signup_form' element={<SignUpForm />} />
        <Route path='/signin_form' element={<SignInForm />} />
        <Route path='/new/post' element={<CreatePost />} />
        <Route path='/posts' element={<PostByUser />} />
      </Routes>
    </>
  )
}

export default Content
