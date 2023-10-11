import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Box } from '@mui/material';
import clientApi from '../../api/client';
import { Link } from 'react-router-dom';

const PostByUser = () => {
  const [postData, setPostData] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await clientApi.get('posts')

      console.log(response.data);

      setPostData(response.data);
    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <>
      <h2>投稿一覧</h2>
      {postData.map((post) => (
        <div key={post.id}>
          <Link to={`/posts/${post.id}`}>
            <Box mb={2}>
              <Typography variant="h4">{post.title}</Typography>
              <Typography>{post.createdAt}</Typography>
              {post.image.url && (
                <img src={post.image.url} style={{ width: '200px' }} alt="post thumbnail" />
              )}
              <Typography>{post.body}</Typography>
            </Box>
          </Link>
        </div>
      ))}
    </>
  )
}

export default PostByUser
