import React from 'react'
import { Paper } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Top from '../components/Top'
import SignUpForm from '../components/Auth/SignUpForm'
import SignInForm from '../components/Auth/SignInForm'
import CreatePost from '../components/Post/CreatePost'
import PostByUser from '../components/Post/PostByUser'
import ShowPost from '../components/Post/ShowPost'
import MyPost from '../components/MyPost'
import EditPost from '../components/Post/EditPost'


const styles = {
  paper: {
    backgroundColor: 'white',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '3rem',
    width: '100%',
    maxWidth: '1300px',
    margin: '0 auto',
  }
}

const Content = () => {
  return (
    <>
      <Routes>
        <Route index element={<Top />} />
        <Route path='/signup_form' element={<SignUpForm />} />
        <Route path='/signin_form' element={<SignInForm />} />
        <Route path='/new/post' element={<CreatePost />} />
        <Route path='/posts' element={<Paper style={styles.paper}><PostByUser /></Paper>} />
        <Route path='/posts/my_posts' element={<Paper style={styles.paper}><MyPost /></Paper>} />
        <Route path='/posts/:post_id' element={<ShowPost />} />
        <Route path='posts/edit/:post_id' element={<EditPost />} />
      </Routes>
    </>
  )
}

export default Content
