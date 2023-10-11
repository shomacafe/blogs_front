import React from 'react'
import { Paper } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import Top from '../components/Top'
import SignUpForm from '../components/Auth/SignUpForm'
import SignInForm from '../components/Auth/SignInForm'



const Content = () => {
  return (
    <>
      <Routes>
        <Route index element={<Top />} />
        <Route path='/signup_form' element={<SignUpForm />} />
        <Route path='/signin_form' element={<SignInForm />} />
      </Routes>
    </>
  )
}

export default Content
