import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import clientApi from '../api/client';
import { Box, Typography } from '@mui/material';

const Top = () => {
  const [blogData, setBlogData] = useState();

  const fetchBlog = async () => {
    try {
      const response = await clientApi.get(`/posts/blogs`);
      const postData = response.data;

      setBlogData(postData);
    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [])

  return (
    <>
      <div>
        <h2>ブログ一覧</h2>
        <div>
          {blogData ? (
            blogData.map((blog) => (
              <div key={blog.id}>
                <Link to={`/posts/blogs/${blog.id}`}>
                  <Typography variant="h4">{blog.name}のブログ</Typography>
                  <h3>最新投稿</h3>

                </Link>
              </div>
            ))
          ) : (
            <div>Loading...</div> // もしデータがまだ取得されていない場合に表示するメッセージ
          )}
        </div>
        <div>
        <Link to={'/new/post'}>記事を作成する</Link>
        <Link to={'/posts/my_posts'}>自分の記事一覧</Link>
        </div>
      </div>
    </>
  )
}

export default Top
