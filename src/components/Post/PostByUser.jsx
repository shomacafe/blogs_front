import React, { useEffect, useState } from 'react'
import { Grid, CircularProgress, Typography, Box } from '@mui/material';
import clientApi from '../../api/client';

const PostByUser = () => {
  const [postData, setPostData] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await clientApi.get('posts')

      console.log(response.data);

      setPostData(response.data);
      // setPostData(response.data.map((postItem) => ({
      //   id: postItem.id,
      //   title: postItem.title,
      //   body: postItem.body
      // })))
    } catch (error) {
      console.error('API レスポンスの取得に失敗しました', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [])

  return (
    <div>
      <h2>投稿一覧</h2>
      {postData.map((post, index) => (
        <Box key={post.id} mb={2}>
          <Typography variant="h4">{post.title}</Typography>
          <Typography>{post.createdAt}</Typography>
          {post.image.url &&
            <img src={post.image.url} style={{width: '200px'}} />
          }
          <Typography>{post.body}</Typography>
        </Box>
      ))}
    </div>

  )
}

export default PostByUser
