import React from 'react'
import { Link } from 'react-router-dom'

const Top = () => {
  return (
    <>
      <div>Top</div>
      <Link to={'new/post'}>記事を作成する</Link>
      <Link to={'/posts'}>記事一覧</Link>
      <Link to={'/posts/my_posts'}>自分の記事一覧</Link>
    </>
  )
}

export default Top
