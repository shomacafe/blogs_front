import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Top from '../components/Top'
import SignUpForm from '../components/Auth/SignUpForm'
import SignInForm from '../components/Auth/SignInForm'
import CreatePost from '../components/Post/CreatePost'
import PostByUser from '../components/Post/PostByUser'
import ShowPost from '../components/Post/ShowPost'
import MyPost from '../components/MyPost'
import EditPost from '../components/Post/EditPost'
import FavoritePosts from '../components/Post/FavoritePosts'
import MyPage from '../components/User/MyPage'
import EditAccount from '../components/User/EditAccount'
import EditProfile from '../components/User/EditProfile'

const Content = () => {
  return (
    <>
      <Routes>
        <Route index element={<Top />} />
        <Route path='/signup_form' element={<SignUpForm />} />
        <Route path='/signin_form' element={<SignInForm />} />
        <Route path='/new/post' element={<CreatePost />} />
        <Route path='/posts/blogs/:blog_id' element={<PostByUser />} />
        <Route path='/posts/my_posts' element={<MyPost />} />
        <Route path='/posts/:post_id' element={<ShowPost />} />
        <Route path='/posts/edit/:post_id' element={<EditPost />} />
        <Route path='/posts/favorite' element={<FavoritePosts />} />
        <Route path='/my_page' element={<MyPage />} />
        <Route path='/account/edit' element={<EditAccount />} />
        <Route path='/profile/edit' element={<EditProfile />} />
      </Routes>
    </>
  )
}

export default Content
