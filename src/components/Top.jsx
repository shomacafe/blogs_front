import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Top = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>Top</div>
      <Link to={'new/post'}>記事を作成する</Link>
      <Link to={'/posts'}>記事一覧</Link>
    </>
  )
}

export default Top
